"use client";

import { FC, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Perfume } from "../data/perfumes";
import { gsap } from "gsap";

interface ExpandedPerfumeViewProps {
  perfume: Perfume;
  onClose: () => void;
}

const ExpandedPerfumeView: FC<ExpandedPerfumeViewProps> = ({
  perfume,
  onClose,
}) => {
  const [selectedSize, setSelectedSize] = useState(perfume.sizeOptions[1].size);
  const modalRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const notesRef = useRef(null);
  const sizesRef = useRef(null);
  const comparisonRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Create initial state for all elements (hidden/transformed)
    gsap.set(modalRef.current, { opacity: 0, scale: 0.9 });
    gsap.set(imageRef.current, { opacity: 0, x: -50 });
    gsap.set(contentRef.current, { opacity: 0, y: 30 });
    gsap.set(notesRef.current, { opacity: 0, y: 20 });
    gsap.set(sizesRef.current, { opacity: 0, y: 20 });
    gsap.set(comparisonRef.current, { opacity: 0, y: 20 });
    gsap.set(ctaRef.current, { opacity: 0, y: 20 });

    // Create a timeline for sequential animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Backdrop and modal container animation
    tl.to(modalRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
    })
      // Image animation with slight bounce
      .to(
        imageRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.75)",
        },
        "-=0.3"
      )
      // Main content fade up
      .to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.5"
      )
      // Staggered content sections
      .to(
        notesRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "-=0.3"
      )
      .to(
        sizesRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "-=0.3"
      )
      .to(
        comparisonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "-=0.3"
      )
      .to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.5)",
        },
        "-=0.2"
      );

    // Clean up animation on unmount
    return () => {
      tl.kill();
    };
  }, []);

  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" />
        ))}
        {hasHalfStar && (
          <div className="relative h-4 w-4 sm:h-5 sm:w-5">
            <StarIcon className="absolute h-full w-full text-gray-300" />
            <div className="absolute h-full w-1/2 overflow-hidden">
              <StarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" />
            </div>
          </div>
        )}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <StarIcon
            key={i + fullStars + (hasHalfStar ? 1 : 0)}
            className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300"
          />
        ))}
      </div>
    );
  };

  const getCurrentPrice = () => {
    const selectedOption = perfume.sizeOptions.find(
      (option) => option.size === selectedSize
    );
    return selectedOption ? selectedOption.price : perfume.price;
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div
        ref={modalRef}
        className="w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-2xl font-['IBM_Plex_Serif']"
      >
        <div className="flex flex-col md:flex-row max-h-[90vh]">
          {/* Image Section - Redesigned to not use a tile */}
          <div className="w-full md:w-2/5 p-6 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div ref={imageRef} className="relative w-full max-w-xs">
              <div className="relative h-72 w-full max-w-xs mx-auto overflow-hidden rounded-lg shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-white/30 z-10"></div>
                <Image
                  src={`${perfume.image}`}
                  alt={perfume.name}
                  layout="fill"
                  objectFit="cover"
                  className="z-0"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-gray-200/30 to-gray-100/10 blur-md"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-gradient-to-tr from-gray-200/20 to-gray-100/5 blur-md"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-3/5 p-6 overflow-y-auto">
            <div ref={contentRef}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs sm:text-sm font-light tracking-widest uppercase text-gray-500">
                    {perfume.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-light mt-1 text-gray-800 tracking-tight">
                    {perfume.name}
                  </h2>
                  <h3 className="text-lg sm:text-xl text-gray-600 font-light italic">
                    {perfume.brand}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="flex items-center mb-4">
                {renderRatingStars(perfume.rating)}
                <span className="ml-2 text-sm text-gray-500">
                  ({perfume.rating})
                </span>
              </div>

              <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed mb-6">
                {perfume.description}
              </p>
            </div>

            {/* Fragrance Notes Section */}
            <div className="mb-6" ref={notesRef}>
              <h4 className="text-lg font-light text-gray-800 mb-3">
                Fragrance Notes
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    Top Notes
                  </h5>
                  <ul className="text-sm text-gray-600">
                    {perfume.fragranceNotes.top.map((note, index) => (
                      <li key={index} className="mb-1">
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    Middle Notes
                  </h5>
                  <ul className="text-sm text-gray-600">
                    {perfume.fragranceNotes.middle.map((note, index) => (
                      <li key={index} className="mb-1">
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    Base Notes
                  </h5>
                  <ul className="text-sm text-gray-600">
                    {perfume.fragranceNotes.base.map((note, index) => (
                      <li key={index} className="mb-1">
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Size Options Section */}
            <div className="mb-6" ref={sizesRef}>
              <h4 className="text-lg font-light text-gray-800 mb-3">
                Size Options
              </h4>
              <div className="flex flex-wrap gap-3">
                {perfume.sizeOptions.map((option) => (
                  <button
                    key={option.size}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedSize === option.size
                        ? "border-gray-800 bg-gray-800 text-white"
                        : "border-gray-300 hover:border-gray-400"
                    } transition-all duration-200`}
                    onClick={() => setSelectedSize(option.size)}
                  >
                    <span className="text-sm font-light">{option.size}</span>
                    <span className="text-xs block mt-1 font-light">
                      {option.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Compare with Other Fragrances Section */}
            <div className="mb-6" ref={comparisonRef}>
              <h4 className="text-lg font-light text-gray-800 mb-3">
                Compare with Other {perfume.brand} Fragrances
              </h4>
              <div className="space-y-3">
                {perfume.similarFragrances.map((fragrance, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-3 rounded-lg border border-gray-100"
                  >
                    <div className="flex justify-between">
                      <h5 className="text-sm font-medium text-gray-700">
                        {fragrance.name}
                      </h5>
                      <div className="flex items-center">
                        {renderRatingStars(fragrance.rating)}
                        <span className="ml-1 text-xs text-gray-500">
                          ({fragrance.rating})
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {fragrance.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <div
              className="flex justify-between items-center mt-8"
              ref={ctaRef}
            >
              <span className="text-2xl font-light text-gray-800">
                {getCurrentPrice()}
              </span>
              <button className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 rounded-md text-white font-light tracking-widest hover:from-gray-800 hover:to-black transition-all duration-300 shadow-md transform hover:-translate-y-1">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedPerfumeView;
