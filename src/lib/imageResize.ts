/**
 * 사진을 분석용으로 줄여서 base64로 만든다.
 * 휴대폰 사진은 3000x4000처럼 커서 그대로 보내면 요청이 수십 MB가 되고 분석도 느려진다 —
 * 제품의 생김새를 파악하는 데는 긴 변 1280px이면 충분하다.
 */
export async function imageToAnalysisPayload(
  file: File,
  maxEdge = 1280
): Promise<{ data: string; mimeType: string }> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  // data URL은 "data:image/jpeg;base64,...." 형태라 콤마 뒤쪽만 떼서 보낸다
  const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
  return { data: dataUrl.slice(dataUrl.indexOf(",") + 1), mimeType: "image/jpeg" };
}
