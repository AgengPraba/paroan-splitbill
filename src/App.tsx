import FriendList from "./components/FriendList";
import Navbar from "./components/Navbar";
import AddButton from "./components/AddButton";

const initialFriendList = [
  {
    id: 1,
    name: 'Ahmad',
    image: 'https://i.pravatar.cc/300',
    balance: 1000,
  },
  {
    id: 2,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/100',
    balance: 5000,
  },
  {
    id: 3,
    name: 'John',
    image: 'https://i.pravatar.cc/200',
    balance: 3000,
  },
  {
    id: 4,
    name: 'Alice',
    image: 'https://i.pravatar.cc/400',
    balance: 2000,
  },
  {
    id: 5,
    name: 'Bob',
    image: 'https://i.pravatar.cc/500',
    balance: 1500,
  },
];

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="container mx-auto p-4">
        <FriendList friends={initialFriendList}></FriendList>
        <AddButton />
      </main>
      <footer className="text-center p-4 bg-gray-100">
        <p className="text-sm text-gray-600">© 2023 Paroan. All rights reserved.</p>
      </footer>
    </div>
  )
}
