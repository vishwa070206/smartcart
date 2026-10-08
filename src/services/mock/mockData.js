export const MOCK_CATEGORIES = [
  { id: 'cat-1', name: 'Dairy & Eggs', slug: 'dairy-eggs', icon: 'Milk', count: 142, image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&q=80' },
  { id: 'cat-2', name: 'Fresh Produce', slug: 'fresh-produce', icon: 'Apple', count: 215, image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80' },
  { id: 'cat-3', name: 'Pantry & Staples', slug: 'pantry-staples', icon: 'Wheat', count: 310, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80' },
  { id: 'cat-4', name: 'Snacks & Drinks', slug: 'snacks-drinks', icon: 'Coffee', count: 189, image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=80' },
  { id: 'cat-5', name: 'Personal Care', slug: 'personal-care', icon: 'Sparkles', count: 165, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80' },
  { id: 'cat-6', name: 'Household', slug: 'household', icon: 'Home', count: 120, image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=400&q=80' },
  { id: 'cat-7', name: 'Bakery & Breakfast', slug: 'bakery-breakfast', icon: 'Croissant', count: 98, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80' },
  { id: 'cat-8', name: 'Frozen Foods', slug: 'frozen-foods', icon: 'Snowflake', count: 76, image: 'https://images.unsplash.com/photo-1548695607-9c73430ba065?w=400&q=80' }
];

export const MOCK_BRANDS = [
  { id: 'b-1', name: 'Amul', logo: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=120&q=80', productCount: 45 },
  { id: 'b-2', name: 'Fortune', logo: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=120&q=80', productCount: 28 },
  { id: 'b-3', name: 'Aashirvaad', logo: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=120&q=80', productCount: 19 },
  { id: 'b-4', name: 'Britannia', logo: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=120&q=80', productCount: 32 },
  { id: 'b-5', name: 'Nestlé', logo: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=120&q=80', productCount: 40 },
  { id: 'b-6', name: 'Tata Sampann', logo: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=120&q=80', productCount: 22 },
  { id: 'b-7', name: 'Surf Excel', logo: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=120&q=80', productCount: 14 }
];

export const MOCK_PRODUCTS = [
  {
    id: 'p-101',
    name: 'Amul Taaza Toned Milk (Pouch)',
    brand: 'Amul',
    category: 'Dairy & Eggs',
    categorySlug: 'dairy-eggs',
    variant: '1 L',
    price: 54,
    mrp: 58,
    discount: '7% OFF',
    rating: 4.8,
    reviewsCount: 1240,
    inStock: true,
    stockCount: 150,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=80',
    smartScore: 94,
    isTrending: true,
    isBestOffer: true,
    description: 'Amul Taaza Toned Milk is pasteurised milk with 3.0% Fat and 8.5% SNF. Fresh, nutrient-dense, and delicious daily essential.',
    specifications: { 'Fat Content': '3.0%', 'Shelf Life': '2 days', 'Packaging': 'Pouch', 'Storage': 'Refrigerated (4°C)' },
    nutrition: { 'Calories': '58 kcal/100ml', 'Protein': '3.1g', 'Carbs': '4.7g', 'Fat': '3.0g', 'Calcium': '120mg' },
    insights: [
      '✓ 7% cheaper than local retail benchmark',
      '✓ #1 Most Purchased Milk in your pin code',
      '✓ Delivered fresh within 4 hours of farm packaging',
      '✓ 98% customer satisfaction score'
    ],
    comparisonScoreBreakdown: { price: 96, rating: 95, satisfaction: 98, offer: 80, value: 94, availability: 100, nutrition: 90 },
    recommendationReason: 'Frequently bought by shoppers in your neighborhood.'
  },
  {
    id: 'p-102',
    name: 'Heritage Toned Fresh Milk',
    brand: 'Heritage',
    category: 'Dairy & Eggs',
    categorySlug: 'dairy-eggs',
    variant: '1 L',
    price: 56,
    mrp: 60,
    discount: '6% OFF',
    rating: 4.5,
    reviewsCount: 620,
    inStock: true,
    stockCount: 80,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80',
    smartScore: 88,
    isTrending: false,
    isBestOffer: false,
    description: 'Heritage Toned Milk offers balanced calcium and protein for active families.',
    specifications: { 'Fat Content': '3.0%', 'Shelf Life': '2 days', 'Packaging': 'Pouch' },
    nutrition: { 'Calories': '59 kcal/100ml', 'Protein': '3.0g', 'Carbs': '4.8g', 'Fat': '3.0g', 'Calcium': '118mg' },
    insights: [
      '✓ Premium dairy standard',
      '✓ Good availability'
    ],
    comparisonScoreBreakdown: { price: 90, rating: 88, satisfaction: 90, offer: 75, value: 89, availability: 95, nutrition: 89 },
    recommendationReason: 'Alternative to Amul Toned Milk.'
  },
  {
    id: 'p-103',
    name: 'Fortune Sunlite Refined Sunflower Oil',
    brand: 'Fortune',
    category: 'Pantry & Staples',
    categorySlug: 'pantry-staples',
    variant: '1 L Pouch',
    price: 132,
    mrp: 165,
    discount: '20% OFF',
    rating: 4.7,
    reviewsCount: 3890,
    inStock: true,
    stockCount: 220,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80',
    smartScore: 92,
    isTrending: true,
    isBestOffer: true,
    description: 'Fortune Sunlite Refined Sunflower Oil is light, healthy, and easy to digest with Vitamin E enrichment.',
    specifications: { 'Type': 'Refined Sunflower', 'Enrichment': 'Vitamin A & D, Vitamin E', 'Shelf Life': '9 months' },
    nutrition: { 'Energy': '900 kcal/100g', 'Saturated Fat': '12g', 'PUFA': '60g', 'Vitamin E': '35mg' },
    insights: [
      '✓ Save ₹33 per pouch (20% Savings)',
      '✓ Light on digestion with high smoke point',
      '✓ Ranked Best Value cooking oil this month'
    ],
    comparisonScoreBreakdown: { price: 95, rating: 92, satisfaction: 94, offer: 95, value: 93, availability: 100, nutrition: 88 },
    recommendationReason: 'Top re-ordered pantry staple.'
  },
  {
    id: 'p-104',
    name: 'Saffola Gold Multisource Edible Oil',
    brand: 'Saffola',
    category: 'Pantry & Staples',
    categorySlug: 'pantry-staples',
    variant: '1 L Pouch',
    price: 158,
    mrp: 185,
    discount: '14% OFF',
    rating: 4.8,
    reviewsCount: 2150,
    inStock: true,
    stockCount: 95,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80',
    smartScore: 90,
    isTrending: false,
    isBestOffer: false,
    description: 'Saffola Gold gives you the benefits of 2 oils in 1 with Oryzanol for triple heart health benefits.',
    specifications: { 'Blend': '70% Rice Bran + 30% Sunflower Oil', 'Shelf Life': '12 months' },
    nutrition: { 'Energy': '900 kcal/100g', 'Oryzanol': '10000 ppm', 'Vitamin E': '25mg' },
    insights: [
      '✓ Advanced heart care formula',
      '✓ High Antioxidant Blend'
    ],
    comparisonScoreBreakdown: { price: 82, rating: 96, satisfaction: 96, offer: 80, value: 87, availability: 90, nutrition: 96 },
    recommendationReason: 'Recommended for health-conscious cooking.'
  },
  {
    id: 'p-105',
    name: 'Aashirvaad Shuddh Chakki Whole Wheat Atta',
    brand: 'Aashirvaad',
    category: 'Pantry & Staples',
    categorySlug: 'pantry-staples',
    variant: '5 kg',
    price: 245,
    mrp: 290,
    discount: '15% OFF',
    rating: 4.9,
    reviewsCount: 5410,
    inStock: true,
    stockCount: 310,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80',
    smartScore: 96,
    isTrending: true,
    isBestOffer: false,
    description: '100% pure whole wheat grain flour processed with 4-step advantage for softest rotis.',
    specifications: { 'Ingredient': '100% Whole Wheat', 'Process': 'Chakki Ground', 'Shelf Life': '3 months' },
    nutrition: { 'Energy': '364 kcal/100g', 'Dietary Fiber': '11.5g', 'Protein': '12g', 'Carbs': '74g' },
    insights: [
      '✓ Highest rated Atta product across 10,000+ reviews',
      '✓ 0% Maida content guaranteed',
      '✓ Soft rotis guaranteed for 12 hours'
    ],
    comparisonScoreBreakdown: { price: 90, rating: 99, satisfaction: 98, offer: 85, value: 95, availability: 100, nutrition: 96 },
    recommendationReason: 'Matches your regular purchasing frequency.'
  },
  {
    id: 'p-106',
    name: 'Fortune Chakki Fresh Whole Wheat Atta',
    brand: 'Fortune',
    category: 'Pantry & Staples',
    categorySlug: 'pantry-staples',
    variant: '5 kg',
    price: 210,
    mrp: 260,
    discount: '19% OFF',
    rating: 4.6,
    reviewsCount: 1840,
    inStock: true,
    stockCount: 140,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
    smartScore: 91,
    isTrending: false,
    isBestOffer: true,
    description: 'Fortune Chakki Fresh Atta is made from superior MP wheat grains ensuring fluffy rotis.',
    specifications: { 'Ingredient': 'MP Wheat Grains', 'Shelf Life': '3 months' },
    nutrition: { 'Energy': '360 kcal/100g', 'Dietary Fiber': '10.8g', 'Protein': '11.5g' },
    insights: [
      '✓ Save ₹35 compared to premium brands',
      '✓ Excellent value per kg'
    ],
    comparisonScoreBreakdown: { price: 97, rating: 90, satisfaction: 89, offer: 92, value: 94, availability: 95, nutrition: 90 },
    recommendationReason: 'Budget smart alternative to Aashirvaad Atta.'
  },
  {
    id: 'p-107',
    name: 'Organic Fresh Alphonso Mangoes',
    brand: 'Farm Fresh',
    category: 'Fresh Produce',
    categorySlug: 'fresh-produce',
    variant: '1 kg (Approx 4 pcs)',
    price: 380,
    mrp: 450,
    discount: '15% OFF',
    rating: 4.6,
    reviewsCount: 420,
    inStock: true,
    stockCount: 45,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80',
    smartScore: 89,
    isTrending: true,
    isBestOffer: false,
    description: 'Naturally ripened, chemical-free GI tagged Ratnagiri Alphonso Mangoes.',
    specifications: { 'Origin': 'Ratnagiri', 'Ripening': 'Carbide Free', 'Grade': 'A Premium' },
    nutrition: { 'Calories': '60 kcal/100g', 'Vitamin C': '60%', 'Vitamin A': '25%' },
    insights: [
      '✓ 100% Naturally Ripened without Carbide',
      '✓ Directly sourced from certified Maharashtra orchards'
    ],
    comparisonScoreBreakdown: { price: 80, rating: 92, satisfaction: 94, offer: 80, value: 85, availability: 80, nutrition: 95 },
    recommendationReason: 'Seasonal farm-fresh highlight.'
  },
  {
    id: 'p-108',
    name: 'Britannia Good Day Cashew Cookies Pack',
    brand: 'Britannia',
    category: 'Snacks & Drinks',
    categorySlug: 'snacks-drinks',
    variant: '600g Family Pack',
    price: 110,
    mrp: 140,
    discount: '21% OFF',
    rating: 4.7,
    reviewsCount: 2900,
    inStock: true,
    stockCount: 180,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80',
    smartScore: 93,
    isTrending: true,
    isBestOffer: true,
    description: 'Rich crunchy butter cookies loaded with real premium cashew nuts.',
    specifications: { 'Type': 'Cashew Butter Cookies', 'Pack': 'Family Pack', 'Shelf Life': '6 months' },
    nutrition: { 'Energy': '495 kcal/100g', 'Carbs': '65g', 'Fat': '23g' },
    insights: [
      '✓ Save ₹30 with this family multi-pack',
      '✓ #1 Tea-time companion cookie'
    ],
    comparisonScoreBreakdown: { price: 94, rating: 94, satisfaction: 95, offer: 95, value: 94, availability: 100, nutrition: 75 },
    recommendationReason: 'Popular snack choice for evening tea.'
  },
  {
    id: 'p-109',
    name: 'Surf Excel Easy Wash Liquid Detergent',
    brand: 'Surf Excel',
    category: 'Household',
    categorySlug: 'household',
    variant: '1 L Bottle',
    price: 215,
    mrp: 245,
    discount: '12% OFF',
    rating: 4.8,
    reviewsCount: 1720,
    inStock: true,
    stockCount: 65,
    image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=600&q=80',
    smartScore: 91,
    isTrending: false,
    isBestOffer: false,
    description: 'Dissolves 100% in water quickly to remove tough stains without damaging fabric fibers.',
    specifications: { 'Type': 'Liquid Fabric Wash', 'Compatibility': 'Top & Front Load', 'Shelf Life': '24 months' },
    nutrition: {},
    insights: [
      '✓ 1 cap equals 1 full scoop of detergent powder efficiency',
      '✓ Leaves fabric soft with long-lasting freshness'
    ],
    comparisonScoreBreakdown: { price: 88, rating: 95, satisfaction: 96, offer: 80, value: 90, availability: 95, nutrition: 0 },
    recommendationReason: 'Essential laundry care recommendation.'
  },
  {
    id: 'p-110',
    name: 'Tata Sampann Unpolished Arhar Dal (Toor Dal)',
    brand: 'Tata Sampann',
    category: 'Pantry & Staples',
    categorySlug: 'pantry-staples',
    variant: '1 kg',
    price: 168,
    mrp: 195,
    discount: '14% OFF',
    rating: 4.8,
    reviewsCount: 2310,
    inStock: true,
    stockCount: 190,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80',
    smartScore: 95,
    isTrending: true,
    isBestOffer: false,
    description: 'Rich in natural protein, unpolished without oil or water polish for authentic taste.',
    specifications: { 'Purity': '100% Unpolished', 'Origin': 'Latur Maharashtra', 'Protein': 'High Natural' },
    nutrition: { 'Protein': '22g/100g', 'Energy': '343 kcal', 'Fiber': '15g' },
    insights: [
      '✓ Unpolished natural pulse preserves full dietary fiber & protein',
      '✓ Rigorous 5-step quality screening'
    ],
    comparisonScoreBreakdown: { price: 92, rating: 97, satisfaction: 97, offer: 82, value: 94, availability: 98, nutrition: 98 },
    recommendationReason: 'High protein healthy staple recommendation.'
  }
];

export const MOCK_OFFERS = [
  { id: 'off-1', code: 'SMART200', title: 'Supermarket Super Saver', description: 'Get ₹200 OFF on orders above ₹1,499 across Pantry & Dairy', discountText: '₹200 OFF', validTill: '2026-10-31', bgGradient: 'from-pink-500 to-rose-600' },
  { id: 'off-2', code: 'FRESH15', title: 'Farm Fresh Wednesdays', description: 'Flat 15% Cashback on Fresh Produce & Fruits', discountText: '15% CASHBACK', validTill: '2026-10-15', bgGradient: 'from-emerald-500 to-teal-600' },
  { id: 'off-3', code: 'SMARTCART50', title: 'Smart Cart Special', description: 'Save extra ₹50 when you accept smart alternative suggestions', discountText: '₹50 BONUS', validTill: '2026-11-15', bgGradient: 'from-purple-600 to-indigo-700' }
];

export const MOCK_COMPARISON_MATRIX = {
  'milk-group': {
    title: 'Toned Milk Comparison',
    products: ['p-101', 'p-102'],
    winnerId: 'p-101',
    winnerReason: 'Amul Taaza offers lower price per liter, higher review satisfaction (4.8★), and guaranteed daily morning supply.',
    metrics: [
      { name: 'Unit Price', winner: 'p-101', valA: '₹54/L', valB: '₹56/L' },
      { name: 'Rating & Trust', winner: 'p-101', valA: '4.8 ★ (1,240)', valB: '4.5 ★ (620)' },
      { name: 'Fat Content', winner: 'Equal', valA: '3.0%', valB: '3.0%' },
      { name: 'Local Availability', winner: 'p-101', valA: 'High (150 in stock)', valB: 'Moderate (80 in stock)' },
      { name: 'Discount', winner: 'p-101', valA: '7% OFF', valB: '6% OFF' }
    ]
  },
  'atta-group': {
    title: 'Whole Wheat Atta 5kg Comparison',
    products: ['p-105', 'p-106'],
    winnerId: 'p-105',
    winnerReason: 'Aashirvaad Shuddh Chakki Atta wins Best Overall due to superior roti softness ratings and 100% whole wheat guarantee.',
    cheapestId: 'p-106',
    cheapestReason: 'Fortune Chakki Atta wins Best Value saving ₹35 per 5kg pack.',
    metrics: [
      { name: 'Selling Price', winner: 'p-106', valA: '₹245', valB: '₹210' },
      { name: 'Discount', winner: 'p-106', valA: '15% OFF', valB: '19% OFF' },
      { name: 'Customer Satisfaction', winner: 'p-105', valA: '98% (5.4k reviews)', valB: '89% (1.8k reviews)' },
      { name: 'Fiber Content', winner: 'p-105', valA: '11.5g / 100g', valB: '10.8g / 100g' }
    ]
  }
};

export const MOCK_ORDERS = [
  {
    id: 'ORD-98214',
    date: '2026-10-06T11:20:00Z',
    status: 'Delivered',
    paymentStatus: 'Paid (UPI)',
    total: 845,
    itemsCount: 4,
    deliveryAddress: 'Flat 402, Green Glen Layout, Bellandur, Bengaluru - 560103',
    items: [
      { id: 'p-101', name: 'Amul Taaza Toned Milk (Pouch)', variant: '1 L', price: 54, qty: 2 },
      { id: 'p-103', name: 'Fortune Sunlite Refined Sunflower Oil', variant: '1 L Pouch', price: 132, qty: 1 },
      { id: 'p-105', name: 'Aashirvaad Shuddh Chakki Whole Wheat Atta', variant: '5 kg', price: 245, qty: 1 },
      { id: 'p-108', name: 'Britannia Good Day Cashew Cookies Pack', variant: '600g', price: 110, qty: 2 }
    ],
    timeline: [
      { status: 'Order Placed', time: 'Oct 6, 11:20 AM', done: true },
      { status: 'Packed by Supermarket', time: 'Oct 6, 11:45 AM', done: true },
      { status: 'Out for Delivery', time: 'Oct 6, 12:10 PM', done: true },
      { status: 'Delivered', time: 'Oct 6, 12:35 PM', done: true }
    ]
  },
  {
    id: 'ORD-97810',
    date: '2026-09-28T16:45:00Z',
    status: 'Delivered',
    paymentStatus: 'Paid (Credit Card)',
    total: 1240,
    itemsCount: 5,
    deliveryAddress: 'Flat 402, Green Glen Layout, Bellandur, Bengaluru - 560103',
    items: [
      { id: 'p-105', name: 'Aashirvaad Shuddh Chakki Whole Wheat Atta', variant: '5 kg', price: 245, qty: 1 },
      { id: 'p-109', name: 'Surf Excel Easy Wash Liquid Detergent', variant: '1 L Bottle', price: 215, qty: 2 },
      { id: 'p-110', name: 'Tata Sampann Unpolished Arhar Dal', variant: '1 kg', price: 168, qty: 2 }
    ],
    timeline: [
      { status: 'Order Placed', time: 'Sep 28, 04:45 PM', done: true },
      { status: 'Delivered', time: 'Sep 28, 06:15 PM', done: true }
    ]
  }
];

export const MOCK_SMART_CART_SESSION = {
  cartId: 'SC-8842',
  storeName: 'SmartMart Supermarket - HSR Layout Branch',
  customerName: 'Vishwanathan G',
  batteryLevel: 88,
  status: 'Active',
  budgetLimit: 1500,
  currentTotal: 1245,
  items: [
    { id: 'p-101', name: 'Amul Taaza Toned Milk (Pouch)', price: 54, qty: 2, weight: '2.0 kg' },
    { id: 'p-103', name: 'Fortune Sunlite Refined Sunflower Oil', price: 132, qty: 2, weight: '1.9 kg' },
    { id: 'p-105', name: 'Aashirvaad Shuddh Chakki Atta', price: 245, qty: 1, weight: '5.0 kg' },
    { id: 'p-108', name: 'Britannia Good Day Cashew Cookies', price: 110, qty: 3, weight: '1.8 kg' },
    { id: 'p-110', name: 'Tata Sampann Unpolished Arhar Dal', price: 168, qty: 2, weight: '2.0 kg' }
  ],
  activeSuggestion: {
    scannedProduct: { id: 'p-104', name: 'Saffola Gold Multisource Oil', price: 158, rating: 4.8 },
    betterAlternative: { id: 'p-103', name: 'Fortune Sunlite Sunflower Oil', price: 132, rating: 4.7, similarity: 94 },
    savingsAmount: 26,
    reason: 'Better Value & 20% discount offer active'
  }
};

export const MOCK_ADMIN_ANALYTICS = {
  summary: {
    totalRevenue: 2489000,
    revenueGrowth: '+14.2%',
    totalOrders: 14250,
    ordersGrowth: '+8.5%',
    activeCustomers: 9840,
    activeSmartCarts: 42,
    avgOrderValue: 840,
    recommendationConversion: '24.8%'
  },
  salesOverTime: [
    { date: 'Mon', revenue: 320000, orders: 1800 },
    { date: 'Tue', revenue: 290000, orders: 1650 },
    { date: 'Wed', revenue: 410000, orders: 2300 },
    { date: 'Thu', revenue: 380000, orders: 2100 },
    { date: 'Fri', revenue: 520000, orders: 2900 },
    { date: 'Sat', revenue: 680000, orders: 3800 },
    { date: 'Sun', revenue: 640000, orders: 3600 }
  ],
  categoryShare: [
    { name: 'Pantry & Staples', value: 38, color: '#FF3F6C' },
    { name: 'Dairy & Eggs', value: 24, color: '#6D214F' },
    { name: 'Snacks & Drinks', value: 18, color: '#FF6B6B' },
    { name: 'Fresh Produce', value: 12, color: '#00897B' },
    { name: 'Household', value: 8, color: '#F5A623' }
  ],
  topComparedPairs: [
    { pair: 'Amul Toned Milk vs Heritage Milk', count: 1420, winner: 'Amul Toned Milk (78%)' },
    { pair: 'Aashirvaad Atta vs Fortune Atta', count: 1180, winner: 'Aashirvaad Atta (62%)' },
    { pair: 'Fortune Oil vs Saffola Gold Oil', count: 940, winner: 'Fortune Oil (71%)' }
  ],
  recommendationStats: [
    { type: 'Frequently Bought Together', impressions: 45000, clicks: 14200, ctr: '31.5%', conversions: 3890 },
    { type: 'Budget Smart Alternatives', impressions: 28000, clicks: 11400, ctr: '40.7%', conversions: 4820 },
    { type: 'Similar Search Recommendations', impressions: 38000, clicks: 8900, ctr: '23.4%', conversions: 2100 }
  ],
  smartCartMonitoring: [
    { cartId: 'SC-8842', store: 'HSR Layout', status: 'Active', battery: 88, customer: 'Vishwanathan G', itemQty: 10, total: 1245, lastSeen: 'Just now' },
    { cartId: 'SC-8843', store: 'Indiranagar', status: 'Active', battery: 94, customer: 'Priya Sharma', itemQty: 6, total: 720, lastSeen: '1 min ago' },
    { cartId: 'SC-8844', store: 'Koramangala', status: 'Idle', battery: 45, customer: 'Rahul Verma', itemQty: 2, total: 185, lastSeen: '4 mins ago' },
    { cartId: 'SC-8845', store: 'Bellandur', status: 'Checkout', battery: 72, customer: 'Ananya Roy', itemQty: 14, total: 2140, lastSeen: 'Just now' },
    { cartId: 'SC-8846', store: 'HSR Layout', status: 'Offline', battery: 12, customer: 'None', itemQty: 0, total: 0, lastSeen: '45 mins ago' }
  ],
  auditLogs: [
    { id: 'log-1', timestamp: '2026-10-08 13:42', user: 'Admin (admin@smartmart.com)', action: 'UPDATE_PRODUCT_PRICE', details: 'Updated Fortune Sunflower Oil MRP from 170 to 165' },
    { id: 'log-2', timestamp: '2026-10-08 12:15', user: 'Inventory Mgr (mgr@smartmart.com)', action: 'STOCK_RESTOCK', details: 'Added 200 units to Amul Taaza Toned Milk (HSR Branch)' },
    { id: 'log-3', timestamp: '2026-10-08 10:30', user: 'Admin (admin@smartmart.com)', action: 'CREATE_OFFER', details: 'Created promo offer SMART200 (₹200 OFF)' }
  ]
};
