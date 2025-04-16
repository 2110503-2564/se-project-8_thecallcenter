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
    onRefundClick,
    onDeleteClick,
}: {
    bookingData: BookingItem;
    setBookings: React.Dispatch<React.SetStateAction<BookingItem[]>>;
    onEditClick: (booking: BookingItem) => void;
    onRefundClick: (booking: BookingItem) => void;
    onDeleteClick: (booking: BookingItem) => void;
}) {
    const [payments, setPayments] = useState<PaymentItem[]>(bookingData.payments || []);
    const [payments, setPayments] = useState<PaymentItem[]>(bookingData.payments || []);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserItem | null>(null);

    const handleRefund = () => {
        if (window.confirm("Are you sure you want to refund this booking?")) {
            onRefundClick(bookingData);
        }
    };

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

    const statusColor = bookingData.status === "confirmed"
        ? "bg-green-100 text-green-800"
        : bookingData.status === "pending"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800";

    return (
        <div className="rounded-2xl bg-white shadow-md h-full p-6 space-y-4 border border-gray-200">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-sky-800">Booking Summary</h2>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${statusColor}`}>
                    {bookingData.status.charAt(0).toUpperCase() + bookingData.status.slice(1)}
                </span>
            </div>

            <div className="space-y-1 text-sm text-gray-700">
                <div><span className="font-medium">Customer:</span> {bookingData.user.name || "Unknown"}</div>
                <div><span className="font-medium">Room No.:</span> {bookingData.room.number || "Unknown"}</div>
                <div><span className="font-medium">Hotel:</span> {bookingData.hotel?.name || "Unknown"}</div>
                <div><span className="font-medium">Check-In Date:</span> {dayjs(bookingData.checkInDate).format("MMMM D, YYYY")}</div>
                <div><span className="font-medium">Check-Out Date:</span> {dayjs(bookingData.checkOutDate).format("MMMM D, YYYY")}</div>
            </div>

            <div className="flex space-x-3 items-center justify-end pt-3">
                <Button variant="contained" color="success" onClick={() => onEditClick(bookingData)}>
                    Edit
                </Button>
                <Button variant="contained" color="warning" onClick={handleRefund}>
                    Refund
                </Button>
                <Button variant="contained" color="error" onClick={handleDelete}>
                    Delete
                </Button>
            </div>
        </div>
    );
}