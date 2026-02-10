import { Recipe } from "@/src/types";

export const MOCK_RECIPES: Recipe[] = [
  {
    id: "mock-1",
    title: "Spaghetti Carbonara Classico",
    category: "Pasta",
    area: "Italian",
    instructions:
      "Boil pasta in salted water. \nFry guanciale until crisp. \nMix eggs and cheese in a bowl. \nToss hot pasta with egg mixture and guanciale. \nServe immediately with black pepper.",
    steps: [
      {
        number: 1,
        instruction: "Bring a large pot of salted water to a boil.",
        ingredients: [],
        equipment: [{ name: "Large Pot", image: "" }],
      },
      {
        number: 2,
        instruction: "Cook spaghetti until al dente.",
        ingredients: [{ name: "Spaghetti", image: "" }],
        equipment: [],
      },
      {
        number: 3,
        instruction:
          "While pasta cooks, crisp the guanciale in a large skillet over medium heat.",
        ingredients: [{ name: "Guanciale", image: "" }],
        equipment: [{ name: "Skillet", image: "" }],
      },
      {
        number: 4,
        instruction:
          "Whisk eggs and Pecorino Romano in a small bowl until smooth.",
        ingredients: [
          { name: "Eggs", image: "" },
          { name: "Pecorino Romano", image: "" },
        ],
        equipment: [{ name: "Bowl", image: "" }],
      },
      {
        number: 5,
        instruction:
          "Drain pasta, reserving some water. Toss pasta with guanciale off heat.",
        ingredients: [],
        equipment: [],
      },
      {
        number: 6,
        instruction:
          "Quickly mix in egg mixture, adding reserved water if needed for creaminess.",
        ingredients: [],
        equipment: [],
      },
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800",
    tags: ["Pasta", "Italian", "Classic", "Dinner"],
    youtube: "",
    ingredients: [
      { name: "Spaghetti", measure: "400g" },
      { name: "Guanciale", measure: "150g" },
      { name: "Eggs", measure: "4 large" },
      { name: "Pecorino Romano", measure: "100g" },
      { name: "Black Pepper", measure: "to taste" },
    ],
    source: "Zest Classics",
  },
  {
    id: "mock-2",
    title: "Tacos Al Pastor",
    category: "Pork",
    area: "Mexican",
    instructions:
      "Marinate pork with spices and pineapple juice. \nCook pork in a skillet or grill repeatedly. \nServe on warm corn tortillas with onion, cilantro, and pineapple.",
    steps: [
      {
        number: 1,
        instruction: "Blend marinade ingredients until smooth.",
        ingredients: [
          { name: "Achiote paste", image: "" },
          { name: "Pineapple juice", image: "" },
          { name: "Chiles", image: "" },
        ],
        equipment: [{ name: "Blender", image: "" }],
      },
      {
        number: 2,
        instruction: "Marinate sliced pork for at least 4 hours.",
        ingredients: [{ name: "Pork shoulder", image: "" }],
        equipment: [{ name: "Bowl", image: "" }],
      },
      {
        number: 3,
        instruction:
          "Cook pork in a hot skillet until charred and cooked through.",
        ingredients: [],
        equipment: [{ name: "Skillet", image: "" }],
      },
      {
        number: 4,
        instruction:
          "Serve on tortillas topped with pineapple, onion, and cilantro.",
        ingredients: [
          { name: "Tortillas", image: "" },
          { name: "Pineapple", image: "" },
          { name: "Onion", image: "" },
          { name: "Cilantro", image: "" },
        ],
        equipment: [],
      },
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=800",
    tags: ["Tacos", "Mexican", "Street Food", "Spicy"],
    youtube: "",
    ingredients: [
      { name: "Pork Shoulder", measure: "1kg" },
      { name: "Achiote Paste", measure: "50g" },
      { name: "Pineapple Juice", measure: "1/2 cup" },
      { name: "Corn Tortillas", measure: "12" },
      { name: "Pineapple", measure: "1 cup chopped" },
      { name: "White Onion", measure: "1 chopped" },
      { name: "Cilantro", measure: "1 bunch" },
    ],
    source: "Zest Street Food",
  },
  {
    id: "mock-3",
    title: "Avocado Toast with Poached Egg",
    category: "Breakfast",
    area: "International",
    instructions:
      "Toast bread. \nMash avocado with lime and salt. \nPoach egg. \nAssemble toast.",
    steps: [
      {
        number: 1,
        instruction: "Toast the sourdough slices until golden.",
        ingredients: [{ name: "Sourdough bread", image: "" }],
        equipment: [{ name: "Toaster", image: "" }],
      },
      {
        number: 2,
        instruction: "Mash avocado with lime juice, salt, and pepper.",
        ingredients: [
          { name: "Avocado", image: "" },
          { name: "Lime", image: "" },
        ],
        equipment: [{ name: "Fork", image: "" }],
      },
      {
        number: 3,
        instruction: "Poach eggs in simmering water for 3-4 minutes.",
        ingredients: [{ name: "Eggs", image: "" }],
        equipment: [{ name: "Pot", image: "" }],
      },
      {
        number: 4,
        instruction: "Spread avocado on toast and top with poached egg.",
        ingredients: [],
        equipment: [],
      },
      {
        number: 5,
        instruction: "Garnish with chili flakes.",
        ingredients: [{ name: "Chili flakes", image: "" }],
        equipment: [],
      },
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1525351484163-7529414395d8?auto=format&fit=crop&q=80&w=800",
    tags: ["Breakfast", "Healthy", "Vegetarian", "Quick"],
    youtube: "",
    ingredients: [
      { name: "Sourdough Bread", measure: "2 slices" },
      { name: "Avocado", measure: "1 ripe" },
      { name: "Eggs", measure: "2 large" },
      { name: "Lime", measure: "1/2" },
      { name: "Chili Flakes", measure: "pinch" },
    ],
    source: "Zest Healthy",
  },
  {
    id: "mock-4",
    title: "Chicken Tikka Masala",
    category: "Chicken",
    area: "Indian",
    instructions:
      "Marinate chicken in yogurt and spices. \nGrill chicken. \nSimmer in tomato cream sauce. \nServe with rice or naan.",
    steps: [
      {
        number: 1,
        instruction: "Marinate chicken pieces in yogurt and spices for 1 hour.",
        ingredients: [
          { name: "Chicken breast", image: "" },
          { name: "Yogurt", image: "" },
          { name: "Spices", image: "" },
        ],
        equipment: [{ name: "Bowl", image: "" }],
      },
      {
        number: 2,
        instruction: "Grill or sear chicken until browned.",
        ingredients: [],
        equipment: [{ name: "Grill pan", image: "" }],
      },
      {
        number: 3,
        instruction: "Sauté onions, garlic, and ginger. Add spices.",
        ingredients: [
          { name: "Onion", image: "" },
          { name: "Garlic", image: "" },
          { name: "Ginger", image: "" },
        ],
        equipment: [{ name: "Pot", image: "" }],
      },
      {
        number: 4,
        instruction: "Add tomato puree and cream. Simmer.",
        ingredients: [
          { name: "Tomato puree", image: "" },
          { name: "Heavy cream", image: "" },
        ],
        equipment: [],
      },
      {
        number: 5,
        instruction: "Add chicken to sauce and cook for 10 minutes.",
        ingredients: [],
        equipment: [],
      },
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800",
    tags: ["Indian", "Curry", "Chicken", "Dinner"],
    youtube: "",
    ingredients: [
      { name: "Chicken Breast", measure: "500g" },
      { name: "Yogurt", measure: "1 cup" },
      { name: "Tomato Puree", measure: "400g" },
      { name: "Heavy Cream", measure: "1/2 cup" },
      { name: "Garam Masala", measure: "2 tbsp" },
      { name: "Basmati Rice", measure: "for serving" },
    ],
    source: "Zest World",
  },
  {
    id: "mock-5",
    title: "Classic Beef Burger",
    category: "Beef",
    area: "American",
    instructions:
      "Form beef patties. \nSeason well. \nGrill to desired doneness. \nAssemble on buns with toppings.",
    steps: [
      {
        number: 1,
        instruction: "Form ground beef into patties, handled gently.",
        ingredients: [{ name: "Ground beef", image: "" }],
        equipment: [{ name: "Hands", image: "" }],
      },
      {
        number: 2,
        instruction: "Season liberally with salt and pepper.",
        ingredients: [
          { name: "Salt", image: "" },
          { name: "Pepper", image: "" },
        ],
        equipment: [],
      },
      {
        number: 3,
        instruction: "Grill or pan-fry 4 minutes per side for medium.",
        ingredients: [],
        equipment: [{ name: "Grill", image: "" }],
      },
      {
        number: 4,
        instruction: "Add cheese in the last minute to melt.",
        ingredients: [{ name: "Cheddar cheese", image: "" }],
        equipment: [],
      },
      {
        number: 5,
        instruction: "Toast buns and assemble with toppings.",
        ingredients: [
          { name: "Burger buns", image: "" },
          { name: "Lettuce", image: "" },
          { name: "Tomato", image: "" },
        ],
        equipment: [],
      },
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800",
    tags: ["Burger", "American", "Beef", "Cheesy"],
    youtube: "",
    ingredients: [
      { name: "Ground Beef", measure: "500g" },
      { name: "Burger Buns", measure: "4" },
      { name: "Cheddar Cheese", measure: "4 slices" },
      { name: "Lettuce", measure: "4 leaves" },
      { name: "Tomato", measure: "4 slices" },
      { name: "Salt & Pepper", measure: "to taste" },
    ],
    source: "Zest Grill",
  },
  {
    id: "mock-6",
    title: "Vegetable Stir Fry",
    category: "Vegetarian",
    area: "Asian",
    instructions:
      "Chop vegetables. \nStir fry in hot wok with oil. \nAdd sauce. \nServe with rice.",
    steps: [
      {
        number: 1,
        instruction: "Chop all vegetables into bite-sized pieces.",
        ingredients: [
          { name: "Broccoli", image: "" },
          { name: "Carrots", image: "" },
          { name: "Bell Peppers", image: "" },
        ],
        equipment: [{ name: "Knife", image: "" }],
      },
      {
        number: 2,
        instruction: "Heat oil in a wok until smoking.",
        ingredients: [{ name: "Vegetable oil", image: "" }],
        equipment: [{ name: "Wok", image: "" }],
      },
      {
        number: 3,
        instruction: "Stir fry vegetables for 3-5 minutes, keeping them crisp.",
        ingredients: [],
        equipment: [],
      },
      {
        number: 4,
        instruction: "Whisk sauce ingredients and pour over vegetables.",
        ingredients: [
          { name: "Soy sauce", image: "" },
          { name: "Sesame oil", image: "" },
          { name: "Ginger", image: "" },
        ],
        equipment: [{ name: "Small bowl", image: "" }],
      },
      {
        number: 5,
        instruction: "Toss to coat and serve immediately.",
        ingredients: [],
        equipment: [],
      },
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800",
    tags: ["Vegetarian", "Asian", "Healthy", "Quick"],
    youtube: "",
    ingredients: [
      { name: "Mixed Vegetables", measure: "500g" },
      { name: "Soy Sauce", measure: "3 tbsp" },
      { name: "Sesame Oil", measure: "1 tsp" },
      { name: "Garlic", measure: "2 cloves" },
      { name: "Ginger", measure: "1 inch" },
      { name: "Rice", measure: "for serving" },
    ],
    source: "Zest Quick & Easy",
  },
];
