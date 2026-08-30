// Gemini TTS는 raw PCM(audio/l16)만 반환하므로, 브라우저 <audio>가 재생할 수 있게 WAV 컨테이너로 감싼다
export function pcmToWav(pcmBuffer, sampleRate = 24000, channels = 1, bitDepth = 16) {
  const byteRate = (sampleRate * channels * bitDepth) / 8;
  const blockAlign = (channels * bitDepth) / 8;
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcmBuffer.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitDepth, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcmBuffer.length, 40);
  return Buffer.concat([header, pcmBuffer]);
}

// "audio/l16; rate=24000; channels=1" 같은 mime type 문자열에서 rate/channels 파싱
export function parseL16MimeType(mimeType) {
  const rateMatch = mimeType?.match(/rate=(\d+)/);
  const channelsMatch = mimeType?.match(/channels=(\d+)/);
  return {
    sampleRate: rateMatch ? parseInt(rateMatch[1], 10) : 24000,
    channels: channelsMatch ? parseInt(channelsMatch[1], 10) : 1,
  };
}
