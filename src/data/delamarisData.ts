export type ProductCategory =
  | 'All Products'
  | 'Mackerel'
  | 'Tuna'
  | 'Sardines'
  | 'Pâté'
  | 'Fish Salads';

export interface Product {
  id: string;
  name: string;
  brandTitle: string;
  subTitle: string;
  tinCrop?: { x: number; y: number; w: number; h: number };
  category: Exclude<ProductCategory, 'All Products'>;
  netWeight: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  imageAlt: string;
  ingredients: string[];
  dietaryNotes: string[];
  nutritionPer100g: {
    energy: string;
    fat: string;
    saturatedFat: string;
    carbohydrates: string;
    protein: string;
    salt: string;
    omega3: string;
  };
  servingSuggestion: string;
  recommendedRecipeId: string;
}

export interface RecipeIngredient {
  amount: number;
  unit: string;
  item: string;
}

export interface Recipe {
  id: string;
  title: string;
  category: 'Quick & Light' | 'Salads & Bowls' | 'Warm Dishes';
  prepTime: string;
  servings: number;
  difficulty: 'Easy' | 'Moderate';
  shortDescription: string;
  image: string;
  imageAlt: string;
  featuredProductId: string;
  ingredients: RecipeIngredient[];
  steps: string[];
  chefTip: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
}

export interface HeritageMilestone {
  year: string;
  title: string;
  location: string;
  summary: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'All Products',
  'Mackerel',
  'Tuna',
  'Sardines',
  'Pâté',
  'Fish Salads',
];

export const CATEGORY_DESCRIPTORS: Record<
  Exclude<ProductCategory, 'All Products'>,
  string
> = {
  Mackerel: 'Hand-selected fillets with vegetables or olive oil',
  Tuna: 'Firm, tender cuts preserved in Mediterranean oil',
  Sardines: 'Traditional silver Adriatic sardines & citrus',
  Pâté: 'Velvety fish spreads with zero preservatives',
  'Fish Salads': 'Ready-to-enjoy balanced coastal meals',
};

export const PRODUCTS: Product[] = [
  {
    id: 'izola-brand-mackerel',
    name: 'Izola Brand Mackerel with Vegetables',
    brandTitle: 'IZOLA BRAND',
    subTitle: 'MACKEREL WITH VEGETABLES',
    tinCrop: { x: 30, y: 30, w: 205, h: 130 },
    category: 'Mackerel',
    netWeight: '125 g',
    shortDescription:
      'Our iconic signature recipe since the 1950s: tender mackerel fillets simmered with sun-ripened tomato sauce, sweet carrots, and garden peas.',
    fullDescription:
      'Crafted according to Delamaris’ most beloved original Izola recipe, Izola Brand combines wild-caught Atlantic mackerel fillets with freshly prepared Mediterranean vegetables and aromatic tomato sauce. Ready to enjoy straight from the tin or gently warmed over crusty sourdough.',
    image: '/src/assets/images/prod_izola_mackerel_1795154799778.jpg',
    imageAlt:
      'Delamaris Izola Brand mackerel tin featuring classic red-and-yellow packaging with fresh tomatoes, sweet peas, and fresh bread',
    ingredients: [
      'Atlantic mackerel fillets (Scomber scombrus) 48%',
      'Mediterranean tomato sauce (water, tomato concentrate, cold-pressed sunflower oil, sugar, sea salt, natural wine vinegar)',
      'Selected vegetables 18% (sweet carrots, garden peas, pickled cucumber, red bell pepper)',
      'Natural herbs & aromatic spices',
    ],
    dietaryNotes: [
      '100% Natural Ingredients',
      'No Preservatives or Additives',
      'Naturally Gluten-Free',
      'Rich in Omega-3 Fatty Acids',
    ],
    nutritionPer100g: {
      energy: '698 kJ / 167 kcal',
      fat: '10.2 g',
      saturatedFat: '2.1 g',
      carbohydrates: '5.4 g',
      protein: '13.5 g',
      salt: '1.2 g',
      omega3: '1.8 g',
    },
    servingSuggestion:
      'Serve lightly chilled with warm country bread and fresh basil, or fold gently into roasted Mediterranean vegetables.',
    recommendedRecipeId: 'mackerel-with-vegetables',
  },
  {
    id: 'provencale-mackerel',
    name: 'Provencale Mackerel with Tomato Sauce',
    brandTitle: 'PROVENCALE MACKEREL',
    subTitle: 'WITH TOMATO SAUCE',
    tinCrop: { x: 270, y: 30, w: 205, h: 130 },
    category: 'Mackerel',
    netWeight: '125 g',
    shortDescription:
      'Delicate Atlantic mackerel fillets simmered in rich Provencale Mediterranean tomato sauce with aromatic herbs and sweet vegetables.',
    fullDescription:
      'Prepared with French Provencale culinary inspiration, tender mackerel fillets are gently cooked in a rich, savory tomato sauce with selected vegetables, garlic, and Mediterranean thyme. Free from preservatives, artificial flavorings, and gluten.',
    image: '/src/assets/images/prod_izola_mackerel_1795154799778.jpg',
    imageAlt:
      'Delamaris Provencale Mackerel with vegetables in rich Mediterranean tomato sauce in signature red tin packaging',
    ingredients: [
      'Atlantic mackerel fillets (Scomber scombrus) 48%',
      'Provencale tomato sauce 34% (water, tomato concentrate, cold-pressed sunflower oil, herbs, sea salt)',
      'Selected vegetables 18% (carrots, pickled cucumber, sweet peppers)',
      'Aromatic Provencale herbs',
    ],
    dietaryNotes: [
      '100% Natural Ingredients',
      'Zero Preservatives',
      'Naturally Gluten-Free',
      'Rich in Omega-3 Fatty Acids',
    ],
    nutritionPer100g: {
      energy: '685 kJ / 164 kcal',
      fat: '9.8 g',
      saturatedFat: '2.0 g',
      carbohydrates: '5.6 g',
      protein: '13.2 g',
      salt: '1.2 g',
      omega3: '1.7 g',
    },
    servingSuggestion:
      'Warm gently in a pan and serve over creamy polenta or rustic toast with extra-virgin olive oil.',
    recommendedRecipeId: 'mackerel-with-vegetables',
  },
  {
    id: 'mackerel-fillets-sunflower',
    name: 'Mackerel Fillets in Sunflower Oil',
    brandTitle: 'MACKEREL FILLETS',
    subTitle: 'IN SUNFLOWER OIL',
    tinCrop: { x: 510, y: 30, w: 205, h: 130 },
    category: 'Mackerel',
    netWeight: '125 g',
    shortDescription:
      'Mild, tender boneless Atlantic mackerel fillets preserved in pure, light cold-pressed sunflower oil for clean taste.',
    fullDescription:
      'Hand-cleaned boneless and skinless Atlantic mackerel fillets gently preserved in fine golden sunflower oil. Its delicate, light profile makes it the ultimate clean protein addition to fresh seasonal salads, pasta, and coastal sandwiches.',
    image: '/src/assets/images/prod_mackerel_fillets_oil_1795154800400.jpg',
    imageAlt:
      'Delamaris Mackerel Fillets in sunflower oil tin with bright sunflower graphics',
    ingredients: [
      'Boneless Atlantic mackerel fillets (Scomber scombrus) 68%',
      'Cold-pressed sunflower oil 31%',
      'Adriatic sea salt',
    ],
    dietaryNotes: [
      'High Protein Content',
      'Zero Preservatives',
      'Gluten-Free & GMO-Free',
      'Rich in Omega-3 Fatty Acids',
    ],
    nutritionPer100g: {
      energy: '980 kJ / 235 kcal',
      fat: '17.2 g',
      saturatedFat: '2.5 g',
      carbohydrates: '0.0 g',
      protein: '20.0 g',
      salt: '1.0 g',
      omega3: '2.2 g',
    },
    servingSuggestion:
      'Flake into warm pasta with cherry tomatoes, fresh basil, and toasted pine nuts.',
    recommendedRecipeId: 'mackerel-toast',
  },
  {
    id: 'mackerel-fillets-olive-oil',
    name: 'Mackerel Fillets in Olive Oil',
    brandTitle: 'MACKEREL FILLETS',
    subTitle: 'IN OLIVE OIL',
    tinCrop: { x: 750, y: 30, w: 205, h: 130 },
    category: 'Mackerel',
    netWeight: '125 g',
    shortDescription:
      'Delicate, hand-cleaned boneless mackerel fillets preserved in smooth golden olive oil for clean coastal flavor.',
    fullDescription:
      'Carefully filleted to remove skin and bones, these tender Atlantic mackerel fillets rest in fine Mediterranean olive oil that preserves their delicate texture and naturally rich marine aroma. Ideal for gourmet tartines, grain bowls, and refined everyday lunches.',
    image: '/src/assets/images/prod_mackerel_fillets_oil_1795154800400.jpg',
    imageAlt:
      'Brushed silver oval tin opened to reveal glistening golden boneless mackerel fillets in olive oil with lemon zest and rosemary',
    ingredients: [
      'Boneless Atlantic mackerel fillets (Scomber scombrus) 68%',
      'Mediterranean olive oil 30%',
      'Adriatic sea salt',
    ],
    dietaryNotes: [
      'High Protein Content',
      'No Preservatives',
      'Gluten-Free & GMO-Free',
      'Natural Source of Vitamin D',
    ],
    nutritionPer100g: {
      energy: '962 kJ / 231 kcal',
      fat: '16.8 g',
      saturatedFat: '2.9 g',
      carbohydrates: '0.0 g',
      protein: '20.1 g',
      salt: '1.1 g',
      omega3: '2.4 g',
    },
    servingSuggestion:
      'Flake over grilled sourdough with whipped lemon ricotta, pickled shallots, and fresh dill.',
    recommendedRecipeId: 'mackerel-toast',
  },
  {
    id: 'adriatic-tuna-olive-oil',
    name: 'Tuna Steak Fillets in Olive Oil',
    brandTitle: 'TUNA STEAK FILLETS',
    subTitle: 'IN OLIVE OIL',
    category: 'Tuna',
    netWeight: '115 g',
    shortDescription:
      'Firm, rosy whole-cut tuna loin pieces steeped in golden olive oil with a delicate pinch of sea salt.',
    fullDescription:
      'Selected from responsibly caught skipjack and yellowfin loins, our Tuna Steak Fillets retain their natural flaky structure and juicy tenderness. Gently matured in olive oil so every forkful elevates crisp salads, pasta, and artisanal coastal sandwiches.',
    image: '/src/assets/images/prod_tuna_olive_oil_1795154802981.jpg',
    imageAlt:
      'Brushed round tuna tin next to a stoneware dish of chunky rosy tuna fillets glistening in olive oil with oregano and sea salt',
    ingredients: [
      'Selected tuna loin fillets (Katsuwonus pelamis) 70%',
      'Mediterranean olive oil 28.8%',
      'Sea salt',
    ],
    dietaryNotes: [
      'High Lean Protein',
      'Responsibly Sourced',
      'Zero Artificial Additives',
      'Naturally Gluten-Free',
    ],
    nutritionPer100g: {
      energy: '845 kJ / 202 kcal',
      fat: '11.4 g',
      saturatedFat: '1.8 g',
      carbohydrates: '0.0 g',
      protein: '24.8 g',
      salt: '1.0 g',
      omega3: '0.9 g',
    },
    servingSuggestion:
      'Toss gently with cucumber, Kalamata olives, capers, red onion, and fresh oregano for an effortless Mediterranean salad.',
    recommendedRecipeId: 'mediterranean-tuna-salad',
  },
  {
    id: 'sardines-olive-oil-lemon',
    name: 'Adriatic Sardines with Lemon',
    brandTitle: 'SARDINES WITH LEMON',
    subTitle: 'IN OLIVE OIL',
    category: 'Sardines',
    netWeight: '125 g',
    shortDescription:
      'Whole silver sardines carefully hand-packed in golden olive oil with a bright slice of sun-ripened Mediterranean lemon.',
    fullDescription:
      'Honoring over a century of Istrian canning craftsmanship, our whole silver sardines are steam-prepared and paired with natural olive oil and fresh lemon slice. Rich in calcium and Omega-3 fatty acids, they deliver authentic Adriatic depth in minutes.',
    image: '/src/assets/images/prod_sardines_lemon_1795154819978.jpg',
    imageAlt:
      'Classic rectangular tin tightly packed with gleaming silver Adriatic sardines in olive oil with a fresh lemon wheel and bay leaf',
    ingredients: [
      'Whole silver sardines (Sardina pilchardus) 70%',
      'Olive oil 25%',
      'Fresh lemon slice 4%',
      'Sea salt',
    ],
    dietaryNotes: [
      'Natural Source of Calcium',
      'Rich in Omega-3',
      'No Preservatives',
      'Gluten-Free',
    ],
    nutritionPer100g: {
      energy: '912 kJ / 219 kcal',
      fat: '14.5 g',
      saturatedFat: '2.7 g',
      carbohydrates: '0.2 g',
      protein: '21.8 g',
      salt: '1.1 g',
      omega3: '2.1 g',
    },
    servingSuggestion:
      'Fold into al dente spaghetti with toasted garlic breadcrumbs, pine nuts, and fragrant wild fennel.',
    recommendedRecipeId: 'sardine-pasta',
  },
  {
    id: 'classic-tourist-pate',
    name: 'Classic Tourist Mackerel Pâté',
    brandTitle: 'TOURIST PÂTÉ',
    subTitle: 'MACKEREL & VEGETABLES',
    category: 'Pâté',
    netWeight: '95 g',
    shortDescription:
      'A nostalgic European favorite: velvety mackerel pâté blended with savory carrots, tomatoes, and delicate spices.',
    fullDescription:
      'Generations of families and travelers know Tourist Pâté for its unmistakable smooth texture and warm, savory balance of prime mackerel and garden vegetables. Made without artificial flavor enhancers, colorings, or preservatives—just honest coastal nourishment.',
    image: '/src/assets/images/prod_tourist_pate_1795154902157.jpg',
    imageAlt:
      'Opened round fish pâté tin next to toasted sourdough slices spread with smooth mackerel and vegetable pâté topped with chives and cherry tomatoes',
    ingredients: [
      'Mackerel fillets (Scomber scombrus) 42%',
      'Cold-pressed vegetable oil & water',
      'Tomato puree, sweet carrots & onion',
      'Natural sea salt & mild Mediterranean spice blend',
    ],
    dietaryNotes: [
      'No Flavor Enhancers',
      'No Preservatives',
      'Gluten-Free',
      'Rich in Natural Fish Protein',
    ],
    nutritionPer100g: {
      energy: '985 kJ / 237 kcal',
      fat: '19.4 g',
      saturatedFat: '2.6 g',
      carbohydrates: '3.2 g',
      protein: '12.4 g',
      salt: '1.3 g',
      omega3: '1.3 g',
    },
    servingSuggestion:
      'Spread generously onto warm rustic rye or sourdough bread and finish with fresh chives and cherry tomatoes.',
    recommendedRecipeId: 'coastal-fish-sandwich',
  },
  {
    id: 'tuna-salad-mediterana',
    name: 'Tuna Salad Mediterana',
    brandTitle: 'TUNA SALAD',
    subTitle: 'MEDITERANA',
    category: 'Fish Salads',
    netWeight: '160 g',
    shortDescription:
      'A complete ready-to-eat coastal meal of tender tuna, Kalamata olives, chickpeas, sweet corn, and crisp red peppers.',
    fullDescription:
      'Designed for lively, modern schedules without compromising ingredient purity, Tuna Salad Mediterana brings together juicy tuna chunks, vibrant Mediterranean vegetables, olives, and delicate olive oil dressing in a convenient single-serve tin.',
    image: '/src/assets/images/prod_tuna_salad_mediterana_1795154907991.jpg',
    imageAlt:
      'Open easy-peel tuna salad tin alongside a matte ceramic bowl filled with tuna chunks, olives, chickpeas, corn, and diced red peppers',
    ingredients: [
      'Selected tuna pieces 28%',
      'Mediterranean vegetables 54% (chickpeas, sweet corn, red bell pepper, green & Kalamata olives, carrots)',
      'Extra-virgin olive oil & sunflower oil dressing',
      'Natural sea salt, lemon juice & herbs',
    ],
    dietaryNotes: [
      'Ready-to-Eat Balanced Meal',
      'Source of Plant Fiber & Protein',
      'No Preservatives',
      'Gluten-Free',
    ],
    nutritionPer100g: {
      energy: '665 kJ / 159 kcal',
      fat: '8.9 g',
      saturatedFat: '1.2 g',
      carbohydrates: '9.8 g',
      protein: '10.6 g',
      salt: '1.1 g',
      omega3: '0.6 g',
    },
    servingSuggestion:
      'Enjoy directly at your desk or outdoors, or spoon over warm quinoa and charred zucchini for a hearty dinner bowl.',
    recommendedRecipeId: 'seafood-salad-bowl',
  },
];

export const HERITAGE_MILESTONES: HeritageMilestone[] = [
  {
    year: '1879',
    title: 'Coastal Beginnings in Izola',
    location: 'Izola, Slovenian Adriatic Coast',
    summary:
      'The story begins along the limestone quays of Izola, where pioneering fish-preserving workshops turned the daily Adriatic catch into nourishing staples built to travel across Central Europe.',
  },
  {
    year: '1954',
    title: 'Birth of the Iconic Izola Brand',
    location: 'Izola Cannery',
    summary:
      'Combining hand-cleaned mackerel fillets with slow-simmered garden vegetables and tomato sauce, Delamaris created its timeless signature recipe—still loved across generations today.',
  },
  {
    year: '2014',
    title: 'Modern Craft in Kal pri Pivki',
    location: 'Kal 1, Pivka, Slovenia',
    summary:
      'Opening one of Europe’s most advanced, energy-conscious seafood production facilities, uniting 145+ years of culinary mastery with rigorous IFS and HACCP quality systems.',
  },
  {
    year: 'Today',
    title: '145+ Years of Natural Everyday Taste',
    location: 'Across Europe & Beyond',
    summary:
      'Remaining faithful to a clean-label promise—wild-caught fish, real vegetables, fine oils, and zero preservatives—crafted for modern kitchens that value authenticity and ease.',
  },
];

export const QUALITY_PILLARS = [
  {
    id: 'natural-ingredients',
    title: '100% Natural Ingredients',
    metric: 'Zero Preservatives',
    description:
      'Every recipe relies strictly on wild fish, real garden vegetables, quality oils, and natural spices—never artificial colorings, flavor enhancers, gluten, or GMOs.',
  },
  {
    id: 'responsible-fishing',
    title: 'Responsible Fishing',
    metric: 'Marine Stewardship',
    description:
      'We partner exclusively with certified, regulated fisheries committed to protecting marine biodiversity and healthy North Atlantic and Adriatic fish populations.',
  },
  {
    id: 'quality-control',
    title: 'Above-Standard Quality Control',
    metric: 'IFS & HACCP Certified',
    description:
      'Every production batch passes strict laboratory, microbiological, and sensory inspections from raw material arrival through final thermal sterilization.',
  },
  {
    id: 'food-safety',
    title: 'Complete Food Safety & Traceability',
    metric: '100% Batch Traceability',
    description:
      'Thermal sterilization preserves freshness naturally without chemical additives, backed by full lot-level traceability from catch area to table.',
  },
  {
    id: 'nutritional-integrity',
    title: 'Naturally Rich Nutrition',
    metric: 'High Omega-3 & Protein',
    description:
      'Gentle steam preparation locks in essential Omega-3 fatty acids, high-bioavailability marine protein, vitamin D, and natural calcium.',
  },
  {
    id: 'clean-production',
    title: 'Sustainable European Production',
    metric: 'Modern Kal Facility',
    description:
      'Our contemporary plant in Kal pri Pivki prioritizes energy efficiency, recyclable tin packaging, water stewardship, and minimal environmental footprint.',
  },
];

export const RECIPES: Recipe[] = [
  {
    id: 'mediterranean-tuna-salad',
    title: 'Mediterranean Tuna Salad',
    category: 'Salads & Bowls',
    prepTime: '10 min',
    servings: 2,
    difficulty: 'Easy',
    shortDescription:
      'Crisp cucumber, Kalamata olives, vine cherry tomatoes, and briny capers tossed with flaky olive-oil tuna fillets.',
    image: '/src/assets/images/recipe_tuna_salad_1795154898431.jpg',
    imageAlt:
      'Wide speckled stoneware bowl filled with Mediterranean tuna salad, cucumber, cherry tomatoes, red onion, Kalamata olives, capers, and fresh oregano',
    featuredProductId: 'adriatic-tuna-olive-oil',
    ingredients: [
      { amount: 2, unit: 'tins', item: 'Delamaris Tuna Steak Fillets in Olive Oil (115 g)' },
      { amount: 150, unit: 'g', item: 'ripe cherry tomatoes, halved' },
      { amount: 0.5, unit: 'medium', item: 'crisp cucumber, thinly sliced' },
      { amount: 40, unit: 'g', item: 'pitted Kalamata olives' },
      { amount: 0.5, unit: 'small', item: 'red onion, finely shaved' },
      { amount: 1, unit: 'tbsp', item: 'drained Adriatic capers' },
      { amount: 1, unit: 'tbsp', item: 'fresh lemon juice & oregano leaves' },
    ],
    steps: [
      'Arrange the halved cherry tomatoes, crisp cucumber slices, and shaved red onion in a wide ceramic serving bowl.',
      'Open the Delamaris Tuna Steak Fillets and reserve two tablespoons of the aromatic olive oil from the tin for your dressing.',
      'Gently lift large flaky pieces of tuna over the vegetables, keeping the tender loin chunks intact.',
      'Scatter Kalamata olives, capers, and fresh oregano leaves across the salad.',
      'Whisk the reserved olive oil with fresh lemon juice and cracked black pepper, drizzle generously over the bowl, and serve immediately with crusty bread.',
    ],
    chefTip:
      'Never discard the olive oil from the tuna tin—it carries subtle coastal richness that makes a vibrant natural vinaigrette.',
  },
  {
    id: 'mackerel-toast',
    title: 'Mackerel Toast with Whipped Lemon Ricotta',
    category: 'Quick & Light',
    prepTime: '8 min',
    servings: 2,
    difficulty: 'Easy',
    shortDescription:
      'Charred country sourdough layered with bright lemon ricotta, tender olive-oil mackerel fillets, pickled shallots, and dill.',
    image: '/src/assets/images/recipe_mackerel_toast_1795154800747.jpg',
    imageAlt:
      'Two grilled sourdough tartines spread with whipped lemon ricotta and topped with golden mackerel fillets, pickled shallots, and fresh dill',
    featuredProductId: 'mackerel-fillets-olive-oil',
    ingredients: [
      { amount: 1, unit: 'tin', item: 'Delamaris Mackerel Fillets in Olive Oil (125 g)' },
      { amount: 2, unit: 'thick slices', item: 'country sourdough bread' },
      { amount: 100, unit: 'g', item: 'fresh whole-milk ricotta' },
      { amount: 1, unit: 'tsp', item: 'finely grated organic lemon zest' },
      { amount: 2, unit: 'tbsp', item: 'thinly sliced pickled shallots' },
      { amount: 1, unit: 'tbsp', item: 'fresh dill fronds & cracked black pepper' },
    ],
    steps: [
      'Toast or lightly grill thick sourdough slices until golden and crisp along the crust.',
      'Whip the fresh ricotta with grated lemon zest, a pinch of sea salt, and a teaspoon of olive oil until airy and smooth.',
      'Spread a generous layer of whipped ricotta onto each warm slice of sourdough.',
      'Place whole or gently flaked Delamaris Mackerel Fillets on top, followed by bright pickled shallots.',
      'Finish with fresh dill, cracked black pepper, and a final drizzle of olive oil.',
    ],
    chefTip:
      'Quick-pickle shallots in red wine vinegar with a pinch of salt for just 5 minutes while your bread toasts.',
  },
  {
    id: 'sardine-pasta',
    title: 'Adriatic Sardine Pasta with Fennel & Breadcrumbs',
    category: 'Warm Dishes',
    prepTime: '20 min',
    servings: 2,
    difficulty: 'Easy',
    shortDescription:
      'Al dente spaghetti tossed with silver sardines, toasted garlic pangrattato, golden pine nuts, and wild fennel.',
    image: '/src/assets/images/recipe_sardine_pasta_1795154803236.jpg',
    imageAlt:
      'Cream stoneware bowl of rustic spaghetti twirled with silver Adriatic sardines, toasted golden breadcrumbs, pine nuts, fennel fronds, and lemon zest',
    featuredProductId: 'sardines-olive-oil-lemon',
    ingredients: [
      { amount: 2, unit: 'tins', item: 'Delamaris Adriatic Sardines with Lemon (125 g)' },
      { amount: 200, unit: 'g', item: 'bronze-die spaghetti' },
      { amount: 40, unit: 'g', item: 'coarse sourdough breadcrumbs' },
      { amount: 2, unit: 'tbsp', item: 'toasted pine nuts' },
      { amount: 2, unit: 'cloves', item: 'garlic, finely minced' },
      { amount: 2, unit: 'tbsp', item: 'fresh wild fennel fronds or flat-leaf parsley' },
    ],
    steps: [
      'Cook spaghetti in well-salted boiling water until al dente, reserving half a cup of starchy pasta water before draining.',
      'In a wide skillet, toast sourdough breadcrumbs with a spoonful of sardine olive oil until crisp and deep golden; set aside.',
      'Warm the remaining sardine oil gently with minced garlic and pine nuts for one minute until fragrant.',
      'Add the cooked spaghetti, splash in pasta water, and gently fold in the Delamaris Adriatic Sardines so they warm through without breaking apart completely.',
      'Plate immediately and top with crunchy breadcrumbs, fresh fennel fronds, and bright grated lemon zest.',
    ],
    chefTip:
      'Golden toasted breadcrumbs—known along the Adriatic as pangrattato—add crisp texture without overpowering the delicate fish.',
  },
  {
    id: 'coastal-fish-sandwich',
    title: 'Pan Bagnat Coastal Fish Sandwich',
    category: 'Quick & Light',
    prepTime: '10 min',
    servings: 2,
    difficulty: 'Easy',
    shortDescription:
      'Crusty ciabatta brushed with olive oil and tapenade, layered with flaky tuna, heirloom tomatoes, egg, and fresh basil.',
    image: '/src/assets/images/recipe_fish_sandwich_1795154800192.jpg',
    imageAlt:
      'Halved crusty Mediterranean ciabatta fish sandwich revealing flaky fish, ripe red tomato slices, egg, crisp greens, olive tapenade, and basil',
    featuredProductId: 'adriatic-tuna-olive-oil',
    ingredients: [
      { amount: 1, unit: 'tin', item: 'Delamaris Tuna Steak Fillets or Tourist Pâté' },
      { amount: 1, unit: 'large', item: 'crusty artisanal ciabatta loaf, split horizontally' },
      { amount: 2, unit: 'tbsp', item: 'black olive tapenade' },
      { amount: 1, unit: 'ripe', item: 'heirloom tomato, thinly sliced' },
      { amount: 1, unit: 'hard-boiled', item: 'free-range egg, sliced' },
      { amount: 1, unit: 'handful', item: 'tender baby lettuce & fresh basil leaves' },
    ],
    steps: [
      'Slice the crusty ciabatta lengthwise and lightly drizzle the cut crumb with aromatic olive oil from the fish tin.',
      'Spread black olive tapenade evenly across the bottom half, followed by tender baby lettuce leaves.',
      'Layer flaky Delamaris tuna chunks (or a rich swipe of Classic Tourist Pâté) evenly over the greens.',
      'Top with sliced heirloom tomatoes seasoned with sea salt, hard-boiled egg rounds, and whole fresh basil leaves.',
      'Close the sandwich, press gently for one minute so the Mediterranean juices infuse the bread, slice in half, and enjoy.',
    ],
    chefTip:
      'Wrap tightly in parchment for 15 minutes before a picnic or coastal walk so the ciabatta absorbs every drop of olive oil and tomato.',
  },
  {
    id: 'seafood-salad-bowl',
    title: 'Warm Quinoa & Mackerel Seafood Bowl',
    category: 'Salads & Bowls',
    prepTime: '15 min',
    servings: 2,
    difficulty: 'Easy',
    shortDescription:
      'Nutty tricolor quinoa topped with golden mackerel fillets, charred zucchini ribbons, avocado, roasted chickpeas, and radishes.',
    image: '/src/assets/images/recipe_seafood_bowl_1795154800529.jpg',
    imageAlt:
      'Earthy ceramic grain bowl with tricolor quinoa, tender mackerel fillets, charred zucchini ribbons, avocado slices, roasted chickpeas, and radish',
    featuredProductId: 'mackerel-fillets-olive-oil',
    ingredients: [
      { amount: 2, unit: 'tins', item: 'Delamaris Mackerel Fillets in Olive Oil (125 g)' },
      { amount: 160, unit: 'g', item: 'cooked warm tricolor quinoa' },
      { amount: 1, unit: 'small', item: 'baby zucchini, ribboned and lightly charred' },
      { amount: 1, unit: 'ripe', item: 'avocado, sliced' },
      { amount: 80, unit: 'g', item: 'warm spiced roasted chickpeas' },
      { amount: 4, unit: 'crisp', item: 'red radishes, thinly sliced, plus sesame & lemon' },
    ],
    steps: [
      'Divide warm, fluffy tricolor quinoa between two deep stoneware bowls and season lightly with lemon juice and herbs.',
      'Quickly sear baby zucchini ribbons in a hot pan for 2 minutes until lightly blistered.',
      'Arrange charred zucchini, crispy roasted chickpeas, sliced avocado, and radish rounds harmoniously over the quinoa.',
      'Crown each bowl with whole Delamaris Mackerel Fillets.',
      'Sprinkle with toasted sesame seeds, lemon zest, and a drizzle of lemon-herb olive oil dressing.',
    ],
    chefTip:
      'Swap in Delamaris Tuna Salad Mediterana when short on time—it brings chickpeas, olives, and peppers straight to your grain bowl.',
  },
  {
    id: 'mackerel-with-vegetables',
    title: 'Braised Mackerel with Mediterranean Vegetables',
    category: 'Warm Dishes',
    prepTime: '18 min',
    servings: 2,
    difficulty: 'Moderate',
    shortDescription:
      'Succulent mackerel fillets warmed in terracotta with sweet bell peppers, courgettes, blistered vine tomatoes, and thyme.',
    image: '/src/assets/images/recipe_mackerel_vegetables_1795154799806.jpg',
    imageAlt:
      'Terracotta baking dish with braised mackerel fillets nestled among red and yellow peppers, courgettes, vine cherry tomatoes, green beans, and fresh thyme',
    featuredProductId: 'izola-brand-mackerel',
    ingredients: [
      { amount: 2, unit: 'tins', item: 'Delamaris Izola Brand Mackerel with Vegetables (125 g)' },
      { amount: 1, unit: 'sweet', item: 'red & yellow bell pepper mix, sliced' },
      { amount: 1, unit: 'medium', item: 'courgette, cut into thick coins' },
      { amount: 120, unit: 'g', item: 'vine cherry tomatoes & fine green beans' },
      { amount: 1, unit: 'tbsp', item: 'extra-virgin olive oil & fresh thyme sprigs' },
      { amount: 4, unit: 'slices', item: 'crusty rustic bread for serving' },
    ],
    steps: [
      'Preheat your oven to 200°C (or warm a wide terracotta skillet on the stovetop).',
      'Toss sliced bell peppers, courgettes, green beans, and cherry tomatoes with olive oil, sea salt, and thyme, and roast for 12 minutes until tender and blistered.',
      'Nestle the Delamaris Izola Brand mackerel fillets and their rich tomato-vegetable sauce gently among the roasted vegetables.',
      'Return to the oven for 4–5 minutes just until bubbling and aromatic.',
      'Bring the terracotta dish directly to the table with crusty country bread to soak up every drop of the coastal sauce.',
    ],
    chefTip:
      'Because Delamaris fillets are already gently steam-cooked to perfection, only warm them through during the final minutes so they remain tender and juicy.',
  },
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'museum-corner-145-years',
    title: '145 Years of Adriatic Heritage: Inside the Delamaris Museum Corner',
    category: 'Heritage',
    date: 'October 2026',
    readTime: '4 min read',
    excerpt:
      'In collaboration with the Koper Regional Museum, archival photography, maritime tools, and historic tins preserve the human craft behind Slovenia’s iconic coastal brand.',
    image: '/src/assets/images/news_museum_heritage_1795154799650.jpg',
    imageAlt:
      'Sunlit coastal Slovenian heritage museum gallery featuring framed historical photographs of Adriatic fishermen, brass maritime instruments, and nautical charts',
    paragraphs: [
      'Since 1879, the rhythm of Delamaris has been inseparable from the tides and fishing communities of Izola. To honor more than 145 years of coastal craft, the Delamaris Museum Corner brings together rare archival photographs, maritime navigation instruments, and original hand-painted lithograph tins.',
      'Visitors can trace how nineteenth-century preservation workshops evolved alongside Istrian fishing families—transforming seasonal catches of sardines and mackerel into dependable, naturally preserved nourishment exported across Central Europe and beyond.',
      'Today, while production thrives inside our modern Kal pri Pivki facility, the culinary principles documented on the museum walls remain unchanged: select the finest wild fish, respect simple natural ingredients, and never compromise on craftsmanship.',
    ],
  },
  {
    id: 'omega3-everyday-mediterranean',
    title: 'Why Natural Omega-3 Matters in Everyday Mediterranean Cooking',
    category: 'Nutrition',
    date: 'September 2026',
    readTime: '3 min read',
    excerpt:
      'How keeping clean-label mackerel and sardines in your pantry makes heart-healthy, nutrient-dense Mediterranean meals effortless any day of the week.',
    image: '/src/assets/images/news_omega3_wellness_1795154798075.jpg',
    imageAlt:
      'Sunlit Mediterranean morning table by a coastal window with silver sardines in olive oil, sliced ripe tomatoes, whole-grain bread, and walnuts',
    paragraphs: [
      'Nutritionists across Europe consistently point to the Mediterranean dietary pattern as a gold standard for cardiovascular health, cognitive clarity, and sustained energy—with fatty pelagic fish like Atlantic mackerel and Adriatic sardines sitting right at its center.',
      'Unlike heavily processed convenience foods, properly heat-sterilized canned fish retains its full profile of EPA and DHA Omega-3 fatty acids, natural vitamin D, and bioavailable calcium without requiring a single chemical preservative.',
      'Whether flaked onto warm morning sourdough with ripe garden tomatoes or folded into an evening grain bowl, keeping Delamaris tins in the kitchen turns five spare minutes into a genuinely restorative coastal meal.',
    ],
  },
  {
    id: 'sustainable-waters-modern-craft',
    title: 'Sustainable Waters & Modern Craft: Our Commitment to Clean Production',
    category: 'Sustainability',
    date: 'August 2026',
    readTime: '5 min read',
    excerpt:
      'From certified responsible fisheries to energy-efficient processes in Kal pri Pivki, discover how the Pivka–Delamaris Group safeguards marine ecosystems.',
    image: '/src/assets/images/news_sustainable_seas_1795154800935.jpg',
    imageAlt:
      'Clear sunlit deep teal Adriatic Sea viewed from the timber deck of a small sustainable European fishing boat at morning light',
    paragraphs: [
      'A seafood brand with more than a century of history understands that longevity depends entirely on the health of our oceans. At Delamaris, responsible sourcing starts with strict fishery verification, seasonal catch awareness, and transparent supply chains.',
      'Inside our modern Kal pri Pivki facility, sustainability extends to every stage of production—from water conservation and heat recovery during sterilization to fully recyclable metal packaging that protects food freshness for years without cold-chain energy costs.',
      'As part of the Pivka–Delamaris Group’s long-term ESG roadmap, we continue investing in lower-emission operations, food-waste reduction, and clean-label innovation for future generations.',
    ],
  },
];

export const VERIFIED_CONTACT = {
  companyName: 'Delamaris, d.o.o.',
  groupName: 'Pivka – Delamaris Group',
  addressLine1: 'Kal 1',
  addressLine2: 'SI-6257 Pivka, Slovenia',
  phone: '+386 5 70 31 111',
  phoneHref: 'tel:+38657031111',
  email: 'info@delamaris.si',
  emailHref: 'mailto:info@delamaris.si',
  website: 'https://www.delamaris.eu',
  hours: 'Monday – Friday · 08:00 – 16:00 CET',
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/Delamaris1879' },
    { label: 'Instagram', href: 'https://www.instagram.com/delamaris_1879' },
    { label: 'YouTube', href: 'https://www.youtube.com/@Delamaris1879' },
  ],
};
