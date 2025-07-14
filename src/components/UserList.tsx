
import { User } from '../types/User';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar } from './ui/avatar';
import { User as UserIcon } from 'lucide-react';

interface UserListProps {
  users: User[];
  selectedUserId: string;
  onSelectUser: (userId: string) => void;
}

export const UserList = ({ users, selectedUserId, onSelectUser }: UserListProps) => {
  const selectedUser = users.find(user => user.id === selectedUserId);

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">Choose a user to award points:</label>
      
      <Select value={selectedUserId} onValueChange={onSelectUser}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a user">
            {selectedUser && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <UserIcon size={14} className="text-white" />
                </div>
                <span>{selectedUser.name}</span>
                <span className="text-sm text-gray-500">({selectedUser.totalPoints} pts)</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <UserIcon size={14} className="text-white" />
                </div>
                <span>{user.name}</span>
                <span className="text-sm text-gray-500">({user.totalPoints} pts)</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
