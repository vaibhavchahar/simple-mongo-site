
import { useState, useEffect } from 'react';
import { UserList } from '../components/UserList';
import { ClaimSection } from '../components/ClaimSection';
import { Leaderboard } from '../components/Leaderboard';
import { AddUserForm } from '../components/AddUserForm';
import { ClaimHistory } from '../components/ClaimHistory';
import { User, ClaimRecord } from '../types/User';

const Index = () => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Rahul', totalPoints: 0, avatar: '/placeholder.svg' },
    { id: '2', name: 'Kamal', totalPoints: 0, avatar: '/placeholder.svg' },
    { id: '3', name: 'Sanak', totalPoints: 0, avatar: '/placeholder.svg' },
    { id: '4', name: 'Priya', totalPoints: 0, avatar: '/placeholder.svg' },
    { id: '5', name: 'Arjun', totalPoints: 0, avatar: '/placeholder.svg' },
    { id: '6', name: 'Meera', totalPoints: 0, avatar: '/placeholder.svg' },
    { id: '7', name: 'Vikash', totalPoints: 0, avatar: '/placeholder.svg' },
    { id: '8', name: 'Anjali', totalPoints: 0, avatar: '/placeholder.svg' },
    { id: '9', name: 'Rohit', totalPoints: 0, avatar: '/placeholder.svg' },
    { id: '10', name: 'Kavya', totalPoints: 0, avatar: '/placeholder.svg' },
  ]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [claimHistory, setClaimHistory] = useState<ClaimRecord[]>([]);
  const [lastClaimedPoints, setLastClaimedPoints] = useState<number | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);

  // Sort users by points for ranking
  const rankedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints);

  const handleClaimPoints = () => {
    if (!selectedUserId) return;
    
    const randomPoints = Math.floor(Math.random() * 10) + 1;
    const timestamp = new Date();
    
    // Update user points
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === selectedUserId 
          ? { ...user, totalPoints: user.totalPoints + randomPoints }
          : user
      )
    );

    // Add to claim history
    const selectedUser = users.find(u => u.id === selectedUserId);
    if (selectedUser) {
      const newClaim: ClaimRecord = {
        id: Date.now().toString(),
        userId: selectedUserId,
        userName: selectedUser.name,
        pointsAwarded: randomPoints,
        timestamp,
      };
      setClaimHistory(prev => [newClaim, ...prev]);
    }

    setLastClaimedPoints(randomPoints);
    
    // Clear the notification after 3 seconds
    setTimeout(() => setLastClaimedPoints(null), 3000);
  };

  const handleAddUser = (name: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      totalPoints: 0,
      avatar: '/placeholder.svg',
    };
    setUsers(prev => [...prev, newUser]);
    setShowAddUser(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white text-center">Live Ranking System</h1>
          <p className="text-white/80 text-center mt-1">Claim points and climb the leaderboard!</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Top Section - Claim Points */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Select User & Claim Points</h2>
              <UserList 
                users={users}
                selectedUserId={selectedUserId}
                onSelectUser={setSelectedUserId}
              />
              <div className="mt-4 flex gap-3">
                <ClaimSection 
                  selectedUserId={selectedUserId}
                  onClaim={handleClaimPoints}
                  lastClaimedPoints={lastClaimedPoints}
                />
                <button
                  onClick={() => setShowAddUser(true)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Add User
                </button>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-xl text-white">
                  <div className="text-2xl font-bold">{users.length}</div>
                  <div className="text-sm opacity-90">Total Users</div>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-xl text-white">
                  <div className="text-2xl font-bold">{users.reduce((sum, user) => sum + user.totalPoints, 0)}</div>
                  <div className="text-sm opacity-90">Total Points</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <Leaderboard users={rankedUsers} />
        </div>

        {/* Claim History */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <ClaimHistory history={claimHistory} />
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <AddUserForm 
              onAddUser={handleAddUser}
              onCancel={() => setShowAddUser(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
