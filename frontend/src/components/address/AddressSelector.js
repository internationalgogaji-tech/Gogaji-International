"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  MapPin,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import { useAddress } from "@/context/AddressContext";
import AddressFormModal from "./AddressFormModal";

export default function AddressSelector() {
  const {
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    selectedAddress,
    loading,
    fetchAddresses,
    deleteAddress,
    setDefaultAddress,
  } = useAddress();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const filteredAddresses = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return addresses;

    return addresses.filter((address) =>
      [
        address.fullName,
        address.phone,
        address.addressLine,
        address.landmark,
        address.city,
        address.state,
        address.pincode,
        address.addressType,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [addresses, search]);

  const openAddModal = () => {
    setEditingAddress(null);
    setModalOpen(true);
  };

  const openEditModal = (address) => {
    setEditingAddress(address);
    setModalOpen(true);
  };

  return (
    <section className="rounded-[24px] border border-[#eadfc8] bg-white p-5 shadow-[0_10px_32px_rgba(46,59,50,0.07)] md:p-7">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-[#e8f2ed] p-3 text-[#176451]">
            <MapPin size={24} />
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#bd9226]">
              Delivery Details
            </p>

            <h2 className="mt-1 text-2xl font-extrabold text-[#176451]">
              Choose Delivery Address
            </h2>

            <p className="mt-1 text-sm text-[#66756f]">
              Select a saved address or add a new one for your order.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#176451] px-5 text-sm font-bold text-white transition hover:bg-[#104b3d]"
        >
          <Plus size={18} />
          Add New Address
        </button>
      </div>

      {addresses.length > 0 && (
        <div className="mb-5">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a99468]"
              size={18}
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-12 w-full rounded-xl border border-[#eadfc8] bg-[#fffcf6] pl-11 pr-4 text-sm outline-none transition focus:border-[#176451] focus:ring-2 focus:ring-[#176451]/10"
              placeholder="Search by name, phone, city or pincode..."
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-[#eee3ce] bg-[#fffcf6] p-7 text-center text-sm font-semibold text-[#66756f]">
          Loading your saved addresses...
        </div>
      ) : filteredAddresses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#d9c99f] bg-[#fffcf6] px-6 py-10 text-center">
          <div className="mx-auto w-fit rounded-full bg-[#e8f2ed] p-4 text-[#176451]">
            <MapPin size={34} />
          </div>

          <h3 className="mt-4 text-xl font-extrabold text-[#176451]">
            No delivery address found
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#66756f]">
            Add your home, office or preferred delivery address to continue.
          </p>

          <button
            type="button"
            onClick={openAddModal}
            className="mt-5 rounded-full bg-[#bd9226] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a87d18]"
          >
            Add Delivery Address
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAddresses.map((address) => {
            const id = String(address._id);
            const selected = String(selectedAddressId) === id;

            return (
              <div
                key={id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedAddressId(id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    setSelectedAddressId(id);
                  }
                }}
                className={`cursor-pointer rounded-2xl border p-4 transition ${
                  selected
                    ? "border-[#176451] bg-[#f0f7f3] shadow-[0_7px_20px_rgba(23,100,81,0.10)]"
                    : "border-[#eadfc8] bg-white hover:border-[#bd9226]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    checked={selected}
                    onChange={() => setSelectedAddressId(id)}
                    className="mt-1 h-4 w-4 accent-[#176451]"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-extrabold text-[#176451]">
                        {address.fullName}
                      </h3>

                      <span className="rounded-full bg-[#f7f0df] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#94701a]">
                        {address.addressType || "Address"}
                      </span>

                      {address.isDefault && (
                        <span className="rounded-full bg-[#e8f2ed] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#176451]">
                          Default
                        </span>
                      )}

                      {selected && (
                        <CheckCircle2 size={18} className="text-[#176451]" />
                      )}
                    </div>

                    <p className="mt-2 text-sm leading-6 text-[#66756f]">
                      {address.addressLine}
                      {address.landmark ? `, ${address.landmark}` : ""},{" "}
                      {address.city}, {address.state} - {address.pincode}
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#44534d]">
                      Mobile: {address.phone}
                      {address.altPhone ? ` / ${address.altPhone}` : ""}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          openEditModal(address);
                        }}
                        className="inline-flex h-9 items-center gap-2 rounded-full border border-[#d8c9a6] bg-white px-4 text-xs font-bold text-[#176451] transition hover:border-[#176451]"
                      >
                        <Pencil size={14} />
                        Edit
                      </button>

                      {!address.isDefault && (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setDefaultAddress(id);
                          }}
                          className="h-9 rounded-full border border-[#d8c9a6] bg-white px-4 text-xs font-bold text-[#176451] transition hover:border-[#176451]"
                        >
                          Make Default
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          deleteAddress(id);
                        }}
                        className="inline-flex h-9 items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 text-xs font-bold text-red-700 transition hover:bg-red-100"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedAddress && (
        <div className="mt-5 rounded-2xl border border-[#d9c99f] bg-[#fffcf6] p-4">
          <p className="text-sm font-extrabold text-[#176451]">
            Selected delivery address
          </p>

          <p className="mt-1 text-sm leading-6 text-[#66756f]">
            {selectedAddress.fullName}, {selectedAddress.phone} —{" "}
            {selectedAddress.addressLine}, {selectedAddress.city},{" "}
            {selectedAddress.state} - {selectedAddress.pincode}
          </p>
        </div>
      )}

      <AddressFormModal
        open={modalOpen}
        editingAddress={editingAddress}
        onClose={() => {
          setModalOpen(false);
          setEditingAddress(null);
        }}
      />
    </section>
  );
}