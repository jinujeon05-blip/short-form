#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Jinwoo 에이전트 알림 발송기 (텔레그램 봇, 추가 비용 0원).

- 설정 파일: dashboard/out/notify-config.json (git 제외)
- 봇 토큰은 서버 메모·로컬 파일에만 두고 화면 API(/api/notify)로는 절대 내려보내지 않는다.
"""

import json
import os
import ssl
import subprocess
import threading
import time
import urllib.error
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
OUT = HERE / "out"
CFG_PATH = Path(os.environ.get("DASH_NOTIFY_CFG") or (OUT / "notify-config.json"))
_LOCK = threading.Lock()
_STATE = {"lastSentAt": None, "lastError": ""}


def _write_atomic(path: Path, data: dict):
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    os.replace(tmp, path)


def _load_cfg() -> dict:
    cfg = {
        "enabled": True,
        "token": os.environ.get("TELEGRAM_BOT_TOKEN", "").strip(),
        "chatId": os.environ.get("TELEGRAM_CHAT_ID", "").strip(),
        "dashUrl": "",
    }
    if CFG_PATH.is_file():
        try:
            saved = json.loads(CFG_PATH.read_text(encoding="utf-8"))
            if isinstance(saved, dict):
                for k in ("enabled", "token", "chatId", "dashUrl"):
                    if k in saved and saved[k] is not None:
                        cfg[k] = saved[k]
        except Exception:
            pass
    return cfg


def _tg_call_curl(url: str, payload: dict | None = None, timeout: int = 12) -> tuple[dict | None, str]:
    """Windows 기본 curl.exe(OS 인증서 저장소 SChannel 사용)로 텔레그램 API 호출."""
    cmd = ["curl.exe", "-sS", "--max-time", str(timeout)]
    if payload is not None:
        cmd += ["-X", "POST", "-H", "Content-Type: application/json", "-d", json.dumps(payload)]
    cmd.append(url)
    flags = getattr(subprocess, "CREATE_NO_WINDOW", 0)
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=timeout + 3, creationflags=flags)
        if r.returncode != 0:
            return None, (r.stderr or f"curl 오류({r.returncode})").strip()[:180]
        res = json.loads(r.stdout or "{}")
        if not res.get("ok"):
            return None, str(res.get("description") or "텔레그램 응답 오류")
        return res, ""
    except Exception as e:
        return None, str(e)[:180]


def _tg_call(token: str, method: str, payload: dict | None = None, timeout: int = 10) -> tuple[dict | None, str]:
    url = f"https://api.telegram.org/bot{token}/{method}"
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    headers = {"Content-Type": "application/json"} if data is not None else {}
    req = urllib.request.Request(url, data=data, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            res = json.loads(r.read(200000).decode("utf-8", "replace"))
            if not res.get("ok"):
                return None, str(res.get("description") or "텔레그램 응답 오류")
            return res, ""
    except urllib.error.HTTPError as e:
        try:
            err_body = json.loads(e.read(4000).decode("utf-8", "replace"))
            return None, str(err_body.get("description") or f"HTTP {e.code}")
        except Exception:
            return None, f"HTTP {e.code}"
    except Exception as e:
        # Windows에서 파이썬 기본 인증서 저장소가 시스템 인증서를 못 읽을 때 Windows 기본 curl.exe로 안전하게 재시도
        if "CERTIFICATE_VERIFY_FAILED" in str(e) or isinstance(getattr(e, "reason", None), ssl.SSLCertVerificationError):
            return _tg_call_curl(url, payload, timeout=timeout + 2)
        return None, str(e)[:180]


def _detect_chat_id(token: str) -> tuple[str, str]:
    res, err = _tg_call(token, "getUpdates")
    if err:
        return "", f"토큰 확인 실패: {err}"
    items = (res or {}).get("result") or []
    for up in reversed(items):
        msg = up.get("message") or up.get("edited_message") or up.get("channel_post") or {}
        cid = (msg.get("chat") or {}).get("id")
        if cid is not None:
            return str(cid), ""
    return "", "봇 대화방에서 '시작' 또는 아무 말이나 한 번 먼저 보내신 뒤 다시 눌러 주세요."


def status() -> dict:
    with _LOCK:
        cfg = _load_cfg()
        cid = str(cfg.get("chatId") or "").strip()
        tok = str(cfg.get("token") or "").strip()
        masked = (cid[:3] + "***" + cid[-2:]) if len(cid) > 5 else cid
        return {
            "configured": bool(tok and cid),
            "enabled": bool(cfg.get("enabled", True)),
            "hasToken": bool(tok),
            "chatId": masked,
            "dashUrl": str(cfg.get("dashUrl") or ""),
            "lastSentAt": _STATE["lastSentAt"],
            "lastError": _STATE["lastError"],
        }


def setup(token: str = "", chat_id: str = "", enabled: bool = True, dash_url: str = "", send_test: bool = True) -> tuple[dict | None, str]:
    with _LOCK:
        cur = _load_cfg()
        tok = (token or "").strip() or str(cur.get("token") or "").strip()
        cid = (chat_id or "").strip() or str(cur.get("chatId") or "").strip()
        durl = (dash_url or "").strip() if dash_url is not None else str(cur.get("dashUrl") or "")

        if not tok:
            # 끄기만 하려는 경우 허용
            if not enabled:
                cur["enabled"] = False
                _write_atomic(CFG_PATH, cur)
                return status(), ""
            return None, "텔레그램 봇 토큰을 입력해 주세요."

        if not cid:
            detected, err = _detect_chat_id(tok)
            if err:
                return None, err
            cid = detected

        new_cfg = {"enabled": bool(enabled), "token": tok, "chatId": cid, "dashUrl": durl}
        _write_atomic(CFG_PATH, new_cfg)

    if send_test and enabled:
        ok, err = send_sync("🔔 Jinwoo 에이전트 알림 연결 완료!", "이제 업무가 끝나거나 중단되면 휴대폰과 PC로 바로 알려드립니다.")
        if not ok:
            return None, f"설정은 저장했지만 테스트 발송 실패: {err}"
    return status(), ""


def send_sync(title: str, body: str = "") -> tuple[bool, str]:
    cfg = _load_cfg()
    tok = str(cfg.get("token") or "").strip()
    cid = str(cfg.get("chatId") or "").strip()
    if not cfg.get("enabled", True):
        return False, "텔레그램 알림이 꺼져 있습니다."
    if not tok or not cid:
        return False, "텔레그램 봇이 아직 연결되지 않았습니다."
    text = f"{title}\n{body}".strip() if body else title
    if cfg.get("dashUrl"):
        text += f"\n\n🔗 대시보드: {cfg['dashUrl']}"
    _, err = _tg_call(tok, "sendMessage", {"chat_id": cid, "text": text[:3800], "disable_web_page_preview": True})
    with _LOCK:
        if err:
            _STATE["lastError"] = err
            return False, err
        _STATE["lastSentAt"] = time.time()
        _STATE["lastError"] = ""
    return True, ""


def send_async(title: str, body: str = ""):
    cfg = _load_cfg()
    if not cfg.get("enabled", True) or not cfg.get("token") or not cfg.get("chatId"):
        return
    threading.Thread(target=send_sync, args=(title, body), daemon=True).start()


def notify_order(kind: str, order: dict, extra: str = ""):
    """지시 완료·실패·중지·배포 완료·줄 멈춤 시 텔레그램 비동기 알림."""
    title_o = str(order.get("title") or order.get("id") or "업무 지시").strip()[:80]
    summary = (extra or "").strip().splitlines()[0][:180] if extra else ""
    if kind == "done":
        if order.get("deploy"):
            head = f"🚀 [배포 대기] {title_o}"
            body = f"배포 준비: {', '.join(order['deploy'])}\n{summary}".strip()
        elif order.get("approval"):
            head = f"🙋 [결재 대기] {title_o}"
            body = f"결재: {order['approval']}\n{summary}".strip()
        else:
            head = f"✅ [업무 완료] {title_o}"
            body = summary or "비서실장이 보고를 올렸습니다. 결재함에서 확인해 주세요."
    elif kind == "fail":
        head = f"⚠️ [업무 중단·실패] {title_o}"
        body = summary or "오류 또는 한도 문제로 중단되었습니다. 대시보드에서 확인해 주세요."
    elif kind == "stopped":
        head = f"⏹️ [업무 중지됨] {title_o}"
        body = summary or "요청에 따라 작업을 멈췄습니다."
    elif kind == "deploy_done":
        shops = ", ".join(order.get("deploy") or [])
        head = f"🎉 [배포 완료] {shops or title_o}"
        body = "손님 주소가 실제로 열리는 것까지 확인했습니다."
    elif kind == "deploy_fail":
        head = f"⚠️ [배포 멈춤] {title_o}"
        body = summary or str(order.get("deployErr") or "배포 중 문제가 생겼습니다.")
    else:
        head = f"🔔 [알림] {title_o}"
        body = summary
    send_async(head, body)
