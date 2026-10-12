export interface ReelItem {
  id: string;
  title: string;
  caption: string;
  videoUrl: string;
  posterImage: string;
  instagramUrl: string;
  category?: string;
  duration?: string;
  highlight?: string;
}

// Config: paste your reel MP4 URLs (or hosted video links) and the Instagram
// post/reel URLs for each card here.
export const REELS: ReelItem[] = [
  {
    id: 'reel-1',
    title: 'Stone-Ground Fresh Atta',
    caption: '100% natural stone chakki atta, milled fresh for you.',
    videoUrl: '',
    posterImage: '/images/IMG_7401.PNG',
    instagramUrl: 'https://www.instagram.com/_truechakki_/',
    category: 'Stone Chakki',
    duration: '0:34',
    highlight: 'Cold Milled',
  },
  {
    id: 'reel-2',
    title: 'Wood-Pressed Oils',
    caption: 'Traditional kachi ghani oils made the pure, slow way.',
    videoUrl: '',
    posterImage: '/images/IMG_7637new.PNG',
    instagramUrl: 'https://www.instagram.com/_truechakki_/',
    category: 'Wood Kolhu',
    duration: '0:45',
    highlight: 'Pure Kachi Ghani',
  },
  {
    id: 'reel-3',
    title: 'Fresh from the Farm',
    caption: 'Straight from the farm to your home — pure & natural.',
    videoUrl: '',
    posterImage: '/images/groundatta.PNG',
    instagramUrl: 'https://www.instagram.com/_truechakki_/',
    category: 'Farm Direct',
    duration: '0:28',
    highlight: '100% Non-GMO',
  },
];