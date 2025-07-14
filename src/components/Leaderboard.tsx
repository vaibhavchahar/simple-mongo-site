import { User } from '../types/User';
import { Crown, Trophy, Medal, User as UserIcon, Flame } from 'lucide-react';

interface LeaderboardProps {
  users: User[];
}

export const Leaderboard = ({ users }: LeaderboardProps) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-500" size={20} />;
      case 2:
        return <Trophy className="text-gray-400" size={20} />;
      case 3:
        return <Medal className="text-orange-600" size={20} />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
      case 3:
        return "bg-gradient-to-r from-orange-400 to-red-500 text-white";
      default:
        return "bg-white border border-gray-200";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Flame className="text-red-500" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Live Leaderboard</h2>
      </div>

      {/* Top 3 Users - Special Display */}
      {users.slice(0, 3).length > 0 && (
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {users.slice(0, 3).map((user, index) => {
            const rank = index + 1;
            return (
              <div
                key={user.id}
                className={`p-4 rounded-2xl shadow-lg ${getRankStyle(rank)} transform hover:scale-105 transition-all duration-200`}
              >
                <div className="text-center space-y-2">
                  <div className="flex justify-center">
                    {getRankIcon(rank)}
                  </div>
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <UserIcon size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-lg">{user.name}</h3>
                  <div className="text-2xl font-bold">
                    {user.totalPoints}
                    <span className="text-sm font-normal ml-1">pts</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Rest of the users */}
      <div className="space-y-2">
        {users.slice(3).map((user, index) => {
          const rank = index + 4;
          return (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8">
                  {getRankIcon(rank)}
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <UserIcon size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-500">Rank #{rank}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">
                  {user.totalPoints}
                </div>
                <div className="text-sm text-gray-500">points</div>
              </div>
            </div>
          );
        })}
      </div>

      {users.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <UserIcon size={48} className="mx-auto mb-2 opacity-50" />
          <p>No users available</p>
        </div>
      )}
    </div>
  );
};
