type Friend = {
  id: number;
  name: string;
  image: string;
  balance: number;
};

type Props = {
  friend: Friend;
};

export default function Friend({ friend }: Props) {
  return (
    <li className="list-row">
      <div><img className="size-10 rounded-box" src={friend.image} alt={friend.name}/></div>
      <div>
        <div>{friend.name}a</div>
        <div className="text-xs uppercase font-semibold opacity-60">
        {
          friend.balance < 0 && (
            <p className="negative-balance">Kamu berhutang: {friend.balance} ke {friend.name}</p>
          )
        }
        {
          friend.balance > 0 && (
            <p className="positive-balance">{friend.name} berhutang {friend.balance} ke kamu</p>
          )
        }
        {
          friend.balance === 0 && (
            <p className="zero-balance">kamu dan { friend.name } tdak ada hutang</p>
          )
        }
        </div>
      </div>
      <button className="btn btn-square btn-ghost">
        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
      </button>

    </li>
  );
}