export type Friend = {
  id: number;
  name: string;
  image: string;
  balance: number;
};

export type Transaction = {
  id: string;
  friendId: number;
  friendName: string;
  totalTagihan: number;
  tagihanKamu: number;
  tagihanFriend: number;
  ditalanginSama: string;
  balanceChange: number;
  date: string;
};

const FRIENDS_KEY = "splitbill_friends";
const TRANSACTIONS_KEY = "splitbill_transactions";

// Friends localStorage functions
export const getFriendsFromStorage = (): Friend[] => {
  try {
    const friends = localStorage.getItem(FRIENDS_KEY);
    return friends ? JSON.parse(friends) : [];
  } catch (error) {
    console.error("Error getting friends from localStorage:", error);
    return [];
  }
};

export const saveFriendsToStorage = (friends: Friend[]): void => {
  try {
    localStorage.setItem(FRIENDS_KEY, JSON.stringify(friends));
  } catch (error) {
    console.error("Error saving friends to localStorage:", error);
  }
};

export const addFriendToStorage = (friend: Friend): void => {
  const friends = getFriendsFromStorage();
  friends.push(friend);
  saveFriendsToStorage(friends);
};

export const removeFriendFromStorage = (friendId: number): void => {
  const friends = getFriendsFromStorage();
  const updatedFriends = friends.filter((friend) => friend.id !== friendId);
  saveFriendsToStorage(updatedFriends);
};

export const updateFriendBalanceInStorage = (
  friendId: number,
  newBalance: number
): void => {
  const friends = getFriendsFromStorage();
  const updatedFriends = friends.map((friend) =>
    friend.id === friendId ? { ...friend, balance: newBalance } : friend
  );
  saveFriendsToStorage(updatedFriends);
};

// Transactions localStorage functions
export const getTransactionsFromStorage = (): Transaction[] => {
  try {
    const transactions = localStorage.getItem(TRANSACTIONS_KEY);
    return transactions ? JSON.parse(transactions) : [];
  } catch (error) {
    console.error("Error getting transactions from localStorage:", error);
    return [];
  }
};

export const saveTransactionToStorage = (transaction: Transaction): void => {
  try {
    const transactions = getTransactionsFromStorage();
    transactions.push(transaction);
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error("Error saving transaction to localStorage:", error);
  }
};

// Generate unique ID
export const generateId = (): number => {
  return Date.now();
};
