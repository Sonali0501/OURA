/**
 * Creator reels for the "They're talking about OURA" section on the home page.
 *
 * `src` is a vertical MP4 in /public/igVideos. `handle` (without the @) and
 * `reelUrl` are optional — when present, the card shows the creator and links
 * out to the original reel on Instagram.
 */
export type CreatorVideo = {
  src: string;
  handle?: string;
  reelUrl?: string;
  caption?: string;
};

export const CREATOR_VIDEOS: CreatorVideo[] = [
  { src: '/igVideos/oura_ig_1.mp4' },
  { src: '/igVideos/oura_ig_2.mp4' },
  { src: '/igVideos/oura_ig_3.mp4' },
  { src: '/igVideos/oura_ig_4.mp4' },
  { src: '/igVideos/oura_ig_5.mp4' },
];
