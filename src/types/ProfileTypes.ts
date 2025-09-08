export interface ProfileItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}

export interface TournamentRound {
  round: number;
  matches: Match[];
}

export interface Match {
  id: string;
  leftItem: ProfileItem | null;
  rightItem: ProfileItem | null;
  winner: ProfileItem | null;
  isComplete: boolean;
}
