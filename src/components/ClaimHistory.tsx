
import { ClaimRecord } from '../types/User';
import { History, Clock, Gift, User } from 'lucide-react';

interface ClaimHistoryProps {
  history: ClaimRecord[];
}

export const ClaimHistory = ({ history }: ClaimHistoryProps) => {
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <History className="text-blue-500" size={24} />
        <h2 className="text-xl font-bold text-gray-800">Claim History</h2>
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          {history.length} claims
        </span>
      </div>

      <div className="max-h-96 overflow-y-auto space-y-2">
        {history.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Gift size={48} className="mx-auto mb-2 opacity-50" />
            <p>No claims yet. Start claiming points!</p>
          </div>
        ) : (
          history.map((claim) => (
            <div
              key={claim.id}
              className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{claim.userName}</div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock size={12} />
                    {formatTime(claim.timestamp)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full font-semibold">
                  +{claim.pointsAwarded} pts
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
