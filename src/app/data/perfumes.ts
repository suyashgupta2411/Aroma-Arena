export interface Perfume {
  id: number;
  name: string;
  brand: string;
  description: string;
  image: string;
  price: string;
  rating: number;
  category: string;
  fragranceNotes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  sizeOptions: {
    size: string;
    price: string;
  }[];
  similarFragrances: {
    name: string;
    description: string;
    rating: number;
  }[];
}

export const perfumesData: Perfume[] = [
  {
    id: 1,
    name: "Bleu de Chanel",
    brand: "Chanel",
    description:
      "A woody aromatic fragrance for the man who defies convention.",
    image: "/perfumes/1.png",
    price: "$120",
    rating: 4.8,
    category: "Men",
    fragranceNotes: {
      top: ["Citrus", "Mint", "Pink Pepper"],
      middle: ["Ginger", "Jasmine", "Nutmeg"],
      base: ["Incense", "Vetiver", "Cedar"],
    },
    sizeOptions: [
      { size: "30ml", price: "$85" },
      { size: "50ml", price: "$120" },
      { size: "100ml", price: "$160" },
    ],
    similarFragrances: [
      {
        name: "Allure Homme Sport",
        description: "Fresh and sensual blend with cypress and amber notes",
        rating: 4.6,
      },
      {
        name: "Platinum Égoïste",
        description: "Aromatic fougère with lavender and rosemary",
        rating: 4.5,
      },
      {
        name: "Pour Monsieur",
        description: "Classic citrus aromatic with cardamom and vetiver",
        rating: 4.7,
      },
    ],
  },
  {
    id: 2,
    name: "La Vie Est Belle",
    brand: "Lancôme",
    description:
      "A floral iris gourmand that represents freedom and happiness.",
    image: "/perfumes/2.png",
    price: "$95",
    rating: 4.7,
    category: "Women",
    fragranceNotes: {
      top: ["Blackcurrant", "Pear", "Bergamot"],
      middle: ["Iris", "Jasmine", "Orange Blossom"],
      base: ["Praline", "Vanilla", "Patchouli"],
    },
    sizeOptions: [
      { size: "30ml", price: "$75" },
      { size: "50ml", price: "$95" },
      { size: "100ml", price: "$135" },
    ],
    similarFragrances: [
      {
        name: "Idôle",
        description: "Clean floral with rose and jasmine accords",
        rating: 4.5,
      },
      {
        name: "Trésor",
        description: "Romantic floral with rose and apricot",
        rating: 4.6,
      },
      {
        name: "Miracle",
        description: "Fresh spicy floral with ginger and pepper",
        rating: 4.4,
      },
    ],
  },
  {
    id: 3,
    name: "Oud Wood",
    brand: "Tom Ford",
    description: "Rare and exotic oud wood blended with tonka bean and amber.",
    image: "/perfumes/3.png",
    price: "$240",
    rating: 4.9,
    category: "Unisex",
    fragranceNotes: {
      top: ["Rosewood", "Cardamom", "Chinese Pepper"],
      middle: ["Oud Wood", "Sandalwood", "Vetiver"],
      base: ["Tonka Bean", "Amber", "Vanilla"],
    },
    sizeOptions: [
      { size: "50ml", price: "$240" },
      { size: "100ml", price: "$350" },
      { size: "250ml", price: "$650" },
    ],
    similarFragrances: [
      {
        name: "Tobacco Vanille",
        description: "Rich blend of tobacco leaf and aromatic spices",
        rating: 4.8,
      },
      {
        name: "Tuscan Leather",
        description: "Raw and animalistic leather with raspberry and saffron",
        rating: 4.7,
      },
      {
        name: "Noir de Noir",
        description:
          "Dark chocolate and black truffle with vanilla and patchouli",
        rating: 4.8,
      },
    ],
  },
  {
    id: 4,
    name: "Light Blue",
    brand: "Dolce & Gabbana",
    description: "Fresh citrus scent reminiscent of Mediterranean summers.",
    image: "/perfumes/4.png",
    price: "$85",
    rating: 4.6,
    category: "Women",
    fragranceNotes: {
      top: ["Sicilian Lemon", "Apple", "Cedar"],
      middle: ["Bamboo", "Jasmine", "White Rose"],
      base: ["Amber", "Musk", "Cedarwood"],
    },
    sizeOptions: [
      { size: "25ml", price: "$60" },
      { size: "50ml", price: "$85" },
      { size: "100ml", price: "$110" },
    ],
    similarFragrances: [
      {
        name: "Light Blue Eau Intense",
        description: "Intensified version with added marigold and amber",
        rating: 4.5,
      },
      {
        name: "The One",
        description: "Warm oriental with vanilla and amber notes",
        rating: 4.7,
      },
      {
        name: "Dolce",
        description: "Delicate floral with white flowers and neroli leaves",
        rating: 4.4,
      },
    ],
  },
  {
    id: 5,
    name: "Sauvage",
    brand: "Dior",
    description:
      "Raw and noble masculinity with fresh bergamot and amber notes.",
    image: "/perfumes/5.png",
    price: "$110",
    rating: 4.8,
    category: "Men",
    fragranceNotes: {
      top: ["Bergamot", "Pepper", "Elemi"],
      middle: ["Lavender", "Pink Pepper", "Patchouli"],
      base: ["Ambroxan", "Cedar", "Labdanum"],
    },
    sizeOptions: [
      { size: "60ml", price: "$85" },
      { size: "100ml", price: "$110" },
      { size: "200ml", price: "$155" },
    ],
    similarFragrances: [
      {
        name: "Dior Homme Intense",
        description: "Elegant and intense with iris and woody notes",
        rating: 4.7,
      },
      {
        name: "Fahrenheit",
        description: "Distinctive blend with violet leaf and leather",
        rating: 4.6,
      },
      {
        name: "Eau Sauvage",
        description: "Classic citrus aromatic with rosemary and vetiver",
        rating: 4.8,
      },
    ],
  },
  {
    id: 6,
    name: "Black Opium",
    brand: "Yves Saint Laurent",
    description: "Addictive coffee and vanilla-infused feminine fragrance.",
    image: "/perfumes/6.png",
    price: "$125",
    rating: 4.7,
    category: "Women",
    fragranceNotes: {
      top: ["Coffee", "Pink Pepper", "Orange Blossom"],
      middle: ["Jasmine", "Vanilla", "White Flowers"],
      base: ["Patchouli", "Cedar", "Cashmere Wood"],
    },
    sizeOptions: [
      { size: "30ml", price: "$85" },
      { size: "50ml", price: "$125" },
      { size: "90ml", price: "$175" },
    ],
    similarFragrances: [
      {
        name: "Libre",
        description: "Floral lavender fusion with Moroccan orange blossom",
        rating: 4.6,
      },
      {
        name: "Mon Paris",
        description: "White floral with strawberry and patchouli",
        rating: 4.5,
      },
      {
        name: "Opium",
        description: "Original spicy oriental with myrrh and jasmine",
        rating: 4.8,
      },
    ],
  },
];
