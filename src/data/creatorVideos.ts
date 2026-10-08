/**
 * Creator reels for the "They're talking about OURA" section on the home page.
 *
 * `src` is a short 540p preview clip in /public/igVideos/preview (the first 12s of
 * each reel, ~1.5 MB) so cards start playing fast on phones. Clicking a card opens `reelUrl`
 * on Instagram. `handle` (without the @) and `caption` are optional.
 */
export type CreatorVideo = {
  src: string;
  reelUrl: string;
  handle?: string;
  caption?: string;
};

export const CREATOR_VIDEOS: CreatorVideo[] = [
  { src: '/igVideos/preview/oura_ig_2.mp4', reelUrl: 'https://www.instagram.com/p/DdoUH54hdlK' },
  { src: '/igVideos/preview/oura_ig_4.mp4', reelUrl: 'https://www.instagram.com/p/DdgvHaGtcct' },
  { src: '/igVideos/preview/oura_ig_5.mp4', reelUrl: 'https://www.instagram.com/p/DdyX-MuJGDD' },
  { src: '/igVideos/preview/oura_ig_6.mp4', reelUrl: 'https://www.instagram.com/p/Dc01VSLS7AS' },
  { src: '/igVideos/preview/oura_ig_8.mp4', reelUrl: 'https://www.instagram.com/p/Dd3xq1KPxnx' },
];
