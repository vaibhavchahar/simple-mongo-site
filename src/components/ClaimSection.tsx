
import { Button } from './ui/button';
import { Gift, Sparkles } from 'lucide-react';

interface ClaimSectionProps {
  selectedUserId: string;
  onClaim: () => void;
  lastClaimedPoints: number | null;
}

export const ClaimSection = ({ selectedUserId, onClaim, lastClaimedPoints }: ClaimSectionProps) => {
  return (
    <div className="space-y-3">
      <Button
        onClick={onClaim}
        disabled={!selectedUserId}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        <Gift className="mr-2" size={18} />
        Claim Random Points
      </Button>
      
      {lastClaimedPoints && (
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-lg flex items-center animate-fade-in">
          <Sparkles className="mr-2" size={18} />
          <span className="font-semibold">+{lastClaimedPoints} points awarded!</span>
        </div>
      )}
    </div>
  );
};
