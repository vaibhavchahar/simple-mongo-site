
export interface User {
  id: string;
  name: string;
  totalPoints: number;
  avatar: string;
}

export interface ClaimRecord {
  id: string;
  userId: string;
  userName: string;
  pointsAwarded: number;
  timestamp: Date;
}
