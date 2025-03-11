"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const LoadingScreen = () => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate the inner line width
    tl.to(progressRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: function () {
        if (percentRef.current) {
          const progress = Math.round(tl.progress() * 100);
          percentRef.current.textContent = `${progress}%`;
        }
      },
    });

    // Animate the text reveal
    gsap.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      delay: 0.5,
      ease: "power3.out",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={loadingRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white text-gray-800 z-50 font-['IBM_Plex_Serif']"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('/texture-light.png')] opacity-5"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-white to-gray-100 blur-2xl opacity-60"></div>
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-gradient-to-tl from-white to-gray-100 blur-2xl opacity-60"></div>

      <div
        ref={textRef}
        className="mb-12 opacity-0 transform translate-y-8 text-center relative z-10"
      >
        <h1 className="text-6xl font-extralight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-600 via-gray-800 to-gray-700">
          Aroma <span className="font-normal italic">Arena</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600 tracking-widest font-light">
          Discover your perfect scent
        </p>
      </div>

      <div className="relative w-64 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent">
        <div
          ref={progressRef}
          className="h-px w-0 bg-gradient-to-r from-gray-400 via-gray-600 to-gray-800"
        ></div>

        {/* Animated dots */}
        <div className="absolute -top-1 left-0 h-2 w-2 rounded-full bg-gray-400 animate-pulse"></div>
        <div className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-gray-800 animate-pulse"></div>
      </div>

      <div className="mt-8 font-light text-gray-600 tracking-widest">
        Loading{" "}
        <span ref={percentRef} className="font-medium">
          0%
        </span>
      </div>
    </div>
  );
};

export default LoadingScreen;
