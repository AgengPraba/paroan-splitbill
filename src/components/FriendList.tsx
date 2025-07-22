import Friend from "./Friend";
import { useState, useEffect, useMemo } from "react";
import {
  getFriendsFromStorage,
  removeFriendFromStorage,
  type Friend as FriendType,
} from "../utils/localStorage";

type Props = {
  friends?: FriendType[];
  refreshTrigger?: number; // untuk trigger refresh dari parent
  searchTerm?: string; // untuk filter pencarian
};

export default function FriendList({
  friends: initialFriends,
  refreshTrigger,
  searchTerm = "",
}: Props) {
  const [friends, setFriends] = useState<FriendType[]>([]);

  // Load friends dari localStorage saat component mount atau refresh trigger berubah
  useEffect(() => {
    const loadFriends = () => {
      const storedFriends = getFriendsFromStorage();
      setFriends(storedFriends);
    };

    loadFriends();
  }, [refreshTrigger]);

  // Update jika ada initialFriends dari props
  useEffect(() => {
    if (initialFriends && initialFriends.length > 0) {
      setFriends(initialFriends);
    }
  }, [initialFriends]);

  // Filter friends berdasarkan search term
  const filteredFriends = useMemo(() => {
    if (!searchTerm.trim()) return friends;

    return friends.filter((friend) =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [friends, searchTerm]);

  const handleUpdateBalance = (friendId: number, newBalance: number) => {
    setFriends((prev) =>
      prev.map((friend) =>
        friend.id === friendId ? { ...friend, balance: newBalance } : friend
      )
    );
  };

  const handleDeleteFriend = (friendId: number) => {
    try {
      removeFriendFromStorage(friendId);
      setFriends((prev) => prev.filter((friend) => friend.id !== friendId));
    } catch (error) {
      console.error("Error deleting friend:", error);
    }
  };

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Daftar Teman ({filteredFriends.length})
        {searchTerm && (
          <span className="ml-2 text-primary">
            - Hasil pencarian: "{searchTerm}"
          </span>
        )}
      </li>
      {filteredFriends.length === 0 ? (
        <li className="p-4 text-center text-base-content/50">
          {searchTerm
            ? `Tidak ditemukan teman dengan nama "${searchTerm}"`
            : "Belum ada teman. Tambahkan teman baru untuk mulai split bill!"}
        </li>
      ) : (
        filteredFriends.map((friend) => (
          <Friend
            key={friend.id}
            friend={friend}
            onUpdateBalance={handleUpdateBalance}
            onDeleteFriend={handleDeleteFriend}
          />
        ))
      )}
    </ul>
  );
}
