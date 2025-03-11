"use client";

import { useEffect, useRef, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import PerfumeCard from "./components/PerfumeCard";
import { perfumesData } from "./data/perfumes";
import gsap from "gsap";

type Perfume = {
  id: number;
  name: string;
  brand: string;
  description: string;
  image: string;
  price: string;
  rating: number;
  category: string;
  fragranceNotes?: {
    top: string[];
    middle: string[];
    base: string[];
  };
  sizeOptions?: {
    size: string;
    price: string;
  }[];
  similarFragrances?: {
    name: string;
    description: string;
    rating: number;
  }[];
};
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".perfume-card");

      // Clear existing animations first
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      // Initialize timeline
      timelineRef.current = gsap.timeline({
        repeat: -1,
        paused: paused,
      });

      // Determine if it's a small screen
      const isSmallScreen = window.innerWidth < 768;
      const xOffset = window.innerWidth;

      // Set initial positions (off-screen)
      gsap.set(cards, {
        x: xOffset,
        opacity: 0,
        scale: isSmallScreen ? 0.9 : 0.8,
      });

      // Animate each card
      cards.forEach((card, index) => {
        // First card
        if (index === 0) {
          timelineRef.current?.to(card, {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: isSmallScreen ? 0.8 : 1,
            ease: "power2.out",
          });

          timelineRef.current?.to(card, {
            x: -xOffset,
            opacity: 0,
            scale: isSmallScreen ? 0.9 : 0.8,
            duration: isSmallScreen ? 0.8 : 1,
            delay: isSmallScreen ? 2.5 : 3,
            ease: "power2.in",
          });
        } else {
          // Other cards - start when previous card ends
          timelineRef.current?.to(
            card,
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: isSmallScreen ? 0.8 : 1,
              ease: "power2.out",
            },
            ">"
          );

          const isLast = index === cards.length - 1;
          timelineRef.current?.to(card, {
            x: -xOffset,
            opacity: 0,
            scale: isSmallScreen ? 0.9 : 0.8,
            duration: isSmallScreen ? 0.8 : 1,
            delay: isLast ? (isSmallScreen ? 3 : 4) : isSmallScreen ? 2.5 : 3,
            ease: "power2.in",
          });
        }
      });

      // Play timeline
      if (!paused) {
        timelineRef.current.play();
      }

      // Add resize handler to adjust animations when window size changes
      const handleResize = () => {
        if (timelineRef.current) {
          timelineRef.current.kill();
        }
        // Recreate the timeline with new dimensions
        timelineRef.current = gsap.timeline({
          repeat: -1,
          paused: paused,
        });

        const newIsSmallScreen = window.innerWidth < 768;
        const newXOffset = window.innerWidth;

        gsap.set(cards, {
          x: newXOffset,
          opacity: 0,
          scale: newIsSmallScreen ? 0.9 : 0.8,
        });

        // Recreate animations with new dimensions
        cards.forEach((card, index) => {
          if (index === 0) {
            timelineRef.current?.to(card, {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: newIsSmallScreen ? 0.8 : 1,
              ease: "power2.out",
            });

            timelineRef.current?.to(card, {
              x: -newXOffset,
              opacity: 0,
              scale: newIsSmallScreen ? 0.9 : 0.8,
              duration: newIsSmallScreen ? 0.8 : 1,
              delay: newIsSmallScreen ? 2.5 : 3,
              ease: "power2.in",
            });
          } else {
            timelineRef.current?.to(
              card,
              {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: newIsSmallScreen ? 0.8 : 1,
                ease: "power2.out",
              },
              ">"
            );

            const isLast = index === cards.length - 1;
            timelineRef.current?.to(card, {
              x: -newXOffset,
              opacity: 0,
              scale: newIsSmallScreen ? 0.9 : 0.8,
              duration: newIsSmallScreen ? 0.8 : 1,
              delay: isLast
                ? newIsSmallScreen
                  ? 3
                  : 4
                : newIsSmallScreen
                ? 2.5
                : 3,
              ease: "power2.in",
            });
          }
        });

        if (!paused) {
          timelineRef.current.play();
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [loading, paused]);

  const togglePlayPause = () => {
    setPaused(!paused);
    if (timelineRef.current) {
      if (paused) {
        timelineRef.current.play();
      } else {
        timelineRef.current.pause();
      }
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 font-['IBM_Plex_Serif'] flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-[url('/texture-light.png')] opacity-5 pointer-events-none"></div>

      <header className="py-3 sm:py-4 px-3 sm:px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <div>
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 border-b border-gray-200 pb-2">
              Aroma <span className="font-medium italic">Arena</span>
            </h1>
            <p className="mt-1 sm:mt-2 text-base sm:text-lg text-gray-600 tracking-wide font-light">
              Discover your perfect scent
            </p>
          </div>

          {/* Elegant Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="mt-2 sm:mt-0 w-full sm:w-auto px-4 sm:px-5 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-md border border-gray-700 font-light tracking-wider flex items-center justify-center gap-2 group"
          >
            <span className="relative w-5 h-5">
              {paused ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 transform transition-transform group-hover:scale-110"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 transform transition-transform group-hover:scale-110"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
            <span>{paused ? "Play" : "Pause"}</span>
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col justify-center">
        <div className="relative h-full" ref={cardsRef}>
          {perfumesData.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>
      </main>

      <footer className="py-3 sm:py-4 px-3 sm:px-4 text-center text-gray-500 border-t border-gray-200">
        <p className="font-light tracking-widest text-sm sm:text-base">
          © 2025 Aroma Arena. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
