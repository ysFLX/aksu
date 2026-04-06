"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.message ?? "Giris basarisiz.");
      setLoading(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center px-6 py-16 lg:px-10">
      <section className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-200/70">Admin Girisi</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Yonetim paneline gir</h1>
        <p className="mt-4 text-white/68">
          Sadece site sahibi icin acik. Kullanici adi ve sifreyle devam et.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <label className="grid gap-2 text-sm text-white/80">
            <span>Kullanici adi</span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
            />
          </label>

          <label className="grid gap-2 text-sm text-white/80">
            <span>Sifre</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
            />
          </label>

          {error ? <p className="text-sm text-rose-300">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 disabled:opacity-60"
          >
            {loading ? "Giris yapiliyor..." : "Giris yap"}
          </button>
        </form>
      </section>
    </main>
  );
}
