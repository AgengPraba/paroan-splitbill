import Friend from './Friend';

type Friend = {
  id: number;
  name: string;
  image: string;
  balance: number;
};

type Props = {
  friends: Friend[];
};

export default function FriendList({ friends }: Props) {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week</li>
      {friends.map((friend, index) => (
        <Friend key={index} friend={friend} />
      ))}
    </ul>
  );
}
