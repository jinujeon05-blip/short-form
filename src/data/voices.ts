export interface VoiceOption {
  id: string;
  label: string;
}

// Gemini TTS 프리셋 보이스 30종 (공식 문서 기준 톤 설명을 한국어로 옮김)
export const VOICES: VoiceOption[] = [
  { id: "Zephyr", label: "Zephyr — 밝은 톤" },
  { id: "Puck", label: "Puck — 경쾌하고 신나는 톤" },
  { id: "Charon", label: "Charon — 정보 전달형 톤" },
  { id: "Kore", label: "Kore — 단단하고 확신에 찬 톤" },
  { id: "Fenrir", label: "Fenrir — 활기차고 들뜬 톤" },
  { id: "Leda", label: "Leda — 젊고 발랄한 톤" },
  { id: "Orus", label: "Orus — 단단한 톤" },
  { id: "Aoede", label: "Aoede — 산뜻한 톤" },
  { id: "Callirrhoe", label: "Callirrhoe — 여유로운 톤" },
  { id: "Autonoe", label: "Autonoe — 밝은 톤" },
  { id: "Enceladus", label: "Enceladus — 숨결이 느껴지는 톤" },
  { id: "Iapetus", label: "Iapetus — 또렷한 톤" },
  { id: "Umbriel", label: "Umbriel — 여유로운 톤" },
  { id: "Algieba", label: "Algieba — 부드러운 톤" },
  { id: "Despina", label: "Despina — 부드러운 톤" },
  { id: "Erinome", label: "Erinome — 또렷한 톤" },
  { id: "Algenib", label: "Algenib — 허스키한 톤" },
  { id: "Rasalgethi", label: "Rasalgethi — 정보 전달형 톤" },
  { id: "Laomedeia", label: "Laomedeia — 경쾌한 톤" },
  { id: "Achernar", label: "Achernar — 차분한 톤" },
  { id: "Alnilam", label: "Alnilam — 단단한 톤" },
  { id: "Schedar", label: "Schedar — 안정적인 톤" },
  { id: "Gacrux", label: "Gacrux — 성숙한 톤" },
  { id: "Pulcherrima", label: "Pulcherrima — 적극적인 톤" },
  { id: "Achird", label: "Achird — 친근한 톤" },
  { id: "Zubenelgenubi", label: "Zubenelgenubi — 캐주얼한 톤" },
  { id: "Vindemiatrix", label: "Vindemiatrix — 부드럽고 온화한 톤" },
  { id: "Sadachbia", label: "Sadachbia — 생기 있는 톤" },
  { id: "Sadaltager", label: "Sadaltager — 전문적인 톤" },
  { id: "Sulafat", label: "Sulafat — 따뜻한 톤" },
];

export const DEFAULT_VOICE = "Kore";
