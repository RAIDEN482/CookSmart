import type { Recipe, RecipeResult, RecommendRequest, RecommendResponse, Bucket } from '../types/api'

// ── 200 common ingredients for autocomplete ──────────────────────
export const mockIngredients: string[] = [
  'chicken breast','chicken thighs','ground beef','beef steak','pork chops','bacon','ham','sausage','lamb',
  'salmon','tuna','shrimp','cod','tilapia','sardines','anchovies','tofu','tempeh','eggs','egg whites',
  'milk','whole milk','heavy cream','sour cream','butter','unsalted butter','cream cheese','ricotta',
  'mozzarella','cheddar','parmesan','feta','gruyere','brie','yogurt','greek yogurt','buttermilk',
  'garlic','onion','red onion','shallot','leek','scallion','tomato','cherry tomatoes','bell pepper',
  'red bell pepper','jalapeño','carrot','celery','broccoli','cauliflower','spinach','kale','arugula',
  'lettuce','cabbage','napa cabbage','bok choy','zucchini','eggplant','mushroom','shiitake','portobello',
  'potato','sweet potato','beet','asparagus','green beans','peas','corn','edamame','avocado','cucumber',
  'lemon','lime','orange','apple','banana','mango','pineapple','strawberry','blueberry','coconut',
  'rice','basmati rice','jasmine rice','brown rice','arborio rice','pasta','spaghetti','penne',
  'fettuccine','linguine','lasagna','bread','breadcrumbs','panko','flour','all-purpose flour',
  'cornmeal','oats','quinoa','couscous','polenta','noodles','rice noodles','udon','soba',
  'chickpeas','black beans','kidney beans','cannellini beans','pinto beans','lentils','red lentils',
  'salt','black pepper','red pepper flakes','cayenne','paprika','smoked paprika','cumin','coriander',
  'turmeric','curry powder','garam masala','chili powder','oregano','thyme','rosemary','basil',
  'parsley','cilantro','dill','tarragon','sage','bay leaf','cinnamon','nutmeg','cardamom','star anise',
  'five spice','saffron','sumac','harissa',
  'olive oil','vegetable oil','sesame oil','coconut oil','soy sauce','fish sauce','oyster sauce',
  'hoisin sauce','worcestershire','hot sauce','sriracha','ketchup','mustard','dijon mustard',
  'mayonnaise','vinegar','apple cider vinegar','balsamic vinegar','rice vinegar','tomato paste',
  'tomato sauce','salsa','tahini',
  'vegetable broth','chicken broth','beef broth','white wine','red wine','sake','mirin',
  'sugar','brown sugar','honey','maple syrup','baking powder','baking soda','cocoa powder',
  'chocolate','vanilla extract','cornstarch',
  'almonds','walnuts','pine nuts','cashews','peanuts','sesame seeds','peanut butter','almond butter',
  'coconut milk','miso','nori','paneer','ghee','capers','olives','kimchi',
]

// ── 10 sample recipes ─────────────────────────────────────────────
export const MOCK_RECIPES: Recipe[] = [
  {
    id: 'mock-001', name: 'Spaghetti Aglio e Olio',
    description: 'A classic Roman pasta — simple, garlicky, and deeply satisfying.',
    cuisine: 'Italian', cookTimeMinutes: 20, timeEstimated: false, servings: 2,
    dietTags: ['vegetarian', 'vegan'],
    ingredients: [
      { name: 'spaghetti', quantity: '200', unit: 'g' },
      { name: 'garlic', quantity: '4', unit: 'cloves' },
      { name: 'olive oil', quantity: '4', unit: 'tbsp' },
      { name: 'red pepper flakes', quantity: '½', unit: 'tsp' },
      { name: 'parsley', quantity: '2', unit: 'tbsp' },
      { name: 'salt', quantity: null, unit: null },
    ],
    steps: [
      'Cook spaghetti in salted boiling water until al dente.',
      'Slice garlic thinly and sauté in olive oil over medium heat until golden.',
      'Add red pepper flakes and a ladleful of pasta water.',
      'Drain pasta and toss in garlic oil. Finish with parsley.',
    ],
    notes: 'Use good-quality olive oil — it makes all the difference.',
    imageUrl: null, sourceDataset: 'mock',
  },
  {
    id: 'mock-002', name: 'Chicken Tikka Masala',
    description: 'Tender chicken in a rich, creamy spiced tomato sauce.',
    cuisine: 'Indian', cookTimeMinutes: 45, timeEstimated: false, servings: 4,
    dietTags: [],
    ingredients: [
      { name: 'chicken breast', quantity: '500', unit: 'g' },
      { name: 'yogurt', quantity: '100', unit: 'ml' },
      { name: 'garlic', quantity: '3', unit: 'cloves' },
      { name: 'garam masala', quantity: '2', unit: 'tsp' },
      { name: 'cumin', quantity: '1', unit: 'tsp' },
      { name: 'turmeric', quantity: '½', unit: 'tsp' },
      { name: 'tomato sauce', quantity: '400', unit: 'ml' },
      { name: 'heavy cream', quantity: '100', unit: 'ml' },
      { name: 'onion', quantity: '1', unit: 'large' },
      { name: 'butter', quantity: '2', unit: 'tbsp' },
    ],
    steps: [
      'Marinate chicken in yogurt, garlic, and half the spices for 30 min.',
      'Grill or pan-fry chicken until charred. Set aside.',
      'Sauté onion in butter until golden. Add remaining spices.',
      'Add tomato sauce and simmer 15 min. Stir in cream.',
      'Add chicken and simmer 10 more minutes.',
    ],
    notes: null, imageUrl: null, sourceDataset: 'mock',
  },
  {
    id: 'mock-003', name: 'Classic Omelette',
    description: 'A quick, protein-packed breakfast or light meal.',
    cuisine: null, cookTimeMinutes: 10, timeEstimated: false, servings: 1,
    dietTags: ['vegetarian'],
    ingredients: [
      { name: 'eggs', quantity: '3', unit: null },
      { name: 'butter', quantity: '1', unit: 'tbsp' },
      { name: 'cheddar', quantity: '30', unit: 'g' },
      { name: 'salt', quantity: null, unit: null },
      { name: 'black pepper', quantity: null, unit: null },
    ],
    steps: [
      'Whisk eggs with salt and pepper.',
      'Melt butter in a non-stick pan over medium heat.',
      'Pour in eggs. Stir gently until just set.',
      'Add cheddar on one side, fold and serve.',
    ],
    notes: "Don't overcook — the inside should be creamy.",
    imageUrl: null, sourceDataset: 'mock',
  },
  {
    id: 'mock-004', name: 'Black Bean Tacos',
    description: 'Smoky, satisfying vegetarian tacos ready in 20 minutes.',
    cuisine: 'Mexican', cookTimeMinutes: 20, timeEstimated: false, servings: 2,
    dietTags: ['vegetarian', 'vegan'],
    ingredients: [
      { name: 'black beans', quantity: '400', unit: 'g' },
      { name: 'corn', quantity: '6', unit: 'tortillas' },
      { name: 'garlic', quantity: '2', unit: 'cloves' },
      { name: 'cumin', quantity: '1', unit: 'tsp' },
      { name: 'smoked paprika', quantity: '1', unit: 'tsp' },
      { name: 'lime', quantity: '1', unit: null },
      { name: 'cilantro', quantity: '2', unit: 'tbsp' },
      { name: 'avocado', quantity: '1', unit: null },
      { name: 'salsa', quantity: '4', unit: 'tbsp' },
    ],
    steps: [
      'Sauté garlic with cumin and smoked paprika for 1 min.',
      'Add drained black beans and cook until warmed through, mashing lightly.',
      'Warm tortillas. Fill with beans, sliced avocado, salsa, and cilantro.',
      'Finish with a squeeze of lime.',
    ],
    notes: null, imageUrl: null, sourceDataset: 'mock',
  },
  {
    id: 'mock-005', name: 'Miso Soup',
    description: 'Umami-rich Japanese soup — ready in 10 minutes.',
    cuisine: 'Japanese', cookTimeMinutes: 10, timeEstimated: false, servings: 2,
    dietTags: ['vegetarian'],
    ingredients: [
      { name: 'miso', quantity: '3', unit: 'tbsp' },
      { name: 'tofu', quantity: '150', unit: 'g' },
      { name: 'scallion', quantity: '2', unit: null },
      { name: 'nori', quantity: '1', unit: 'sheet' },
    ],
    steps: [
      'Bring 500ml water to a simmer (do not boil).',
      'Dissolve miso paste in a little hot water, then add to pot.',
      'Add cubed tofu and sliced scallion.',
      'Tear nori into pieces and add. Serve immediately.',
    ],
    notes: 'Never boil miso — it destroys the probiotic cultures.',
    imageUrl: null, sourceDataset: 'mock',
  },
  {
    id: 'mock-006', name: 'Avocado Toast',
    description: 'Creamy avocado on toasted bread with a kick of chili.',
    cuisine: null, cookTimeMinutes: 5, timeEstimated: false, servings: 1,
    dietTags: ['vegetarian', 'vegan'],
    ingredients: [
      { name: 'avocado', quantity: '1', unit: null },
      { name: 'bread', quantity: '2', unit: 'slices' },
      { name: 'lemon', quantity: '½', unit: null },
      { name: 'red pepper flakes', quantity: null, unit: null },
      { name: 'salt', quantity: null, unit: null },
    ],
    steps: [
      'Toast bread until golden.',
      'Mash avocado with lemon juice and salt.',
      'Spread on toast. Top with red pepper flakes.',
    ],
    notes: null, imageUrl: null, sourceDataset: 'mock',
  },
  {
    id: 'mock-007', name: 'Garlic Butter Shrimp',
    description: 'Quick buttery shrimp with garlic and lemon — great over rice or pasta.',
    cuisine: null, cookTimeMinutes: 15, timeEstimated: false, servings: 2,
    dietTags: [],
    ingredients: [
      { name: 'shrimp', quantity: '300', unit: 'g' },
      { name: 'butter', quantity: '3', unit: 'tbsp' },
      { name: 'garlic', quantity: '4', unit: 'cloves' },
      { name: 'lemon', quantity: '1', unit: null },
      { name: 'parsley', quantity: '2', unit: 'tbsp' },
      { name: 'red pepper flakes', quantity: '¼', unit: 'tsp' },
      { name: 'salt', quantity: null, unit: null },
    ],
    steps: [
      'Pat shrimp dry and season with salt.',
      'Melt butter in a skillet over medium-high heat.',
      'Add garlic and sauté 30 seconds. Add shrimp.',
      'Cook 2 min per side until pink. Add lemon juice and parsley.',
    ],
    notes: 'Serve immediately — shrimp overcooks quickly.',
    imageUrl: null, sourceDataset: 'mock',
  },
  {
    id: 'mock-008', name: 'Lentil Soup',
    description: 'Hearty, warming soup packed with protein and spices.',
    cuisine: 'Mediterranean', cookTimeMinutes: 40, timeEstimated: false, servings: 4,
    dietTags: ['vegetarian', 'vegan'],
    ingredients: [
      { name: 'red lentils', quantity: '200', unit: 'g' },
      { name: 'onion', quantity: '1', unit: null },
      { name: 'garlic', quantity: '3', unit: 'cloves' },
      { name: 'carrot', quantity: '2', unit: null },
      { name: 'cumin', quantity: '1', unit: 'tsp' },
      { name: 'turmeric', quantity: '½', unit: 'tsp' },
      { name: 'olive oil', quantity: '2', unit: 'tbsp' },
      { name: 'vegetable broth', quantity: '1', unit: 'litre' },
      { name: 'lemon', quantity: '1', unit: null },
    ],
    steps: [
      'Sauté onion and garlic in olive oil until soft.',
      'Add carrot, cumin, turmeric — cook 2 min.',
      'Add lentils and broth. Simmer 25–30 min.',
      'Blend partially for a creamy texture. Finish with lemon juice.',
    ],
    notes: null, imageUrl: null, sourceDataset: 'mock',
  },
  {
    id: 'mock-009', name: 'Fried Rice',
    description: 'Classic wok fried rice — best made with day-old rice.',
    cuisine: 'Chinese', cookTimeMinutes: 15, timeEstimated: false, servings: 2,
    dietTags: [],
    ingredients: [
      { name: 'rice', quantity: '300', unit: 'g' },
      { name: 'eggs', quantity: '2', unit: null },
      { name: 'soy sauce', quantity: '2', unit: 'tbsp' },
      { name: 'sesame oil', quantity: '1', unit: 'tsp' },
      { name: 'garlic', quantity: '2', unit: 'cloves' },
      { name: 'scallion', quantity: '3', unit: null },
      { name: 'vegetable oil', quantity: '2', unit: 'tbsp' },
      { name: 'peas', quantity: '50', unit: 'g' },
    ],
    steps: [
      'Heat wok until very hot. Add oil.',
      'Scramble eggs quickly. Push to the side.',
      'Add garlic, then cold rice. Stir-fry vigorously.',
      'Add peas, soy sauce, and sesame oil. Toss. Top with scallion.',
    ],
    notes: 'Use day-old chilled rice for the best texture.',
    imageUrl: null, sourceDataset: 'mock',
  },
  {
    id: 'mock-010', name: 'Greek Salad',
    description: 'A crisp, tangy salad with feta and olives.',
    cuisine: 'Greek', cookTimeMinutes: 10, timeEstimated: false, servings: 2,
    dietTags: ['vegetarian'],
    ingredients: [
      { name: 'tomato', quantity: '3', unit: null },
      { name: 'cucumber', quantity: '1', unit: null },
      { name: 'feta', quantity: '100', unit: 'g' },
      { name: 'olives', quantity: '50', unit: 'g' },
      { name: 'red onion', quantity: '½', unit: null },
      { name: 'olive oil', quantity: '3', unit: 'tbsp' },
      { name: 'oregano', quantity: '1', unit: 'tsp' },
      { name: 'lemon', quantity: '½', unit: null },
    ],
    steps: [
      'Chop tomatoes and cucumber into chunks.',
      'Slice red onion thinly.',
      'Combine all vegetables and olives in a bowl.',
      'Crumble feta on top. Drizzle olive oil, squeeze lemon, sprinkle oregano.',
    ],
    notes: null, imageUrl: null, sourceDataset: 'mock',
  },
]

// ── Scoring helpers ───────────────────────────────────────────────
function normalize(s: string) { return s.toLowerCase().trim() }

function computeScore(recipeIngs: string[], userIngs: string[]) {
  const userSet = userIngs.map(normalize)
  const matched: string[] = []
  const missing: string[] = []
  for (const ing of recipeIngs) {
    const n = normalize(ing)
    const hit = userSet.some((u) => n.includes(u) || u.includes(n))
    hit ? matched.push(ing) : missing.push(ing)
  }
  const score = recipeIngs.length === 0 ? 0 : matched.length / recipeIngs.length
  return { score, matched, missing }
}

function toBucket(missing: string[], score: number): Bucket {
  if (score === 1) return 'make-now'
  if (missing.length <= 2 && score >= 0.5) return 'missing-few'
  return 'missing-many'
}

// ── mockRecommend ─────────────────────────────────────────────────
// PHASE 1b TODO: Replace with fetch('/recommend', { method:'POST', body:JSON.stringify(request) })
export async function mockRecommend(request: RecommendRequest): Promise<RecommendResponse> {
  await new Promise((r) => setTimeout(r, 600)) // simulated latency

  const results: RecipeResult[] = MOCK_RECIPES
    .filter((r) => !request.diet || r.dietTags.includes(request.diet))
    .filter((r) => !request.cuisine || r.cuisine?.toLowerCase() === request.cuisine.toLowerCase())
    .filter((r) => !request.maxTime || r.cookTimeMinutes === null || r.cookTimeMinutes <= request.maxTime)
    .map((recipe): RecipeResult => {
      const names = recipe.ingredients.map((i) => i.name)
      const { score, matched, missing } = computeScore(names, request.ingredients)
      return {
        id: recipe.id, name: recipe.name,
        score: Math.round(score * 100) / 100,
        bucket: toBucket(missing, score),
        matched, missing,
        cuisine: recipe.cuisine,
        cookTimeMinutes: recipe.cookTimeMinutes,
        timeEstimated: recipe.timeEstimated,
        dietTags: recipe.dietTags,
        imageUrl: recipe.imageUrl,
      }
    })
    .sort((a, b) => b.score - a.score || a.missing.length - b.missing.length)

  return {
    results,
    totalFound: results.length,
    filtersApplied: {
      cuisine: request.cuisine ?? null,
      maxTime: request.maxTime ?? null,
      diet: request.diet ?? null,
    },
  }
}
