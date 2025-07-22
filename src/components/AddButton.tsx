import { Plus } from "lucide-react";
import { useState } from "react";
import { addFriendToStorage, generateId } from "../utils/localStorage";
import type { Friend } from "../utils/localStorage";
import { useModalAlert } from "../hooks/useModalAlert";
import ModalAlert from "./ModalAlert";

type Props = {
  onFriendAdded?: () => void;
};

export default function AddButton({ onFriendAdded }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    image: "/img/profile-default.png", // Set default image dari awal
  });
  const [isShown, setIsShown] = useState(false);
  const [useDefaultImage, setUseDefaultImage] = useState(true); // Default menggunakan foto default
  const { alertConfig, isVisible, hideAlert, showSuccess, showError } =
    useModalAlert();

  const DEFAULT_PROFILE_IMAGE = "/img/profile-default.png";

  const validate = (value: string) => {
    const isValid = /^[a-zA-Z0-9\s-]{3,30}$/.test(value);
    setIsShown(!isValid && value.length > 0);
    return isValid;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        showError("Ukuran file maksimal 2MB");
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          image: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", image: DEFAULT_PROFILE_IMAGE });
    setUseDefaultImage(true);
    setIsShown(false);
    // Reset file input
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleImageOptionChange = (useDefault: boolean) => {
    setUseDefaultImage(useDefault);
    if (useDefault) {
      setFormData((prev) => ({ ...prev, image: DEFAULT_PROFILE_IMAGE }));
      // Reset file input
      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } else {
      setFormData((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();

    if (!validate(trimmedName)) {
      setIsShown(true);
      showError(
        "Nama harus 3-30 karakter, hanya huruf, angka, spasi, dan dash"
      );
      return;
    }

    if (!formData.image) {
      showError("Silakan pilih foto atau gunakan foto default");
      return;
    }

    try {
      const newFriend: Friend = {
        id: generateId(),
        name: trimmedName,
        image: formData.image,
        balance: 0,
      };

      addFriendToStorage(newFriend);
      onFriendAdded?.();
      showSuccess(`Teman ${trimmedName} berhasil ditambahkan!`);

      resetForm();
      // Close modal
      (document.getElementById("my_modal_1") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error adding friend:", error);
      showError("Gagal menambahkan teman. Silakan coba lagi.");
    }
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-accent text-accent-content shadow-lg hover:bg-accent-focus transition duration-300 cursor-pointer"
        aria-label="Tambah"
        onClick={() =>
          (
            document.getElementById("my_modal_1") as HTMLDialogElement | null
          )?.showModal()
        }
      >
        <Plus className="w-10 h-10" />
      </button>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={resetForm}
            >
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg">Tambah Teman</h3>
          <p className="py-4">
            Tambahkan teman baru untuk mulai split bill bersama
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="input input-bordered w-full flex items-center gap-2">
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
                minLength={3}
                maxLength={30}
                placeholder="Nama Teman"
                value={formData.name}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData((prev) => ({ ...prev, name: value }));
                  validate(value);
                }}
              />
            </label>
            <p className={`text-sm text-error ${isShown ? "block" : "hidden"}`}>
              Nama harus 3-30 karakter, hanya boleh huruf, angka, spasi, dan
              dash (-)
            </p>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Foto Teman</span>
              </label>

              {/* Radio buttons untuk pilihan foto */}
              <div className="flex gap-4 mb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="imageOption"
                    className="radio radio-primary"
                    checked={useDefaultImage}
                    onChange={() => handleImageOptionChange(true)}
                  />
                  <span className="text-sm">Gunakan foto default</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="imageOption"
                    className="radio radio-primary"
                    checked={!useDefaultImage}
                    onChange={() => handleImageOptionChange(false)}
                  />
                  <span className="text-sm">Upload foto sendiri</span>
                </label>
              </div>

              {/* File input hanya muncul jika pilih upload sendiri */}
              {!useDefaultImage && (
                <>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full"
                    accept="image/*"
                    onChange={handleFileChange}
                    required={!useDefaultImage}
                  />
                  <label className="label">
                    <span className="label-text-alt">Maksimal 2MB</span>
                  </label>
                </>
              )}
            </div>

            {/* Preview foto */}
            {formData.image && (
              <div className="flex flex-col items-center gap-2">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-base-300"
                />
                <span className="text-xs text-base-content/60">
                  {useDefaultImage ? "Foto Default" : "Foto Custom"}
                </span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary mt-4"
              disabled={!formData.name.trim() || !formData.image || isShown}
            >
              Tambah Teman
            </button>
          </form>
        </div>
      </dialog>

      {/* Modal Alert */}
      {alertConfig && (
        <ModalAlert
          type={alertConfig.type}
          message={alertConfig.message}
          isVisible={isVisible}
          onConfirm={alertConfig.onConfirm}
          onCancel={alertConfig.onCancel}
          onClose={hideAlert}
          autoClose={alertConfig.autoClose}
          duration={alertConfig.duration}
          confirmText={alertConfig.confirmText}
          cancelText={alertConfig.cancelText}
        />
      )}
    </>
  );
}
