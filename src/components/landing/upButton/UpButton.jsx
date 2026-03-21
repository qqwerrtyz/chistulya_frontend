"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import icons from "@/icons/icons";
import styles from "./UpButton.module.css";

export default function UpButton() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollTimerRef = useRef(null);
  const isPressedRef = useRef(false);
    const [isScrolling, setIsScrolling] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 150);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const startScrollingUp = () => {
    if (scrollTimerRef.current) return;

    isPressedRef.current = true;

    scrollTimerRef.current = window.setInterval(() => {
      if (!isPressedRef.current) return;

      const currentScroll = window.scrollY;
      if (currentScroll <= 0) {
        stopScrollingUp();
        return;
      }

      window.scrollBy({
        top: -25,
        left: 0,
        behavior: "auto",
      });
    }, 16);
  };

  const stopScrollingUp = () => {
    isPressedRef.current = false;

    if (scrollTimerRef.current) {
      clearInterval(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopScrollingUp();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={styles.upWrapper}
      onMouseDown={startScrollingUp}
      onMouseUp={stopScrollingUp}
      onMouseLeave={stopScrollingUp}
      onTouchStart={startScrollingUp}
      onTouchEnd={stopScrollingUp}
      onTouchCancel={stopScrollingUp}
      role="button"
      tabIndex={0}
      aria-label="Прокрутить страницу вверх"
    >
      <Image className={styles.upImg} src={icons.up} alt="Наверх" />
      <span className={styles.upText}>Наверх</span>
    </div>
  );
}