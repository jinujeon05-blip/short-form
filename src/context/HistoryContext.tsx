import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { GeneratedResult } from "../types";

interface HistoryContextValue {
  items: GeneratedResult[];
  loading: boolean;
  addItem: (item: GeneratedResult) => Promise<void>;
}

const HistoryContext = createContext<HistoryContextValue | null>(null);

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<GeneratedResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/history")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`요청이 실패했어요 (${res.status})`))))
      .then((data: GeneratedResult[]) => setItems(data))
      .catch((err) => console.error("Failed to load history:", err))
      .finally(() => setLoading(false));
  }, []);

  const addItem = useCallback(async (item: GeneratedResult) => {
    const res = await fetch("/api/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new Error(body?.error || `요청이 실패했어요 (${res.status})`);
    }

    setItems((prev) => [item, ...prev]);
  }, []);

  return <HistoryContext.Provider value={{ items, loading, addItem }}>{children}</HistoryContext.Provider>;
}

export function useHistory() {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error("useHistory must be used within HistoryProvider");
  return ctx;
}
