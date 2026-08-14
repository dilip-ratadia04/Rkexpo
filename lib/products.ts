export type ProductCategory = "Dehydrated Onion" | "Dehydrated Garlic" | "Vegetable Powders";

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  category: ProductCategory;
  origin: string;
  description: string;
  accent: string;
  visualClass: string;
  formats: string[];
  specs: { label: string; value: string }[];
  packSizes: string[];
  uses: string[];
};

const exportSpecs = (type: string) => [
  { label: "Product type", value: type },
  { label: "Origin", value: "India" },
  { label: "Supply", value: "Bulk / private label" },
  { label: "Inspection", value: "As contracted" },
];

export const products: Product[] = [
  {
    slug: "white-onion",
    name: "Dehydrated White Onion",
    shortName: "White Onion",
    category: "Dehydrated Onion",
    origin: "Indian origin",
    description: "Clean, versatile white onion ingredients offered in a complete range of cuts for industrial food production and seasoning blends.",
    accent: "#d8bd86",
    visualClass: "white-onion",
    formats: ["Flakes", "Kibbled (15–35 mm)", "Chopped", "Minced", "Granules", "Powder"],
    specs: exportSpecs("Dehydrated onion"),
    packSizes: ["10 kg", "20 kg", "25 kg", "Custom export packing"],
    uses: ["Seasoning blends", "Soups & sauces", "Ready meals", "Food processing"],
  },
  {
    slug: "red-onion",
    name: "Dehydrated Red Onion",
    shortName: "Red Onion",
    category: "Dehydrated Onion",
    origin: "Indian origin",
    description: "Distinctive red onion flavour and colour, prepared in multiple formats for manufacturers, ingredient distributors, and private labels.",
    accent: "#9e5b57",
    visualClass: "red-onion",
    formats: ["Slices", "Kibbled (15–35 mm)", "Chopped", "Minced", "Granules", "Powder"],
    specs: exportSpecs("Dehydrated onion"),
    packSizes: ["10 kg", "20 kg", "25 kg", "Custom export packing"],
    uses: ["Seasoning blends", "Snack coatings", "Soups & sauces", "Food processing"],
  },
  {
    slug: "pink-onion",
    name: "Dehydrated Pink Onion",
    shortName: "Pink Onion",
    category: "Dehydrated Onion",
    origin: "Indian origin",
    description: "Indian pink onion with a balanced savoury profile, available across coarse and fine formats to suit different production lines.",
    accent: "#c88876",
    visualClass: "pink-onion",
    formats: ["Slices", "Kibbled (15–35 mm)", "Chopped", "Minced", "Granules", "Powder"],
    specs: exportSpecs("Dehydrated onion"),
    packSizes: ["10 kg", "20 kg", "25 kg", "Custom export packing"],
    uses: ["Prepared foods", "Seasonings", "Culinary mixes", "Food processing"],
  },
  {
    slug: "dehydrated-garlic",
    name: "Dehydrated Garlic",
    shortName: "Garlic",
    category: "Dehydrated Garlic",
    origin: "Indian origin",
    description: "Aromatic Indian garlic supplied from whole cloves to fine powder for consistent flavour delivery across commercial applications.",
    accent: "#d8cfb6",
    visualClass: "garlic",
    formats: ["Whole Clove", "Large Chopped", "Chopped", "Grits", "Granules", "Ground", "Powder"],
    specs: exportSpecs("Dehydrated garlic"),
    packSizes: ["10 kg", "20 kg", "25 kg", "Custom export packing"],
    uses: ["Sauces & marinades", "Spice blends", "Snacks", "Food processing"],
  },
  {
    slug: "curry-leaves-powder",
    name: "Curry Leaves Powder",
    shortName: "Curry Leaves Powder",
    category: "Vegetable Powders",
    origin: "Indian origin",
    description: "Finely milled curry leaves with a recognisable herbal aroma for spice mixes, ready foods, and regional flavour applications.",
    accent: "#567344",
    visualClass: "curry-leaf",
    formats: ["Powder"],
    specs: exportSpecs("Leaf powder"),
    packSizes: ["10 kg", "20 kg", "25 kg", "Custom export packing"],
    uses: ["Spice blends", "Instant foods", "Seasonings", "Culinary mixes"],
  },
  {
    slug: "potato-powder",
    name: "Potato Powder",
    shortName: "Potato Powder",
    category: "Vegetable Powders",
    origin: "Indian origin",
    description: "A convenient potato ingredient for dry formulations, developed for dependable handling in savoury and processed food applications.",
    accent: "#d8bd79",
    visualClass: "potato",
    formats: ["Powder"],
    specs: exportSpecs("Vegetable powder"),
    packSizes: ["10 kg", "20 kg", "25 kg", "Custom export packing"],
    uses: ["Snack seasonings", "Soup mixes", "Bakery", "Food processing"],
  },
  {
    slug: "beetroot-powder",
    name: "Beetroot Powder",
    shortName: "Beetroot Powder",
    category: "Vegetable Powders",
    origin: "Indian origin",
    description: "Vibrant beetroot powder for colour-forward recipes, beverage mixes, nutrition products, and commercial food formulations.",
    accent: "#8f2548",
    visualClass: "beetroot",
    formats: ["Powder"],
    specs: exportSpecs("Vegetable powder"),
    packSizes: ["10 kg", "20 kg", "25 kg", "Custom export packing"],
    uses: ["Beverage mixes", "Bakery", "Nutrition blends", "Natural colour applications"],
  },
  {
    slug: "amchur-powder",
    name: "Amchur Powder",
    shortName: "Amchur Powder",
    category: "Vegetable Powders",
    origin: "Indian origin",
    description: "Tangy green mango powder that brings a clean, fruity acidity to seasoning systems, snacks, and prepared foods.",
    accent: "#b69d62",
    visualClass: "amchur",
    formats: ["Powder"],
    specs: exportSpecs("Green mango powder"),
    packSizes: ["10 kg", "20 kg", "25 kg", "Custom export packing"],
    uses: ["Spice blends", "Snack seasonings", "Chutney mixes", "Prepared foods"],
  },
];

export const categories = ["All", "Dehydrated Onion", "Dehydrated Garlic", "Vegetable Powders"] as const;

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
