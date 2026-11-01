"use client";

import Link from "next/link";
import { useState } from "react";
import HeaderActions from "../ui/HeaderActions";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-background/80 backdrop-blur-md border-b border-white/5 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        
        <div className="text-2xl font-bold tracking-widest text-white">
          K <span className="text-lavender font-light">/</span>
        </div>

        <nav className="hidden md:flex items-center gap-10 text-[15px]">
          <Link href="#home" className="text-white relative pb-2 group">
            خانه
            <span className="absolute bottom-0 right-0 w-full h-[2px] bg-lavender scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></span>
          </Link>
          <Link href="#about" className="text-silverMuted hover:text-white transition-colors">درباره من</Link>
          <Link href="#projects" className="text-silverMuted hover:text-white transition-colors">پروژه‌ها</Link>
          <Link href="#contact" className="text-silverMuted hover:text-white transition-colors">تماس</Link>
        </nav>

        {/* فقط دکمه تغییر تم در هدر باقی مانده است */}
        <div className="hidden xl:flex items-center gap-3">
          <HeaderActions />
          <div className="w-8 h-[1px] bg-silverMuted/30"></div>
          <span className="text-sm text-silverMuted tracking-wider">مهندس نرم‌افزار ارشد</span>
        </div>

        <button 
          className="md:hidden text-white text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-white/5 absolute top-full left-0 w-full flex flex-col items-center py-4 gap-4 text-sm">
          <Link href="#home" className="text-white" onClick={() => setIsMenuOpen(false)}>خانه</Link>
          <Link href="#about" className="text-silverMuted hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>درباره من</Link>
          <Link href="#projects" className="text-silverMuted hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>پروژه‌ها</Link>
          <Link href="#contact" className="text-silverMuted hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>تماس</Link>
        </div>
      )}
    </header>
  );
}