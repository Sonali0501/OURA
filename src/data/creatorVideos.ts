/**
 * Creator reels for the "They're talking about OURA" section on the home page.
 *
 * `src` is a vertical MP4 in /public/igVideos. Clicking a card opens `reelUrl`
 * on Instagram. `handle` (without the @) and `caption` are optional.
 */
export type CreatorVideo = {
  src: string;
  reelUrl: string;
  handle?: string;
  caption?: string;
};

export const CREATOR_VIDEOS: CreatorVideo[] = [
  { src: '/igVideos/oura_ig_1.mp4', reelUrl: 'https://www.instagram.com/p/DdbhE0Kyvli' },
  { src: '/igVideos/oura_ig_2.mp4', reelUrl: 'https://www.instagram.com/p/DdoUH54hdlK' },
  { src: '/igVideos/oura_ig_3.mp4', reelUrl: 'https://www.instagram.com/p/DclbQVRv0Uk' },
  { src: '/igVideos/oura_ig_4.mp4', reelUrl: 'https://www.instagram.com/p/DdgvHaGtcct' },
  { src: '/igVideos/oura_ig_5.mp4', reelUrl: 'https://www.instagram.com/p/DdyX-MuJGDD' },
  { src: '/igVideos/oura_ig_6.mp4', reelUrl: 'https://www.instagram.com/p/Dc01VSLS7AS' },
  // { src: '/igVideos/oura_ig_7.mp4', reelUrl: 'https://www.instagram.com/p/Dd6gj9ZvKPo' }
];
