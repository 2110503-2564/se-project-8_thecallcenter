"use client";

import { useState } from 'react';
import Swal from 'sweetalert2';

export default function BankForm({
  total,
  onSuccess,
}: {
  total: number;
  onSuccess: (amount: number, bank: string) => void;
}) {
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const handleSubmit = () => {
    if (!selectedBank || !accountNumber) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please select a bank and enter your account number!',
      });
      return;
    }

    onSuccess(total, selectedBank);
  };

  return (
    <div className="mb-6">
      
      <label className="block font-medium mb-2 text-black">Choose your bank:</label>
      <select
        value={selectedBank}
        onChange={(e) => setSelectedBank(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded text-black"
      >
        <option value="">Select a bank</option>
        <option value="kbank">Kasikornbank</option>
        <option value="scb">SCB</option>
        <option value="bbl">Bangkok Bank</option>
      </select>

      
      {selectedBank && (
        <>
          <div className="pb-5"></div>
          <label className="block font-medium mb-2 text-black">
            Enter Your Bank Account Number
          </label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full border text-black border-gray-300 p-2 rounded"
          />
        </>
      )}

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold">
        Pay USD {total}
      </button>
    </div>
  );
}
