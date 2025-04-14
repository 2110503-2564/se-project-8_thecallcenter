"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { getPayments } from "@/libs/Payment/getPayments";
import getUserProfile from "@/libs/Auth/getUserProfile";

export default function BookingCard({
    bookingData,
    setBookings,
    onEditClick,
    onDeleteClick,
}: {
    bookingData: BookingItem;
    setBookings: React.Dispatch<React.SetStateAction<BookingItem[]>>;
    onEditClick: (booking: BookingItem) => void;
    onDeleteClick: (booking: BookingItem) => void;
}) {
    const { data: session } = useSession();
    const [payments, setPayments] = useState<PaymentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserItem | null>(null);

    useEffect(() => {
        async function fetchData() {
            if (!session?.user?.token) return;

            const profile = await getUserProfile(session.user.token);
            setUserProfile(profile.data);

            const paymentJson: PaymentJson = await getPayments(session.user.token);
            setPayments(paymentJson.data);

            setLoading(false);
        }

        fetchData();
    }, [session]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            onDeleteClick(bookingData);
        }
    };

    const handlePaymentUpdate = (paymentId: string, newStatus: string) => {
        setPayments((prevPayments) =>
            prevPayments.map((payment) =>
                payment._id === paymentId ? { ...payment, status: newStatus } : payment
            )
        );
    };

    return (
        <div className="rounded-2xl bg-white flex flex-col justify-between shadow-md h-full p-6 space-y-2">
            <p>
                <span className="font-semibold">Status: </span>
                <span
                    className={`font-bold ${bookingData.status === "confirmed"
                            ? "text-green-600"
                            : bookingData.status === "pending"
                                ? "text-yellow-500"
                                : "text-red-500"
                        }`}
                >
                    {bookingData.status}
                </span>

            </p>
            <p><span className="font-semibold">Customer: </span>{bookingData.user.name || "Unknown"}</p>
            <p><span className="font-semibold">Room No. </span>{bookingData.room.number || "Unknown"}</p>
            <p><span className="font-semibold">Hotel: </span>{bookingData.hotel?.name || "Unknown"}</p>
            <p><span className="font-semibold">Check-In Date: </span>{dayjs(bookingData.checkInDate).format("MMMM D, YYYY")}</p>
            <p><span className="font-semibold">Check-Out Date: </span>{dayjs(bookingData.checkOutDate).format("MMMM D, YYYY")}</p>

            <div className="flex space-x-3 items-center justify-end pt-2">
                <Button variant="contained" color="success" onClick={() => onEditClick(bookingData)}>
                    Edit
                </Button>
                <Button variant="contained" color="error" onClick={handleDelete}>
                    Delete
                </Button>
            </div>
        </div>
    );
}
