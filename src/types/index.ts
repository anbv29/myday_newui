export type Currency = 'INR' | 'USD';

export type NavPage = 
  | '3d-calendar' 
  | 'top-30-highest-paid' 
  | 'leaderboard-and-trends' 
  | 'live-activity' 
  | 'claim-day' 
  | 'date-dossier';

export type CategoryFilter = 
  | 'all'
  | 'trending'
  | 'anniversary'
  | 'startup'
  | 'historic'
  | 'milestone';

export interface BiddingHistoryItem {
  id: string;
  holder: string;
  date: string;
  description: string;
  amount: number;
  isCurrent?: boolean;
  isGenesis?: boolean;
  statusText: string;
}

export interface BlessingItem {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  timeAgo: string;
  text: string;
}

export interface CalendarSlot {
  id: string;
  month: string; // 'OCT', 'JUL', etc.
  day: number;
  monthIndex: number; // 0 to 11
  dayOfYear: number;
  rank: number | null; // 1 to 365 or null
  title: string;
  subtitle?: string;
  quote?: string;
  patron: string;
  patronName?: string;
  patronAvatar?: string;
  settledValue: number; // in INR
  outbidsCount: number;
  tier: 'apex' | 'luminous' | 'perpetual' | 'standard';
  status: 'locked' | 'contested' | 'cooldown' | 'unclaimed';
  dedicationType?: string;
  imageUrl?: string;
  secondaryImageUrl?: string;
  dedicatedTo?: string;
  tokenIdentifier: string;
  razorpayHash: string;
  recordedAt: string;
  audioDuration?: string;
  category: CategoryFilter;
  history?: BiddingHistoryItem[];
  blessings?: BlessingItem[];
}

export interface ActivityEvent {
  id: string;
  type: 'outbid' | 'claim' | 'audio' | 'battle';
  user: string;
  dateStr: string;
  amount: number;
  details: string;
  timeAgo: string;
  channel: string;
}
