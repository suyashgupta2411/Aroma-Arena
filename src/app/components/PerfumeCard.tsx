"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import ExpandedPerfumeView from "./ExpandedPerfumeView";

interface PerfumeProps {
  perfume: {
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
    sizeOptions?: string[];
    similarFragrances?: string[];
  };
}

const defaultFragranceNotes = {
  top: [],
  middle: [],
  base: [],
};

const defaultSizeOptions: { size: string; price: string }[] = [
  { size: "default", price: "0" }, // Provide a default structure
];

const defaultSimilarFragrances = [
  { name: "Default Fragrance", description: "Default description", rating: 0 }, // Provide a default structure
];

const PerfumeCard: FC<PerfumeProps> = ({ perfume }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    <>
      <div className="perfume-card absolute top-0 left-0 w-full h-full p-2 sm:p-4 md:p-6 font-['IBM_Plex_Serif']">
        <div className="relative bg-white/80 backdrop-blur-md rounded-xl overflow-hidden h-full border border-gray-100 shadow-lg max-w-5xl mx-auto">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-white to-gray-100 shadow-lg opacity-30"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-100 shadow-lg opacity-20"></div>

          <div className="flex h-full flex-col md:flex-row p-2 sm:p-4 md:p-6 relative z-10">
            {/* Image container - improved for small screens */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-2 mb-2 md:mb-0">
              <div className="relative group transform transition duration-700 hover:scale-105 w-full max-w-xs flex justify-center">
                {/* Subtle outer glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-200/30 via-white/60 to-gray-200/30 rounded-xl blur-md opacity-70 group-hover:opacity-90 transition duration-1000"></div>

                {/* Main container with improved responsive sizing */}
                <div
                  className="relative h-40 w-40 sm:h-48 sm:w-48 md:h-52 md:w-52 lg:h-64 lg:w-64 rounded-xl overflow-hidden 
                  transform transition-all duration-700 group-hover:rotate-1
                  shadow-lg
                  before:content-[''] before:absolute before:inset-0 before:z-10 
                  before:bg-gradient-to-br before:from-white/30 before:via-transparent before:to-gray-200/20"
                >
                  {/* Fine border */}
                  <div className="absolute inset-0 border border-white/40 rounded-xl z-20 pointer-events-none"></div>

                  {/* Reflective highlight */}
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/50 to-transparent z-10 pointer-events-none"></div>

                  {/* Image with responsive handling */}
                  <Image
                    src={`${perfume.image}`}
                    alt={perfume.name}
                    layout="fill"
                    objectFit="cover"
                    className="z-0 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Simplified shadow */}
                <div className="absolute -bottom-4 left-0 right-0 mx-auto w-4/5 h-6 bg-gray-300/20 blur-lg rounded-full z-0"></div>
              </div>
            </div>

            {/* Content container - adjusted for balance with image */}
            <div className="w-full md:w-1/2 flex flex-col justify-center p-2 sm:p-4 overflow-y-auto">
              <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
                <span className="text-xs sm:text-sm font-light tracking-widest uppercase text-gray-500 border-b border-gray-200 pb-1">
                  {perfume.category}
                </span>

                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mt-2 md:mt-3 text-gray-800 tracking-tight leading-tight line-clamp-2">
                  {perfume.name}
                </h2>

                <h3 className="text-md sm:text-lg text-gray-600 font-light italic">
                  {perfume.brand}
                </h3>

                <div className="mt-2 md:mt-3 flex items-center">
                  {renderRatingStars(perfume.rating)}
                  <span className="ml-2 text-xs sm:text-sm text-gray-500 font-light">
                    ({perfume.rating})
                  </span>
                </div>

                {/* Description with responsive truncation */}
                <p className="mt-2 md:mt-3 text-xs sm:text-sm md:text-base text-gray-600 font-light leading-relaxed line-clamp-3 sm:line-clamp-4 md:line-clamp-none">
                  {perfume.description}
                </p>

                {/* CTA section with better mobile layout */}
                <div className="mt-3 md:mt-4 lg:mt-6 flex flex-col xs:flex-row sm:flex-row justify-between items-center gap-2">
                  <span className="text-lg sm:text-xl md:text-2xl font-light text-gray-800">
                    {perfume.price}
                  </span>
                  <button
                    className="w-full xs:w-auto sm:w-auto px-3 py-2 bg-gradient-to-r from-gray-700 to-gray-900 rounded-md text-white font-light tracking-widest hover:from-gray-800 hover:to-black transition-all duration-300 shadow-md transform hover:-translate-y-1 text-xs sm:text-sm"
                    onClick={() => setIsExpanded(true)}
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded view modal */}
      {isExpanded && (
        <ExpandedPerfumeView
          perfume={{
            ...perfume,
            fragranceNotes: perfume.fragranceNotes || defaultFragranceNotes,
            sizeOptions:
              Array.isArray(perfume.sizeOptions) &&
              perfume.sizeOptions.every((option) => typeof option === "object")
                ? perfume.sizeOptions
                : defaultSizeOptions,
            similarFragrances:
              Array.isArray(perfume.similarFragrances) &&
              perfume.similarFragrances.every(
                (option) => typeof option === "object"
              )
                ? perfume.similarFragrances
                : defaultSimilarFragrances,
          }}
          onClose={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default PerfumeCard;
