# 사무실 게임 직원 목소리 만들기 (Edge 음성, 무료). 실행: python tools/office-voices.py
# 만든 뒤 앞뒤 빈 소리 자르기·크기 맞추기: ffmpeg silenceremove + loudnorm I=-16 (docs/dashboard.md 목소리 항목)
import asyncio, edge_tts, pathlib, json
OUT = pathlib.Path(r'D:\qrmenu\dashboard\static\office-anime\assets\voice')
# 직원별 목소리: (목소리, 높낮이, 빠르기)
V = {
  'captain':    ('ko-KR-InJoonNeural', '-6Hz', '-4%'),
  'agy':        ('ko-KR-HyunsuMultilingualNeural', '+0Hz', '+6%'),
  'reader':     ('ko-KR-InJoonNeural', '+14Hz', '+10%'),
  'claude':     ('ko-KR-SunHiNeural', '+0Hz', '+0%'),
  'finder':     ('ko-KR-SunHiNeural', '+14Hz', '+8%'),
  'sorter':     ('ko-KR-SunHiNeural', '+26Hz', '+12%'),
  'inspector':  ('ko-KR-SunHiNeural', '-16Hz', '-6%'),
  'translator': ('en-US-AvaMultilingualNeural', '+0Hz', '+4%'),
  'staffing':   ('en-US-EmmaMultilingualNeural', '+6Hz', '+8%'),
  'auditor':    ('fr-FR-VivienneMultilingualNeural', '-4Hz', '-2%'),
}
L = {
  'captain':    {'greet': '모두 수고 많습니다!', 'brief': '전원, 보고 시작해!', 'end': '오늘은 여기까지 하지. 수고했다!', 'coffee': '커피 한 잔 할까?'},
  'claude':     {'call': '네, 캡틴! 부르셨어요?', 'ok': '바로 처리하겠습니다!', 'done': '보고드립니다. 완료했어요!', 'greet': '수고하셨습니다, 캡틴!'},
  'finder':     {'call': '캡틴, 사진 필요하세요?', 'ok': '사진 바로 골라 올게요!', 'done': '사진 정리 끝났어요!', 'greet': '수고하셨어요!'},
  'agy':        {'call': '네, 메뉴 검사관입니다!', 'ok': '메뉴판 바로 읽겠습니다!', 'done': '검사 완료! 이상 없습니다!', 'greet': '수고하셨습니다!'},
  'translator': {'call': '네, 캡틴?', 'ok': '번역 바로 들어갈게요!', 'done': '번역 완료했어요!', 'greet': '수고 많으셨어요!'},
  'sorter':     {'call': '선별팀입니다, 캡틴!', 'ok': '기준대로 골라 볼게요!', 'done': '선별 끝났습니다!', 'greet': '고생하셨어요!'},
  'inspector':  {'call': '운영 감찰관입니다.', 'ok': '꼼꼼히 확인하겠습니다.', 'done': '감찰 결과, 이상 없습니다!', 'greet': '수고하셨습니다.'},
  'staffing':   {'call': '네, 인력 공급팀이요!', 'ok': '인력 바로 배치할게요!', 'done': '배치 완료했습니다!', 'greet': '오늘도 수고하셨어요!'},
  'reader':     {'call': '네! 자료 해석 비서입니다!', 'ok': '바로 해석하겠습니다!', 'done': '해석 완료했습니다!', 'greet': '수고하셨습니다!'},
  'auditor':    {'call': '데이터 감사관입니다.', 'ok': '최종 점검 들어갈게요.', 'done': '감사 통과! 배포 가능합니다.', 'greet': '수고하셨어요.'},
}
async def main():
    n = 0
    for cid, lines in L.items():
        voice, pitch, rate = V[cid]
        for kind, text in lines.items():
            p = OUT / f'{cid}-{kind}.mp3'
            await edge_tts.Communicate(text, voice, pitch=pitch, rate=rate).save(str(p))
            n += 1
    (OUT / 'lines.json').write_text(json.dumps({'voices': V, 'lines': L}, ensure_ascii=False, indent=1), encoding='utf-8')
    print(n, 'files')
asyncio.run(main())
