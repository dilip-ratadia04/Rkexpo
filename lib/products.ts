export type Product = {
  slug: string;
  name: string;
  shortName: string;
  category: "Rice" | "Pulses" | "Millets" | "Cereals";
  origin: string;
  description: string;
  accent: string;
  visualClass: string;
  specs: { label: string; value: string }[];
  packSizes: string[];
  uses: string[];
};

export const products: Product[] = [
  {
    slug: "1121-basmati-rice",
    name: "1121 Basmati Rice",
    shortName: "Basmati Rice",
    category: "Rice",
    origin: "Punjab & Haryana",
    description:
      "Extra-long aromatic grains with a graceful elongation, delicate texture, and a clean, naturally fragrant finish.",
    accent: "#d9aa55",
    visualClass: "basmati",
    specs: [
      { label: "Grain length", value: "8.2 mm min." },
      { label: "Moisture", value: "12.5% max." },
      { label: "Broken", value: "1% max." },
      { label: "Sortex", value: "100%" },
    ],
    packSizes: ["1 kg", "5 kg", "10 kg", "25 kg", "50 kg"],
    uses: ["Retail packs", "Food service", "Private label"],
  },
  {
    slug: "ir-64-rice",
    name: "IR 64 Parboiled Rice",
    shortName: "IR 64 Rice",
    category: "Rice",
    origin: "Central India",
    description:
      "A reliable everyday long-grain rice known for consistent cooking, firm texture, and excellent value at scale.",
    accent: "#e6c477",
    visualClass: "ir64",
    specs: [
      { label: "Grain length", value: "6.0 mm avg." },
      { label: "Moisture", value: "14% max." },
      { label: "Broken", value: "5% max." },
      { label: "Foreign matter", value: "0.5% max." },
    ],
    packSizes: ["5 kg", "10 kg", "25 kg", "50 kg"],
    uses: ["Wholesale", "Food service", "Relief supply"],
  },
  {
    slug: "kabuli-chickpeas",
    name: "Kabuli Chickpeas",
    shortName: "Kabuli Chana",
    category: "Pulses",
    origin: "Madhya Pradesh",
    description:
      "Bold, creamy-white chickpeas selected for uniform sizing, quick hydration, and a smooth cooked bite.",
    accent: "#c99a61",
    visualClass: "chickpea",
    specs: [
      { label: "Count", value: "42–44 / oz" },
      { label: "Moisture", value: "12% max." },
      { label: "Purity", value: "99.5% min." },
      { label: "Admixture", value: "0.5% max." },
    ],
    packSizes: ["500 g", "1 kg", "25 kg", "50 kg"],
    uses: ["Canning", "Hummus", "Retail packs"],
  },
  {
    slug: "pearl-millet",
    name: "Pearl Millet",
    shortName: "Bajra",
    category: "Millets",
    origin: "Rajasthan & Gujarat",
    description:
      "Naturally robust, nutrient-dense millet with an earthy flavour, carefully cleaned for food and feed markets.",
    accent: "#b48a5a",
    visualClass: "millet",
    specs: [
      { label: "Moisture", value: "12% max." },
      { label: "Purity", value: "99% min." },
      { label: "Foreign matter", value: "1% max." },
      { label: "Damaged", value: "2% max." },
    ],
    packSizes: ["10 kg", "25 kg", "50 kg", "Bulk"],
    uses: ["Milling", "Feed", "Health foods"],
  },
  {
    slug: "sorghum",
    name: "White Sorghum",
    shortName: "Jowar",
    category: "Millets",
    origin: "Maharashtra & Karnataka",
    description:
      "Clean, bright white sorghum with dependable milling characteristics for gluten-free food and feed applications.",
    accent: "#dcc8a1",
    visualClass: "sorghum",
    specs: [
      { label: "Moisture", value: "12% max." },
      { label: "Purity", value: "99% min." },
      { label: "Tannin", value: "Low" },
      { label: "Admixture", value: "1% max." },
    ],
    packSizes: ["10 kg", "25 kg", "50 kg", "Bulk"],
    uses: ["Flour", "Brewing", "Animal feed"],
  },
  {
    slug: "yellow-maize",
    name: "Yellow Maize",
    shortName: "Yellow Maize",
    category: "Cereals",
    origin: "Karnataka & Bihar",
    description:
      "Sun-dried yellow corn selected for strong colour, consistent kernel size, and dependable nutrition profiles.",
    accent: "#d9a928",
    visualClass: "maize",
    specs: [
      { label: "Moisture", value: "14% max." },
      { label: "Purity", value: "98% min." },
      { label: "Broken", value: "3% max." },
      { label: "Aflatoxin", value: "As contracted" },
    ],
    packSizes: ["25 kg", "50 kg", "Bulk"],
    uses: ["Feed", "Starch", "Food processing"],
  },
];

export const categories = ["All", "Rice", "Pulses", "Millets", "Cereals"] as const;

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
