# 사무실 게임 직원 목소리 만들기 — ElevenLabs eleven_v3(감정 표현) 무료 기본 목소리 (2026-11-23)
# 실행: cd D:\what-if-studio  →  python D:\qrmenu\tools\office-voices.py [직원id ...]
#   (키는 what-if 스킬 wi.py가 D:\what-if-studio\.env에서 직접 읽음 — 값은 출력하지 않음)
#   직원id를 주면 그 직원만 다시 만듦. 끝나면 앞뒤 빈 소리 자르기·크기 맞추기(ffmpeg)까지 함.
# 무료 계정은 한국어 목소리(라이브러리 Jian·Deok·Jaewon)를 API로 못 씀(402) → 기본 목소리가 한국어를 읽음.
# 예전 Edge 음성(무료)은 발음은 좋지만 감정이 없어 전자음 같다는 캡틴 의견으로 교체.
# 11-24: 중년 해설자 목소리(George·Eric·Alice·Matilda·Lily·Bella)가 어색하다는 의견 → 젊은 기본 목소리로(캡틴 나-2).
#        목소리 직접 만들기(보이스 디자인)는 무료 API 불가(403 paid plan) — 하려면 웹사이트에서 직접 만들어야 함.
import sys, json, pathlib, subprocess
sys.path.insert(0, r'C:\Users\sia66\.claude\skills\what-if-animation\scripts')
import wi

OUT = pathlib.Path(r'D:\qrmenu\dashboard\static\office-anime\assets\voice')
# 남 = 캡틴·메뉴 검사관(agy)·데이터 감사관(auditor), 나머지 여
V = {
  'captain':    ('IKne3meq5aSn9XLyUdCD', 'Charlie — 젊고 자신감 있는 주인공'),
  'agy':        ('TX3LPaxmHKxFdv7VOQHJ', 'Liam — 젊고 활기참'),
  'auditor':    ('SOYHLrjzK2X1ezoPC6cr', 'Harry — 젊은 남자, 애니메이션용'),
  'claude':     ('EXAVITQu4vr4xnSDxMaL', 'Sarah — 성숙하고 안정감'),
  'finder':     ('cgSgspJ2msm6clMCkdW9', 'Jessica — 밝고 귀여움'),
  'sorter':     ('FGY2WhTYpPnrIDTdsKH5', 'Laura — 발랄함'),
  'inspector':  ('EXAVITQu4vr4xnSDxMaL', 'Sarah — 차분하게(비서실장과 같은 목소리)'),
  'staffing':   ('FGY2WhTYpPnrIDTdsKH5', 'Laura — 씩씩하게(선별팀과 같은 목소리)'),
  'translator': ('EXAVITQu4vr4xnSDxMaL', 'Sarah — 부드럽게(비서실장과 같은 목소리)'),
  'reader':     ('cgSgspJ2msm6clMCkdW9', 'Jessica — 밝게(시각 정보 비서와 같은 목소리)'),
}
L = {
  'captain':    {'greet': '[warmly] 모두 수고 많습니다!', 'brief': '[confidently] 자, 전원 보고 시작해!', 'end': '[satisfied] 좋아. 오늘은 여기까지 하지. 수고했다!', 'coffee': '[relaxed] 후... 커피 한 잔 할까?'},
  'claude':     {'call': '[cheerfully] 네, 캡틴! 부르셨어요?', 'ok': '[confidently] 네, 바로 처리하겠습니다!', 'done': '[proudly] 캡틴, 완료했어요!', 'greet': '[warmly] 오늘도 수고하셨습니다, 캡틴!'},
  'finder':     {'call': '[curious] 캡틴, 사진 필요하세요?', 'ok': '[excited] 사진 바로 골라 올게요!', 'done': '[happily] 짜잔! 사진 정리 끝났어요!', 'greet': '[cheerfully] 수고하셨어요!'},
  'agy':        {'call': '[energetic] 네! 메뉴 검사관입니다!', 'ok': '[confidently] 메뉴판, 바로 읽겠습니다!', 'done': '[proudly] 검사 완료! 이상 없습니다!', 'greet': '[cheerfully] 수고하셨습니다!'},
  'translator': {'call': '[softly] 네, 캡틴?', 'ok': '[confidently] 번역, 바로 들어갈게요.', 'done': '[pleased] 번역 다 끝냈어요!', 'greet': '[warmly] 수고 많으셨어요.'},
  'sorter':     {'call': '[cheerfully] 선별팀이에요, 캡틴!', 'ok': '[excited] 좋아요! 기준대로 골라 볼게요!', 'done': '[happily] 선별 끝났습니다!', 'greet': '[cheerfully] 고생하셨어요!'},
  'inspector':  {'call': '[calmly] 네, 운영 감찰관입니다.', 'ok': '[seriously] 꼼꼼히 확인하겠습니다.', 'done': '[relieved] 감찰 결과, 이상 없습니다.', 'greet': '[politely] 수고하셨습니다.'},
  'staffing':   {'call': '[energetic] 네, 인력 공급팀이요!', 'ok': '[confidently] 인력, 바로 배치할게요!', 'done': '[happily] 배치 완료했습니다!', 'greet': '[cheerfully] 오늘도 수고하셨어요!'},
  'reader':     {'call': '[cheerfully] 네, 캡틴! 저 여기 있어요!', 'ok': '[confidently] 바로 해석하겠습니다!', 'done': '[proudly] 해석 완료했어요!', 'greet': '[warmly] 수고하셨습니다!'},
  'auditor':    {'call': '[calmly] 네, 데이터 감사관입니다.', 'ok': '[seriously] 최종 점검 들어가겠습니다.', 'done': '[confidently] 감사 통과. 배포해도 됩니다.', 'greet': '[politely] 수고하셨습니다.'},
}

only = set(sys.argv[1:])
before, _ = wi.credits_used()
n = 0
for cid, lines in L.items():
    if only and cid not in only:
        continue
    vid = V[cid][0]
    for kind, text in lines.items():
        raw = OUT / f'{cid}-{kind}.raw.mp3'
        raw.write_bytes(wi.api(f'/v1/text-to-speech/{vid}?output_format=mp3_44100_128',
                               {'text': text, 'model_id': 'eleven_v3', 'voice_settings': {'stability': 0.5}}))
        dst = OUT / f'{cid}-{kind}.mp3'
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(raw), '-af',
                        'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,loudnorm=I=-16:TP=-1.5:LRA=7',
                        '-ar', '44100', '-ac', '1', '-b:a', '64k', str(dst)], check=True)
        raw.unlink()
        n += 1
        print('made', dst.name)
(OUT / 'lines.json').write_text(json.dumps({'engine': 'elevenlabs eleven_v3 stability 0.5', 'voices': V, 'lines': L}, ensure_ascii=False, indent=1), encoding='utf-8')
after, _ = wi.credits_used()
print(n, 'files; credits counter', before, '->', after, '(counter can lag)')
