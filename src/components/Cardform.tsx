"use client";

import { useState } from 'react';
import Swal from 'sweetalert2';

export default function CardForm({
  onSuccess,
  total,
}: {
  onSuccess: (amount: number) => void;
  total: number;
}) {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardValidated, setCardValidated] = useState(false);
  const [pin, setPin] = useState<string[]>(['', '', '', '']);

  const handleSubmit = () => {
    if (!cardNumber || !expirationDate || !cvv) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in all the fields before proceeding!',
      });
      return;
    }

    setCardValidated(true); // เปลี่ยนไปหน้ากรอก PIN
  };

  const handlePinChange = (index: number, value: string) => {
    const newPin = [...pin];
    newPin[index] = value.slice(0, 1); // รับได้แค่ 1 ตัวเลข
    setPin(newPin);
  };

  const confirmPayment = () => {
    if (pin.some((digit) => digit === '')) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete PIN',
        text: 'Please enter your 4-digit card PIN.',
      });
      return;
    }

    onSuccess(total); // ส่งค่าให้ component แม่ (CheckoutCard)
  };

  return (
    <>
      {!cardValidated ? (
        <>
          <div className="mb-4">
            <label className="block font-medium mb-1 text-black">Card Number:</label>
            <input
              type="text"
              placeholder="1234 5678 9101 1121"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="text-black w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="flex space-x-4 mb-6">
            <div className="w-1/2">
              <label className="block font-medium mb-1 text-black">Expiration Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className="text-black w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="w-1/2">
              <label className="block font-medium mb-1 text-black">CVV</label>
              <input
                type="text"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="text-black w-full border border-gray-300 p-2 rounded"
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-[#20589a] hover:bg-[#E0401D] text-white py-2 rounded font-semibold"
          >
            Pay USD {total}
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center mb-6">
          <p className="text-gray-600 text-base font-medium mb-6">
            Enter your 4-digit card pin to confirm this payment
          </p>
          <div className="flex gap-4">
            {[...Array(4)].map((_, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={pin[idx]}
                onChange={(e) => handlePinChange(idx, e.target.value)}
                className="w-14 h-14 text-2xl text-center border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ))}
          </div>
          <button
            onClick={confirmPayment}
            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold"
          >
            Confirm Payment
          </button>
        </div>
      )}
    </>
  );
}
