import type { Language } from "../i18n/translations";
import type { Platform } from "../types";

export interface ExampleInput {
  sourceInfo: string;
  platform: Platform;
  targetAudience: string;
  sellingPoint: string;
}

// "예시로 채우기" 버튼용 — 카테고리가 다른 제품 6개로 구성해 어떤 제품이든 통하는
// 작성 패턴(원본 정보는 짧게, 타겟층은 구체적으로, 소구점은 숫자·상황 하나로)을 보여줌
export const EXAMPLES: Record<Language, ExampleInput[]> = {
  ko: [
    {
      sourceInfo: "휴대용 미니 가습기 리뷰 영상",
      platform: "tiktok",
      targetAudience: "건조한 사무실에서 일하는 2030 직장인",
      sellingPoint: "손바닥만한 크기로 책상 위에 바로 올려두고 씀",
    },
    {
      sourceInfo: "저자극 약산성 폼클렌저 사용 후기",
      platform: "reels",
      targetAudience: "피부 트러블로 고민 많은 10대~20대",
      sellingPoint: "하루 두 번 세안만으로 트러블이 진정됨",
    },
    {
      sourceInfo: "제로슈거 단백질바 언박싱",
      platform: "shorts",
      targetAudience: "다이어트 중인 3040 직장인",
      sellingPoint: "한 개만 먹어도 밥 반 공기 포만감, 당류 0g",
    },
    {
      sourceInfo: "접이식 미니 우양산 리뷰",
      platform: "tiktok",
      targetAudience: "출퇴근길 대중교통 이용하는 2030",
      sellingPoint: "가방 속 작은 파우치에 쏙 들어가는 크기",
    },
    {
      sourceInfo: "강아지 자동 급식기 사용기",
      platform: "reels",
      targetAudience: "맞벌이라 반려견을 혼자 두는 시간이 많은 3040",
      sellingPoint: "외출 중에도 스마트폰으로 급여 시간 조절 가능",
    },
    {
      sourceInfo: "실리콘 다회용 지퍼백 사용 후기",
      platform: "shorts",
      targetAudience: "제로웨이스트에 관심 많은 2030",
      sellingPoint: "전자레인지·냉동실 다 되는 반영구 사용",
    },
  ],
  en: [
    {
      sourceInfo: "Unboxing a portable mini humidifier",
      platform: "tiktok",
      targetAudience: "Office workers in dry air-conditioned offices, 20s-30s",
      sellingPoint: "Palm-sized, sits right on your desk",
    },
    {
      sourceInfo: "Review of a gentle low-pH foam cleanser",
      platform: "reels",
      targetAudience: "Teens and 20s dealing with skin breakouts",
      sellingPoint: "Calms breakouts with just two washes a day",
    },
    {
      sourceInfo: "Zero-sugar protein bar unboxing",
      platform: "shorts",
      targetAudience: "Office workers in their 30s-40s on a diet",
      sellingPoint: "As filling as half a bowl of rice, 0g sugar",
    },
    {
      sourceInfo: "Review of a compact folding umbrella",
      platform: "tiktok",
      targetAudience: "Public transit commuters in their 20s-30s",
      sellingPoint: "Fits right into a small bag pouch",
    },
    {
      sourceInfo: "Automatic pet feeder review",
      platform: "reels",
      targetAudience: "Dual-income households whose dogs are home alone",
      sellingPoint: "Adjust feeding times remotely from your phone",
    },
    {
      sourceInfo: "Reusable silicone zip bag review",
      platform: "shorts",
      targetAudience: "Zero-waste conscious people in their 20s",
      sellingPoint: "Microwave and freezer safe, reusable for years",
    },
  ],
  vi: [
    {
      sourceInfo: "Video mở hộp máy tạo độ ẩm mini",
      platform: "tiktok",
      targetAudience: "Nhân viên văn phòng làm việc trong phòng máy lạnh khô, 20-30 tuổi",
      sellingPoint: "Nhỏ gọn bằng lòng bàn tay, đặt vừa trên bàn làm việc",
    },
    {
      sourceInfo: "Đánh giá sữa rửa mặt tạo bọt dịu nhẹ",
      platform: "reels",
      targetAudience: "Các bạn tuổi teen và 20 đang bị mụn",
      sellingPoint: "Chỉ cần rửa mặt 2 lần mỗi ngày là dịu mụn",
    },
    {
      sourceInfo: "Mở hộp thanh protein không đường",
      platform: "shorts",
      targetAudience: "Nhân viên văn phòng 30-40 tuổi đang giảm cân",
      sellingPoint: "No như nửa chén cơm, 0g đường",
    },
    {
      sourceInfo: "Đánh giá ô gấp gọn mini",
      platform: "tiktok",
      targetAudience: "Người đi làm bằng phương tiện công cộng, 20-30 tuổi",
      sellingPoint: "Vừa gọn trong túi nhỏ mang theo hằng ngày",
    },
    {
      sourceInfo: "Đánh giá máy cho thú cưng ăn tự động",
      platform: "reels",
      targetAudience: "Gia đình cả hai vợ chồng đi làm, chó ở nhà một mình",
      sellingPoint: "Điều chỉnh giờ cho ăn từ xa qua điện thoại",
    },
    {
      sourceInfo: "Đánh giá túi zip silicone dùng nhiều lần",
      platform: "shorts",
      targetAudience: "Người quan tâm đến lối sống zero-waste, 20 tuổi",
      sellingPoint: "Dùng được trong lò vi sóng và ngăn đá, tái sử dụng lâu dài",
    },
  ],
};
