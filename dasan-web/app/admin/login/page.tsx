"use client";

import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(false);
    const password = new FormData(e.currentTarget).get("password");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    }).catch(() => null);
    if (res?.ok) {
      window.location.href = "/admin";
    } else {
      setError(true);
      setBusy(false);
    }
  }

  return (
    <div className="login-box">
      <img src="/images/logo.png" alt="DASAN" />
      <h1 style={{ fontSize: 22, marginBottom: 16 }}>Quản trị · 관리자</h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="password">Mật khẩu · 비밀번호</label>
          <input id="password" name="password" type="password" required autoFocus autoComplete="current-password" />
        </div>
        {error && <p className="alert err">Sai mật khẩu · 비밀번호가 틀렸습니다</p>}
        <button className="btn btn-navy" disabled={busy}>Đăng nhập · 로그인</button>
      </form>
    </div>
  );
}
