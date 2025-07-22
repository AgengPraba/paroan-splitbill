export default function Navbar() {
  return (
 <div className="navbar bg-base-100 shadow-sm">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">Paroan</a>
    </div>
    <div className="flex gap-2">
      <input type="text" placeholder="Cari..." className="input input-bordered w-24 md:w-auto" />
      <div className="navbar-end">
        <a className="btn">Cari</a>
      </div>
    </div>
  </div>
  );
}