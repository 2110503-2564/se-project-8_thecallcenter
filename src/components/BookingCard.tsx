"use client";

import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from 'next/navigation'; 
import Swal from "sweetalert2";


export default function BookingCard({
    bookingData,
    setBookings,
    onEditClick,  // New prop to trigger edit
    onDeleteClick,  // New prop to trigger delete
}: {
    bookingData: BookingItem;
    setBookings: React.Dispatch<React.SetStateAction<BookingItem[]>>;
    onEditClick: (booking: BookingItem) => void;  // Prop type for the edit click handler
    onDeleteClick: (booking: BookingItem) => void;  // Prop type for the delete click handler
}) {
    const handleDelete = () => {
        Swal.fire({
            title: "Do you want to delete?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't delete`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire("DELETE!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("Changes are not delete", "", "info");
            }
          });
    };

    const router = useRouter();

    const handleView = () => {
        router.push(`/mybooking/${bookingData._id}`);
    }

    return (
        <div className="rounded-2xl bg-white flex flex-col justify-between shadow-md h-full p-6">
            <p><span className="font-semibold">Customer: </span>{bookingData.user.name || "Unknown"}</p>
            <p><span className="font-semibold">Room No. </span>{bookingData.room.number || "Unknown"}</p>
            <p><span className="font-semibold">Hotel: </span>{bookingData.hotel?.name || "Unknown"}</p>
            <p><span className="font-semibold">Check-In Date: </span>{dayjs(bookingData.checkInDate).format("MMMM D, YYYY")}</p>
            <p><span className="font-semibold">Check-Out Date: </span>{dayjs(bookingData.checkOutDate).format("MMMM D, YYYY")}</p>

            <div className="flex space-x-3 items-center justify-end">
                {/* Edit Button */}
                <Button variant="contained" color="success" onClick={handleView}>
                    SEE ALL
                </Button>
            </div>
        </div>
    );
}
