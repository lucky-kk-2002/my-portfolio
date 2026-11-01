"use client";

import { useState, useEffect } from "react";
import { FiSun, FiMoon, FiCommand } from "react-icons/fi"; // آیکون FiCommand را اضافه کردم
import { useTheme } from "next-themes";

export default function HeaderActions() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // تابعی برای باز کردن پنل کامند
  const openCommandMenu = () => {
    document.dispatchEvent(new CustomEvent("open-command-menu"));
  };

  return (
    <div className="flex items-center gap-2">
      {/* دکمه باز کردن کامند منو */}
      <button
        onClick={openCommandMenu}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 bg-surface/50 hover:bg-surface hover:border-lavender/50 transition-all text-silverMuted hover:text-lavender"
        title="دسترسی سریع (Ctrl + K)"
      >
        <FiCommand size={16} />
      </button>

      {/* دکمه تغییر تم */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 bg-surface/50 hover:bg-surface hover:border-lavender/50 transition-all text-silverMuted hover:text-lavender"
        title="تغییر تم"
      >
        {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
      </button>
    </div>
  );
}