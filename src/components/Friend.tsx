import { DollarSign, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  updateFriendBalanceInStorage,
  saveTransactionToStorage,
  generateId,
  type Friend,
  type Transaction,
} from "../utils/localStorage";
import { useModalAlert } from "../hooks/useModalAlert";
import ModalAlert from "./ModalAlert";

type Props = {
  friend: Friend;
  onUpdateBalance?: (friendId: number, newBalance: number) => void;
  onDeleteFriend?: (friendId: number) => void;
};

export default function Friend({
  friend,
  onUpdateBalance,
  onDeleteFriend,
}: Props) {
  const [formData, setFormData] = useState({
    totalTagihan: 0,
    tagihanKamu: 0,
    tagihanFriend: 0,
    ditalanginSama: "",
  });

  const {
    alertConfig,
    isVisible,
    hideAlert,
    showSuccess,
    showError,
    showConfirm,
  } = useModalAlert();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const numericValue =
      e.target.type === "number" ? parseFloat(value) || 0 : value;

    setFormData((prev) => {
      const updated = { ...prev, [name]: numericValue };

      // Auto calculate tagihan friend ketika total dan tagihan kamu berubah
      if (name === "totalTagihan") {
        // Ketika total tagihan berubah, bagi rata jika tagihan kamu masih 0
        if (prev.tagihanKamu === 0) {
          updated.tagihanKamu = updated.totalTagihan / 2;
          updated.tagihanFriend = updated.totalTagihan / 2;
        } else {
          updated.tagihanFriend = updated.totalTagihan - updated.tagihanKamu;
        }
      } else if (name === "tagihanKamu") {
        updated.tagihanFriend = updated.totalTagihan - updated.tagihanKamu;
      } else if (name === "tagihanFriend") {
        updated.tagihanKamu = updated.totalTagihan - updated.tagihanFriend;
      }

      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi input
    if (formData.totalTagihan <= 0) {
      showError("Total tagihan harus lebih dari 0");
      return;
    }

    if (
      Math.abs(
        formData.tagihanKamu + formData.tagihanFriend - formData.totalTagihan
      ) > 0.01
    ) {
      showError(
        "Jumlah tagihan kamu dan tagihan teman harus sama dengan total tagihan"
      );
      return;
    }

    if (!formData.ditalanginSama) {
      showError("Pilih siapa yang mentalangi");
      return;
    }

    try {
      // Hitung perubahan balance
      let balanceChange = 0;

      if (formData.ditalanginSama === "self") {
        // Kamu yang bayar, jadi friend berhutang ke kamu
        balanceChange = formData.tagihanFriend;
      } else if (formData.ditalanginSama === friend.id.toString()) {
        // Friend yang bayar, jadi kamu berhutang ke friend
        balanceChange = -formData.tagihanKamu;
      }

      // Update balance
      const newBalance = friend.balance + balanceChange;

      // Save to localStorage
      updateFriendBalanceInStorage(friend.id, newBalance);

      // Save transaction to localStorage
      const transaction: Transaction = {
        id: generateId().toString(),
        friendId: friend.id,
        friendName: friend.name,
        totalTagihan: formData.totalTagihan,
        tagihanKamu: formData.tagihanKamu,
        tagihanFriend: formData.tagihanFriend,
        ditalanginSama: formData.ditalanginSama,
        balanceChange: balanceChange,
        date: new Date().toISOString(),
      };

      saveTransactionToStorage(transaction);

      // Update UI
      onUpdateBalance?.(friend.id, newBalance);

      // Success message
      const successMessage =
        formData.ditalanginSama === "self"
          ? `Split bill berhasil! ${
              friend.name
            } sekarang berhutang Rp ${formData.tagihanFriend.toLocaleString()} ke kamu.`
          : `Split bill berhasil! Kamu sekarang berhutang Rp ${formData.tagihanKamu.toLocaleString()} ke ${
              friend.name
            }.`;

      showSuccess(successMessage);

      // Reset form
      setFormData({
        totalTagihan: 0,
        tagihanKamu: 0,
        tagihanFriend: 0,
        ditalanginSama: "",
      });

      // Close modal
      (document.getElementById("form-patungan") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error saving split bill:", error);
      showError("Gagal menyimpan split bill. Silakan coba lagi.");
    }
  };

  const closeModal = () => {
    // Reset form when modal is closed
    setFormData({
      totalTagihan: 0,
      tagihanKamu: 0,
      tagihanFriend: 0,
      ditalanginSama: "",
    });
  };
  const handleDeleteFriend = () => {
    showConfirm(
      `Apakah Anda yakin ingin menghapus ${friend.name} dari daftar teman?`,
      () => {
        try {
          onDeleteFriend?.(friend.id);
          showSuccess(`${friend.name} berhasil dihapus dari daftar teman`);
        } catch (error) {
          console.error("Error deleting friend:", error);
          showError("Gagal menghapus teman. Silakan coba lagi.");
        }
      }
    );
  };

  return (
    <li className="list-row">
      <div>
        <img
          className="size-15 rounded-full"
          src={friend.image}
          alt={friend.name}
        />
      </div>
      <div>
        <div>{friend.name}</div>
        <div className="text-xs uppercase mt-1 font-semibold opacity-60">
          {friend.balance < 0 && (
            <p className="negative-balance">
              Kamu berhutang: {friend.balance} ke {friend.name}
            </p>
          )}
          {friend.balance > 0 && (
            <p className="positive-balance">
              {friend.name} berhutang {friend.balance} ke kamu
            </p>
          )}
          {friend.balance === 0 && (
            <p className="zero-balance">
              kamu dan {friend.name} tidak ada hutang
            </p>
          )}
        </div>
      </div>
      <button
        className="btn btn-success"
        onClick={() =>
          (
            document.getElementById("form-patungan") as HTMLDialogElement | null
          )?.showModal()
        }
      >
        <DollarSign className="text-success-content" />
      </button>

      <dialog id="form-patungan" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg">Patungan Bareng {friend.name}</h3>

          <form
            onSubmit={handleSubmit}
            className="py-4 mt-6 flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <p>Total Tagihan</p>
              <label className="input input-bordered">
                <input
                  type="number"
                  name="totalTagihan"
                  value={formData.totalTagihan || ""}
                  onChange={handleInputChange}
                  required
                  placeholder="100000"
                  min="0"
                  step="1000"
                />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <p>Tagihan Kamu</p>
              <label className="input input-bordered">
                <input
                  type="number"
                  name="tagihanKamu"
                  value={formData.tagihanKamu || ""}
                  onChange={handleInputChange}
                  required
                  placeholder="50000"
                  min="0"
                  step="1000"
                />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <p>Tagihan {friend.name}</p>
              <label className="input input-bordered">
                <input
                  type="number"
                  name="tagihanFriend"
                  value={formData.tagihanFriend || ""}
                  onChange={handleInputChange}
                  required
                  placeholder="50000"
                  min="0"
                  step="1000"
                />
              </label>
            </div>

            {/* Warning jika total tidak sesuai */}
            {formData.totalTagihan > 0 &&
              formData.tagihanKamu + formData.tagihanFriend !==
                formData.totalTagihan && (
                <div className="alert alert-warning">
                  <span>
                    ⚠️ Total tagihan tidak sesuai! (
                    {formData.tagihanKamu + formData.tagihanFriend} ≠{" "}
                    {formData.totalTagihan})
                  </span>
                </div>
              )}

            <div className="grid grid-cols-2 gap-4">
              <p>Ditalangin sama</p>
              <select
                name="ditalanginSama"
                value={formData.ditalanginSama}
                onChange={handleInputChange}
                className="select select-bordered"
                required
              >
                <option value="">Pilih</option>
                <option value="self">Diri Sendiri</option>
                <option value={friend.id}>{friend.name}</option>
              </select>
            </div>

            {/* Preview perubahan balance */}
            {formData.ditalanginSama && formData.totalTagihan > 0 && (
              <div className="alert alert-info">
                <span>
                  💡 Setelah split bill ini:
                  {formData.ditalanginSama === "self" ? (
                    <>
                      <br />• {friend.name} akan berhutang{" "}
                      <strong>
                        Rp {formData.tagihanFriend.toLocaleString()}
                      </strong>{" "}
                      ke kamu
                      <br />• Balance baru:{" "}
                      <strong>
                        Rp{" "}
                        {(
                          friend.balance + formData.tagihanFriend
                        ).toLocaleString()}
                      </strong>
                    </>
                  ) : (
                    <>
                      <br />• Kamu akan berhutang{" "}
                      <strong>
                        Rp {formData.tagihanKamu.toLocaleString()}
                      </strong>{" "}
                      ke {friend.name}
                      <br />• Balance baru:{" "}
                      <strong>
                        Rp{" "}
                        {(
                          friend.balance - formData.tagihanKamu
                        ).toLocaleString()}
                      </strong>
                    </>
                  )}
                </span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary mt-6"
              disabled={
                !formData.ditalanginSama ||
                formData.totalTagihan <= 0 ||
                formData.tagihanKamu + formData.tagihanFriend !==
                  formData.totalTagihan
              }
            >
              Simpan Split Bill
            </button>
          </form>
        </div>
      </dialog>

      <button className="btn btn-error" onClick={handleDeleteFriend}>
        <Trash2 className="text-error-content" />
      </button>

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
    </li>
  );
}
