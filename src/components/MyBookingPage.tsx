"use client";

import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BookingCard from "@/components/BookingCard";
import EditBookingModal from "./EditBookingModal";
import deleteBooking from "@/libs/Booking/deleteBooking";
import updateBooking from "@/libs/Booking/updateBooking";
import { Alert } from "@mui/material";
import Swal from "sweetalert2";

export default function MyBookingPage({
    initialBookings,
    initialUserProfile,
    sessionToken,
}: {
    initialBookings: BookingItem[];
    initialUserProfile: UserItem;
    sessionToken: string;
}) {
    const [bookings, setBookings] = useState<BookingItem[]>(initialBookings);
    const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const userProfile = initialUserProfile;

    const handleEditClick = (booking: BookingItem) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    };

    const handleRefundBooking = async (booking: BookingItem, amount: number) => {
        try {
            // Create an update object with the new status
            const updateData = {
                status: "canceled"
            };
    
            // Call API to update the booking
            
            await updateBooking(booking._id, updateData, sessionToken);

            Swal.fire({
                title: "Refund!",
                text: "Your refund has been approved!.",
                icon: "success"
            });

            window.location.reload();
    
        } catch (error: any) {
            console.error("Error occurred during refunding:", error);
            setAlertType("error");
            setErrorMessage(error.message || "An error occurred during refunding.");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    const handleDeleteBooking = async (booking: BookingItem) => {
        try {
            await deleteBooking(booking._id, sessionToken);
            setBookings((prevBookings) => prevBookings.filter((b) => b._id !== booking._id));
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {showAlert && alertType && (
                <div className="fixed top-10 left-0 w-full z-[9999] flex justify-center p-4">
                    <div className="w-full max-w-md">
                        <Alert severity={alertType} onClose={() => setShowAlert(false)}>
                            {alertType === "success"
                                ? "Your refunding was successful!"
                                : errorMessage}
                        </Alert>
                    </div>
                </div>
            )}
            <main className="w-[1065px] mx-auto grid grid-cols-12 gap-[15px] pt-6 pb-16 text-black">
                <div className="col-span-12 w-full rounded-lg">
                    <h1 className="text-3xl font-outfit font-semibold text-left mb-6">
                        {userProfile?.role === "admin" ? "Bookings" : "My Bookings"}
                    </h1>

                    {bookings.length > 0 ? (
                        <div className="w-full space-y-4">
                            {bookings.map((bookingItem) => (
                                <BookingCard
                                    key={bookingItem._id}
                                    bookingData={bookingItem}
                                    setBookings={setBookings}
                                    onEditClick={handleEditClick}
                                    onRefundClick = {handleRefundBooking}
                                    onDeleteClick={handleDeleteBooking}
                                    token = {sessionToken}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No bookings found.</p>
                    )}
                </div>

                {isModalOpen && selectedBooking && (
                    <EditBookingModal
                        booking={selectedBooking}
                        onClose={handleModalClose}
                        sessionToken={sessionToken}
                        userRole={initialUserProfile.role}
                        setBookings={setBookings}
                    />
                )}
            </main>
        </LocalizationProvider>
    );
}
