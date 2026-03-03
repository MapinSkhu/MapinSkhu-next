"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import Navigation from "@/features/navigation/ui/Navigation";
import HamburgerIcon from "@/widgets/header/ui/HamburgerIcon";

export default function Header() {
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
        searchButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleSearch = () => {
    setIsSearchOpen((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => closeButtonRef.current?.focus(), 0);
      }
      return next;
    });
  };

  return (
    <>
      <header
        aria-label="주 내비게이션"
        className={cn(
          "fixed left-0 right-0 top-0 z-50 flex h-[60px] items-center transition-all duration-300",
          isScrolled
            ? "border-b border-[--mapin-white-900] md:h-[50px]"
            : "bg-white md:bg-transparent",
        )}
        style={isScrolled ? {
          background: "linear-gradient(90deg, var(--mapin-white-900) 0%, var(--mapin-white-980) 50%, var(--mapin-white-900) 100%)"
        } : undefined}
      >
        {/* PC layout */}
        <div className="hidden w-full items-center md:flex">
          <HamburgerIcon isMenuOpen={isMenuOpen} onClick={toggleMenu} />

          <div
            className={cn(
              "flex flex-1 items-center transition-opacity duration-300",
              isMenuOpen ? "pointer-events-none opacity-0" : "opacity-100",
            )}
          >
            <Link href="/" aria-label="MapinSKHU 홈으로 이동">
              <Image
                src="/images/logo/logo.svg"
                alt="MapinSKHU Logo"
                width={220}
                height={61}
                className="h-auto "
                priority
              />
            </Link>
          </div>

          {!isMainPage && (
            <div className="flex items-center pr-4">
              <button
                onClick={toggleSearch}
                className="flex h-[44px] w-[44px] items-center justify-center rounded-full hover:bg-black/5"
                aria-label="검색"
              >
                <Search size={20} style={{ color: "var(--new-main-color)" }} />
              </button>
            </div>
          )}
        </div>

        {/* Mobile layout */}
        <div className="flex w-full items-center md:hidden">
          {!isSearchOpen && (
            <HamburgerIcon isMenuOpen={isMenuOpen} onClick={toggleMenu} />
          )}

          <div
            className={cn(
              "flex flex-1 items-center transition-opacity duration-300",
              isMenuOpen ? "pointer-events-none opacity-0" : "opacity-100",
              isSearchOpen ? "justify-start pl-4" : "justify-center",
            )}
          >
            <Link href="/" aria-label="MapinSKHU 홈으로 이동">
              <Image
                src="/images/logo/logo.svg"
                alt="MapinSKHU Logo"
                width={180}
                height={50}
                className="h-auto w-[180px] translate-y-[2px]"
                priority
              />
            </Link>
          </div>

          <div className="flex items-center pr-4">
            {isSearchOpen ? (
              <button
                ref={closeButtonRef}
                onClick={toggleSearch}
                className="flex h-[44px] w-[44px] items-center justify-center rounded-full hover:bg-black/5"
                aria-label="검색 닫기"
              >
                <X size={20} style={{ color: "var(--new-main-color)" }} />
              </button>
            ) : (
              <button
                ref={searchButtonRef}
                onClick={toggleSearch}
                className="flex h-[44px] w-[44px] items-center justify-center rounded-full hover:bg-black/5"
                aria-label="검색"
              >
                <Search size={20} style={{ color: "var(--new-main-color)" }} />
              </button>
            )}
          </div>
        </div>
      </header>

      <Navigation isMenuOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}
