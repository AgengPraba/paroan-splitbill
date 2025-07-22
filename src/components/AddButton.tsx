import { Plus } from "lucide-react";
import { useState } from "react";

export default function AddButton() {
  const [username, setUsername] = useState("");
  const [isShown, setIsShown] = useState(false);

  const validate = (value: string) => {
    const isValid = /^[a-zA-Z0-9-]{3,30}$/.test(value);
    setIsShown(!isValid);
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition duration-300"
        aria-label="Tambah"
        onClick={() =>
          (
            document.getElementById("my_modal_1") as HTMLDialogElement | null
          )?.showModal()
        }
      >
        <Plus className="w-6 h-6 md:w-10 md:h-10" />
      </button>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah Teman</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>

          <form
            method="dialog"
            onSubmit={(e) => {
              if (!/^[a-zA-Z0-9-]{3,30}$/.test(username)) {
                e.preventDefault();
                setIsShown(true);
              }
            }}
          >
            <label className="input validator w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="text"
                required
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minLength={3}
                maxLength={30}
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  const value = e.target.value;
                  setUsername(value);
                  validate(value);
                }}
              />
            </label>
            <p className={` ${isShown ? "validator-hint" : "hidden"}`}>
              Must be 3 to 30 characters
              <br />
              containing only letters, numbers or dash
            </p>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend w-full">Pick a file</legend>
              <input type="file" className="file-input w-full" />
              <label className="label">Max size 2MB</label>
            </fieldset>
            <button className="btn">Close</button>
          </form>
        </div>
      </dialog>
    </>
  );
}
