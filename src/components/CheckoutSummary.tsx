"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function CheckoutSummary({
    paymentData,
    subtotal,
    discount,
    total,
    currentCredit,
    useCredit
}: { 
    paymentData: PaymentItem
    subtotal: number
    discount: number
    total: number
    currentCredit: number
    useCredit: boolean
}) {

    /*const [finalPrice, setFinalPrice] = useState(total);
    const [finalUseCredit, setFinalUseCredit] = useState(currentCredit);
    useEffect(() => {
        if (useCredit) {
            if (currentCredit > total) {
                setFinalPrice(100);
                setFinalUseCredit(total - 100);
            } else {
                setFinalPrice(total - currentCredit);
            }
        } else {
            setFinalPrice(total);
        }
    }
    , [useCredit, currentCredit, total]);*/

    const hotelpic = paymentData.booking.hotel.picture;

    console.log(hotelpic)

    return (
        <div className="w-1/2 bg-gray-100 p-12 flex flex-col py-20">
            <h1 className="text-3xl font-semibold mb-8 text-black">Order Summary</h1>
            <hr className="mb-4" />
            <div className="flex items-center mb-6">
                <Image src={hotelpic || "/img/fallback-image.jpg"} alt="hotel item" width={56} height={56} className="w-14 h-14 mr-4 rounded-lg" />
                <div>
                <p className="font-medium text-black text-xl">{paymentData.booking.hotel.name}</p>
                <p className="text-sm text-gray-600 font-semibold">Number {paymentData.booking.room.number}</p>
                </div>
                <div className="ml-auto text-right">
                <p className="font-semibold text-black text-xl">฿{subtotal.toFixed(2)}</p>

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
                    <span>฿{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg">
                    <span>Membership discount</span>
                    <span className="text-red-500">- ฿{discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg">
                    <span>Use Credit</span>
                    <span className="text-red-500">- ฿{useCredit ? currentCredit : 0}</span>
                </div>
                    <hr />
                <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>฿{total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-400">Including your ฿21.4 tax</p>
            </div>
        </div>
    )
}