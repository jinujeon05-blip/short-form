import { Smartphone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Lang, useI18n } from '../i18n';

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  interface Window {
    __mwInstall?: InstallPromptEvent | null;
  }
}

// Captured as early as possible: the browser may fire it before React mounts.
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.__mwInstall = e as InstallPromptEvent;
    window.dispatchEvent(new Event('mw:installable'));
  });
  window.addEventListener('appinstalled', () => {
    window.__mwInstall = null;
  });
}

const TEXT: Record<Lang, {
  title: string; desc: string; install: string; how: string; done: string;
  steps: { k: string; v: string }[];
}> = {
  ko: {
    title: '명월을 앱으로 설치하기',
    desc: '설치하면 주소창 없이 앱처럼 열리고, 홈 화면에서 바로 오늘의 음력과 운세를 볼 수 있어요.',
    install: '앱 설치',
    how: '설치 방법 보기',
    done: '설치되었습니다! 홈 화면의 명월 아이콘으로 열어 보세요.',
    steps: [
      { k: '삼성 인터넷', v: '주소창 오른쪽의 ⬇ 설치 아이콘을 누르거나, 메뉴(≡) → "현재 페이지 추가" → "홈 화면"을 고른 뒤 "설치"를 누르세요.' },
      { k: '크롬 (안드로이드)', v: '메뉴(⋮) → "앱 설치"(또는 "홈 화면에 추가" → "설치")를 누르세요. "바로가기 만들기"를 고르면 주소창이 보이는 바로가기가 됩니다.' },
      { k: '아이폰 (사파리)', v: '아래 공유 버튼(□↑) → "홈 화면에 추가"를 누르세요.' },
      { k: '이미 추가했는데 주소창이 보이면', v: '홈 화면의 기존 아이콘을 지우고, 브라우저에서 사이트를 새로고침한 뒤 다시 설치해 주세요.' },
    ],
  },
  vi: {
    title: 'Cài Minh Nguyệt như ứng dụng',
    desc: 'Sau khi cài, trang mở toàn màn hình như ứng dụng, không còn thanh địa chỉ — xem lịch âm và tử vi ngay từ màn hình chính.',
    install: 'Cài ứng dụng',
    how: 'Xem cách cài',
    done: 'Đã cài xong! Hãy mở bằng biểu tượng Minh Nguyệt trên màn hình chính.',
    steps: [
      { k: 'Samsung Internet', v: 'Bấm biểu tượng ⬇ cài đặt bên phải thanh địa chỉ, hoặc Menu (≡) → "Thêm trang vào" → "Màn hình chờ" rồi bấm "Cài đặt".' },
      { k: 'Chrome (Android)', v: 'Menu (⋮) → "Cài đặt ứng dụng" (hoặc "Thêm vào màn hình chính" → "Cài đặt"). Nếu chọn "Tạo lối tắt" sẽ vẫn còn thanh địa chỉ.' },
      { k: 'iPhone (Safari)', v: 'Bấm nút Chia sẻ (□↑) → "Thêm vào MH chính".' },
      { k: 'Đã thêm mà vẫn thấy thanh địa chỉ', v: 'Xóa biểu tượng cũ trên màn hình chính, tải lại trang trong trình duyệt rồi cài lại.' },
    ],
  },
};

const isStandalone = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true);

export function InstallApp() {
  const { lang } = useI18n();
  const x = TEXT[lang];
  const [canPrompt, setCanPrompt] = useState(false);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [standalone, setStandalone] = useState(false);

  useEffect(() => {
    setStandalone(isStandalone());
    const update = () => setCanPrompt(!!window.__mwInstall);
    update();
    window.addEventListener('mw:installable', update);
    const installed = () => setDone(true);
    window.addEventListener('appinstalled', installed);
    return () => {
      window.removeEventListener('mw:installable', update);
      window.removeEventListener('appinstalled', installed);
    };
  }, []);

  if (standalone) return null;

  const install = async () => {
    const ev = window.__mwInstall;
    if (!ev) {
      setOpen(true);
      return;
    }
    await ev.prompt();
    const { outcome } = await ev.userChoice;
    window.__mwInstall = null;
    setCanPrompt(false);
    if (outcome === 'accepted') setDone(true);
  };

  return (
    <section className="cta-band install-band">
      <div>
        <h2 className="section-title"><Smartphone className="line-icon" aria-hidden="true" /> {x.title}</h2>
        <p className="section-desc">{done ? x.done : x.desc}</p>
        {open && (
          <ul className="install-steps">
            {x.steps.map((s) => <li key={s.k}><b>{s.k}</b> — {s.v}</li>)}
          </ul>
        )}
      </div>
      {!done && (
        <div className="install-actions">
          <button type="button" className="btn btn-gold" onClick={install}>{canPrompt ? x.install : x.how}</button>
          {canPrompt && !open && (
            <button type="button" className="btn-link small" onClick={() => setOpen(true)}>{x.how}</button>
          )}
        </div>
      )}
    </section>
  );
}
