import FriendList from "./components/FriendList";
import Navbar from "./components/Navbar";
import AddButton from "./components/AddButton";
import AlertContainer from "./components/AlertContainer";
import Footer from "./components/Footer";
import { useAlerts } from "./hooks/useAlerts";
import { useState, useEffect } from "react";
import {
  getFriendsFromStorage,
  saveFriendsToStorage,
  type Friend,
} from "./utils/localStorage";

// Initial data - hanya digunakan jika localStorage kosong
const initialFriendList: Friend[] = [
  {
    id: 1,
    name: "Ahmad",
    image: "https://i.pravatar.cc/300?seed=1",
    balance: -1000,
  },
  {
    id: 2,
    name: "Sarah",
    image: "https://i.pravatar.cc/300?seed=2",
    balance: 25000,
  },
  {
    id: 3,
    name: "Asep",
    image: "https://i.pravatar.cc/300?seed=3",
    balance: -50000,
  },
  {
    id: 4,
    name: "Putri",
    image: "https://i.pravatar.cc/300?seed=4",
    balance: 72000,
  },
  {
    id: 5,
    name: "Bobi",
    image: "https://i.pravatar.cc/300?seed=5",
    balance: 15000,
  },
];

export default function App() {
  const { alerts, showAlert, removeAlert } = useAlerts();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize localStorage dengan data awal jika kosong
  useEffect(() => {
    const storedFriends = getFriendsFromStorage();
    if (storedFriends.length === 0) {
      saveFriendsToStorage(initialFriendList);
      showAlert(
        "info",
        "Data awal telah dimuat. Selamat datang di Paroan Split Bill!"
      );
    }
  }, [showAlert]);

  const handleFriendAdded = () => {
    // Trigger refresh FriendList
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="App min-h-screen flex flex-col">
      <AlertContainer alerts={alerts} onRemoveAlert={removeAlert} />
      <Navbar onSearch={handleSearch} />
      <main className="container mx-auto flex-grow p-4">
        <FriendList refreshTrigger={refreshTrigger} searchTerm={searchTerm} />
        <AddButton onFriendAdded={handleFriendAdded} />
      </main>
      <Footer />
    </div>
  );
}
