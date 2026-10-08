import type { Review } from "./reviews";

/**
 * Verified Oura Culinary reviews, shown only on the Culinary product page -
 * the home page Testimonials wall reads `REVIEWS` in data/reviews.ts, not these.
 *
 * Source: "OURA Coconut - Customer Reviews & Testimonials Collection" (36 reviews).
 */

export const CULINARY_REVIEWS: Review[] = [
  /* ---- Part 1: Hair, skin & personal wellness ---- */

  // Bengaluru, Karnataka
  {
    name: "Sneha Ramachandran",
    city: "Koramangala, Bengaluru",
    text: "The hard water in Bangalore was destroying my hair, leading to massive hair fall. A friend suggested using OURA Culinary since it's pure cold-pressed. My hair fall has reduced drastically in just a month!",
    initials: "SR",
  },
  {
    name: "Arjun Menath",
    city: "Whitefield, Bengaluru",
    text: "I've always been skeptical of using culinary oils for skincare, but OURA is a game changer. It absorbs so quickly and keeps my skin hydrated all day in this dry IT city weather.",
    initials: "AM",
  },
  {
    name: "Divya Krishnan",
    city: "Indiranagar, Bengaluru",
    text: "Finally found a coconut oil that doesn't smell artificial. I use it as a pre-wash hair mask every weekend. It leaves my hair incredibly soft despite the Bangalore water.",
    initials: "DK",
  },
  {
    name: "Pooja Sharma",
    city: "Jayanagar, Bengaluru",
    text: "I buy the OURA cold-pressed oil primarily for my baby's massage. It's so pure and gentle on her skin. I even started using it as my daily moisturizer!",
    initials: "PS",
  },

  // Delhi NCR
  {
    name: "Rohan Tyagi",
    city: "Gurgaon, Delhi NCR",
    text: "Delhi winters are brutal on my skin. Lotions just don't work. I switched to OURA cold-pressed oil right after my shower, and my skin hasn't flaked once this season.",
    initials: "RT",
  },
  {
    name: "Kritika Varma",
    city: "South Extension, New Delhi",
    text: "The pollution in Delhi makes my hair so frizzy and brittle. A hot oil massage with OURA Culinary twice a week has brought the shine back. Highly recommend it!",
    initials: "KV",
  },
  {
    name: "Megha Deshmukh",
    city: "Noida, Delhi NCR",
    text: "I use OURA as a natural makeup remover. It melts waterproof mascara instantly without stinging my eyes, and leaves my skin glowing. Pure magic from Kerala!",
    initials: "MD",
  },
  {
    name: "Aditya Nambiar",
    city: "Vasant Kunj, New Delhi",
    text: "I bought OURA Culinary for my kitchen but ended up using it for my winter skincare routine. It's unrefined, rich, and exactly what my dry skin needed.",
    initials: "AN",
  },

  // Mumbai, Maharashtra
  {
    name: "Neha Parulkar",
    city: "Andheri, Mumbai",
    text: "Mumbai humidity makes most hair oils feel heavy and sticky. OURA is surprisingly light. I apply a few drops as a serum after washing, and it controls frizz perfectly.",
    initials: "NP",
  },
  {
    name: "Sameer Kulkarni",
    city: "Dadar, Mumbai",
    text: "I commute daily by local train, which ruins my skin. Applying OURA coconut oil at night has cleared up my dry patches and brought a natural glow to my face.",
    initials: "SK",
  },
  {
    name: "Anjali Shetty",
    city: "Bandra, Mumbai",
    text: "I've tried many organic brands, but the purity of OURA cold-pressed oil is unmatched. I use it for oil pulling every morning and my gum health has never been better.",
    initials: "AS",
  },
  {
    name: "Riya Merchant",
    city: "Powai, Mumbai",
    text: "A multi-purpose gem! I use OURA Culinary oil as a deep conditioner. It washes out easily and doesn't weigh my hair down despite the sticky coastal weather.",
    initials: "RM",
  },

  // Pune, Maharashtra
  {
    name: "Karan Joshi",
    city: "Koregaon Park, Pune",
    text: "The shifting weather in Pune always triggers my dry scalp. Massaging OURA cold-pressed oil before a wash has completely cured my dandruff. It smells so fresh!",
    initials: "KJ",
  },
  {
    name: "Shruti Bhonsle",
    city: "Viman Nagar, Pune",
    text: "I love that OURA is zero-waste and sustainably packaged. But more importantly, it has transformed my skincare routine. It's my go-to body oil.",
    initials: "SB",
  },
  {
    name: "Vikram Salunkhe",
    city: "Baner, Pune",
    text: "I use OURA Culinary for my beard grooming. It softens the beard, moisturizes the skin underneath, and smells amazing without being overpowering.",
    initials: "VS",
  },
  {
    name: "Aditi Dandekar",
    city: "Kothrud, Pune",
    text: "My grandmother used to make pure coconut oil at home, and OURA is the closest I've found to that quality. It keeps my hair thick and black.",
    initials: "AD",
  },

  // Hyderabad, Telangana
  {
    name: "Swathi Reddy",
    city: "Jubilee Hills, Hyderabad",
    text: "The water in Hyderabad is quite harsh. Regular oiling with OURA Culinary has protected my hair from thinning. The cold-pressed purity really makes a difference.",
    initials: "SR",
  },
  {
    name: "Tariq Ahmed",
    city: "Banjara Hills, Hyderabad",
    text: "I mix OURA coconut oil with brown sugar for a homemade body scrub. It leaves my skin so smooth and radiant. It's a permanent fixture on my bathroom shelf now.",
    initials: "TA",
  },
  {
    name: "Deepthi Kothapalli",
    city: "HITEC City, Hyderabad",
    text: "My hair used to be dry and unmanageable. Since I started using OURA, my curls are defined and bouncy. Best investment for curly hair!",
    initials: "DK",
  },
  {
    name: "Kiran Verma",
    city: "Madhapur, Hyderabad",
    text: "It's hard to find authentic Kerala coconut oil here in Hyderabad. OURA is so pure that I use it for my toddler's eczema. It soothes his skin almost instantly.",
    initials: "KV",
  },

  /* ---- Part 2: Authentic cooking & culinary excellence ---- */

  // Kerala Heartland
  {
    name: "Lakshmi Nambiar",
    city: "Kannur, Kerala",
    text: "Being from Kannur, I am very particular about coconut oil in my kitchen. OURA's oil has that perfect, nostalgic aroma of roasted copra. Meen curry tastes divine with this!",
    initials: "LN",
  },
  {
    name: "Rajesh Menath",
    city: "Kochi, Kerala",
    text: "OURA Culinary is exactly what we call 'Velichenna' in its truest form. I use it daily for tempering my dishes. The quality and thickness of the oil are phenomenal.",
    initials: "RM",
  },
  {
    name: "Aswathi Pillai",
    city: "Kozhikode, Kerala",
    text: "I've stopped buying refined oils entirely. Frying banana chips in OURA cold-pressed oil brings back the authentic taste of my childhood. Excellent product.",
    initials: "AP",
  },
  {
    name: "Gopi Kurup",
    city: "Palakkad, Kerala",
    text: "You can tell it's purely cold-pressed from the way it solidifies cleanly. It adds a rich, sweet aroma to our traditional payasam. Highly recommended for every Kerala kitchen.",
    initials: "GK",
  },
  {
    name: "Sujatha Varma",
    city: "Thiruvananthapuram, Kerala",
    text: "From Aviyal to simple Thoran, OURA elevates the flavor of everything. It's so relieving to finally find a brand that doesn't compromise on traditional extraction methods.",
    initials: "SV",
  },
  {
    name: "Nithin Sukumaran",
    city: "Thrissur, Kerala",
    text: "I ordered this to support local Kerala farmers and was blown away by the quality. The aroma alone when you open the bottle proves its purity.",
    initials: "NS",
  },

  // Chennai, Tamil Nadu
  {
    name: "Kavitha Ramaswamy",
    city: "Mylapore, Chennai",
    text: "I recently transitioned my family to cold-pressed oils. OURA Culinary is perfect for our daily cooking. The cabbage poriyal tastes so much better now!",
    initials: "KR",
  },
  {
    name: "Venkatesh Sundaram",
    city: "Adyar, Chennai",
    text: "Authentic smell and great packaging. I use OURA coconut oil to temper my chutneys and sambar. It gives that rich, traditional South Indian touch.",
    initials: "VS",
  },
  {
    name: "Priya Thirumurugan",
    city: "T. Nagar, Chennai",
    text: "It is very hard to find unadulterated coconut oil in city supermarkets. I order OURA online and delivery is seamless. The taste it brings to my aviyal is unmatched.",
    initials: "PT",
  },
  {
    name: "Anita Murugan",
    city: "Anna Nagar, Chennai",
    text: "I use OURA for making traditional sweets during festivals. The aroma is so pure and strong, you end up using less oil than usual. Very cost-effective and healthy.",
    initials: "AM",
  },
  {
    name: "Ramesh Krishnan",
    city: "Velachery, Chennai",
    text: "A fantastic alternative to refined oils. We use OURA for shallow frying and it doesn't smoke heavily. It has made our everyday meals much healthier.",
    initials: "RK",
  },
  {
    name: "Deepa Venkat",
    city: "OMR, Chennai",
    text: "My mother-in-law is very strict about cooking oil. She tasted the podi mixed with OURA coconut oil and immediately asked me to order two more bottles!",
    initials: "DV",
  },

  // Malayali diaspora across India
  {
    name: "Mathew Joseph",
    city: "Chandigarh",
    text: "Living in North India, I miss authentic Kerala food. OURA Culinary brings that taste of home right to my kitchen in Chandigarh. My Sunday beef roast is incomplete without it.",
    initials: "MJ",
  },
  {
    name: "Anu Chandran",
    city: "Ahmedabad, Gujarat",
    text: "As a Malayali settled in Gujarat, finding real cold-pressed coconut oil was a struggle. OURA is a lifesaver. My Puttu and Kadala curry finally taste like my Amma's cooking.",
    initials: "AC",
  },
  {
    name: "Jacob Varghese",
    city: "Kolkata, West Bengal",
    text: "The aroma takes me straight back to my grandmother's house in Alleppey. I use OURA for my daily cooking in Kolkata. Quality remains consistent bottle after bottle.",
    initials: "JV",
  },
  {
    name: "Sneha Parameswaran",
    city: "Jaipur, Rajasthan",
    text: "I travel constantly for work and carry a small bottle of OURA everywhere. Whether it's for an impromptu skin moisturizer in dry hotels or to drizzle over food, it's my slice of home.",
    initials: "SP",
  },
];
