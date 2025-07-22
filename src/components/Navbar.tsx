import { useState } from "react";

type Props = {
  onSearch?: (searchTerm: string) => void;
};

export default function Navbar({ onSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchTerm.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Real-time search saat user mengetik
    onSearch?.(value.trim());
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch?.("");
  };

  return (
    <div className="navbar bg-base-300 flex flex-row justify-between shadow-sm">
      <div className="flex">
        <a className="btn btn-ghost text-xl">Paroan</a>
      </div>
      <div className="flex gap-2">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="form-control relative">
            <input
              type="text"
              placeholder="Cari teman..."
              className="input input-bordered w-24 md:w-auto pr-8"
              value={searchTerm}
              onChange={handleInputChange}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content"
              >
                ✕
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="flex items-center">
        <label className="toggle text-base-content">
          <input type="checkbox" value="forest" className="theme-controller" />

          <svg
            aria-label="sun"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </g>
          </svg>

          <svg
            aria-label="moon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </g>
          </svg>
        </label>
      </div>
    </div>
  );
}
