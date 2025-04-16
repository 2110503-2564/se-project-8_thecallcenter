"use client";

import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Adjust the import path and icon library as needed
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import CountdownTimer from '@/components/CountdownTimer';
import { updatePayment } from '@/libs/Payment/updatePayment';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import CardForm from '@/components/Cardform'; // Adjust the import path as needed
import BankForm from '@/components/BankForm'; // Adjust the import path as needed


export default function CheckoutCard({ paymentData }: { paymentData: PaymentItem2 }) {

  const [amount, setAmount] = useState(Number(paymentData.amount));
  const [hotelName, setHotelName] = useState(paymentData.booking.hotel.name);
  const [roomNumber, setRoomNumber] = useState(paymentData.booking.room.number);
  const [hotelImage, setHotelImage] = useState(paymentData.booking.hotel.picture);



  const subtotal = amount;
  const discount = 7.24;
  //const total = (subtotal - discount).toFixed(2);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [checkSuccess, setCheckSuccess] = useState(false);
  const [checkCard, setCheckCard] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(() => searchParams.get('paymentMethod') || 'Card');
  const [selectedBank, setSelectedBank] = useState('');
  const [total, setTotal] = useState(subtotal - discount);

  useEffect(() => {
    const currentPayment = searchParams.get('paymentMethod');
    if (currentPayment) {
      setPaymentMethod(currentPayment);
    }
  }, [searchParams]);
  const { data: session } = useSession();



  const handleNavigation = async () => {
    if (session?.user?.token) {

      const response = await updatePayment(paymentData._id, { status: 'pending', method: paymentMethod, amount: total }, session.user.token);
      console.log(response);

    } else {
      console.error('User session token is not available.');
    }
  };


  return (
    <>
      {checkSuccess ? (
        <div className="flex flex-col items-center justify-center text-center w-full min-h-screen bg-white p-12">
          <h1 className="text-gray-700 text-lg mb-6">Thank You For Your Purchase</h1>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="bg-green-400 rounded-full p-6 mb-8 relative"
          >
            <FaCheckCircle size={64} className="text-white" />
          </motion.div>

          <h2 className="text-2xl font-semibold text-black mb-8">
            Order {hotelName} Room{roomNumber} Confirmed
          </h2>

          <Link href="/payment" className="text-gray-400 font-medium mb-4">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded mb-4">See Your Payment</button>
          </Link>

          <button
            className="text-gray-400 font-medium"
            disabled
          >
            Generate Receipt
          </button>
        </div>
      ) : (

        <main className="w-full min-h-screen flex flex-row">
          <div className="w-1/2 bg-white p-12 flex flex-col">
            <h1 className="text-3xl font-semibold mb-8 text-black">Payment</h1>
            <hr className="mb-4" />

            <div className="mb-6">
              <label className="block font-medium mb-2 text-black">Pay With:</label>
              <div className="flex items-center space-x-6">
                {['Card', 'Bank', 'ThaiQR'].map((method) => (
                  <label key={method} className="flex items-center text-gray-500 font-semibold space-x-1">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === method}
                      onChange={() => {
                        setPaymentMethod(method);
                        setCheckCard(false);
                        setSelectedBank('');
                      }}
                    />
                    <span className="capitalize">{method}</span>
                  </label>
                ))}
              </div>
            </div>



            {paymentMethod === 'Card' && (
              <CardForm
                total={total}
                onSuccess={(amount) => {
                  handleNavigation();
                  setCheckSuccess(true);
                }}
              />
            )}

            {paymentMethod === 'Bank' && (
              <BankForm
                total={total}
                onSuccess={(amount, bank) => {
                  console.log('Bank:', bank); // ถ้าอยาก log หรือใช้งานค่า bank เพิ่มเติม
                  setSelectedBank(bank);
                  handleNavigation();
                  setCheckSuccess(true);
                }}
              />
            )}

            {paymentMethod === 'ThaiQR' && (
              <div className="mb-6 flex flex-col items-center text-center">
                <p className="text-gray-400 mb-6 text-lg">thaiqr USD ${total} to:</p>
                <p className="text-black font-semibold text-2xl">Polaris Bank</p>
                <p className="text-black font-bold text-3xl">0123456781</p>
                <div className="mt-6">
                  <CountdownTimer duration={600} />
                </div>
                <button
                  onClick={() => {
                    handleNavigation();
                    setCheckSuccess(true);
                  }}
                  className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold"
                >
                  Confirm Payment
                </button>
              </div>
            )}



            <p className="text-xs text-gray-500 mt-4">
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
            </p>
          </div>

          <div className="w-1/2 bg-gray-100 p-12 flex flex-col">
            <h1 className="text-3xl font-semibold mb-8 text-black">Order Summary</h1>
            <hr className="mb-4" />
            <div className="flex items-center mb-6">
              <img src={hotelImage} alt="hotel item" className="w-14 h-14 mr-4 rounded-lg" />
              <div>
                <p className="font-medium text-black text-xl">{hotelName}</p>
                <p className="text-sm text-gray-600 font-semibold">Number {roomNumber}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="font-semibold text-black text-xl">${subtotal.toFixed(2)}</p>

              </div>
            </div>

            <div className="flex mb-6">
              <input
                type="text"
                placeholder="Gift or discount code"
                className="flex-1 border border-gray-300 p-2 rounded-l text-black"
              />
              <button className="bg-gray-400 hover:bg-[#E0401D] text-white px-4 rounded-r transition-colors">Apply</button>
            </div>

            <div className="border-t pt-4 space-y-5 text-sm text-gray-700">
              <div className="flex justify-between font-medium text-lg">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg">
                <span>Membership discount</span>
                <span className="text-red-500">- ${discount.toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total}</span>
              </div>
              <p className="text-xs text-gray-400">Including your $21.4 tax</p>
            </div>
          </div>
        </main>
      )}
    </>
  );
}