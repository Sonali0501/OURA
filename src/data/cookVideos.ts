/**
 * Recipe reels for the "Cook with OURA" section on the home page.
 *
 * TODO: all of this is placeholder content - the videos reuse the creator reel
 * previews, and the handles, titles, descriptions and links are dummies. Swap in
 * the real recipe reels when they're ready.
 */
export type CookVideo = {
  src: string;
  reelUrl: string;
  handle: string;
  title: string;
  subtitle: string;
};

export const COOK_VIDEOS: CookVideo[] = [
  {
    src: '/cookingVideos/preview/oura_cook_1.mp4',
    reelUrl: 'https://www.instagram.com/p/DdbhE0Kyvli',
    handle: 'laaaa.miiyaa',
    title: 'Malai Chicken Ft. OURA 🥥',
    subtitle: 'What makes a chicken dish taste like home to you? For me, it’s that beautiful touch of coconut — and this Malai Chicken made with OURA Cold-Pressed Coconut Oil had just that. 🥥✨ A little richness, a lot of flavour, and a taste that takes me straight back to Kerala. From Kochi to Thrissur — a Promise of Pure Heritage.🤍',
  },
  {
    src: '/cookingVideos/preview/oura_cook_3.mp4',
    reelUrl: 'https://www.instagram.com/p/DclbQVRv0Uk',
    handle: 'kochuthresiaa__',
    title: 'വീട്ടിലെ ഊണ് 🤤 Kerala style sea food cooked in “OURA” coconut oil',
    subtitle: '@indiaoura Nourishing life, one mindful choice at a time. 🥥🌿 From pregnancy to everyday wellness, nutrition matters and so does choosing what goes into every meal. With the goodness of coconut cooking oil, OURA Culinary brings together health, nourishment and the wisdom of tradition. A promise of pure heritage.',
  },
  {
    src: '/cookingVideos/preview/oura_cook_4.mp4',
    reelUrl: 'https://www.instagram.com/p/Dcdg_Kly2K6/',
    handle: '_manav_krish',
    title: 'A Promise Of Pure Heritage - OURA CULINARY',
    subtitle: 'A taste of Onam, rooted in Pure Heritage. 🥥✨ This Onam, bringing the flavours of a traditional Kerala Aviyal to life with OURA Culinary Pure Coconut Oil — inspired by the heritage of Kochi and made for every kitchen.',
  },
  {
    src: '/cookingVideos/preview/oura_cook_5.mp4',
    reelUrl: 'https://www.instagram.com/p/DeEcLHCTLRF/',
    handle: 'bites_of_health_',
    title: 'Straight from the heart of Kerala authentic OURA Coconut Oil',
    subtitle: '30g Protein in Vrat Meal Bowl✨ And get 10% off with the code- ANKITA10 Straight from the heart of Kerala authentic OURA Coconut Oil has arrived in Hyderabad 🥥 ✨Made from pure, fresh coconuts, it adds a rich, traditional aroma and next level flavour to every dish.',
  },
];
