"use client";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import createBooking from "@/libs/Booking/createBooking";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import DateReserve from "./DateReserve";
import { Alert, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { FaHotel, FaBed, FaMoneyBillWave } from "react-icons/fa";
import { UserData } from "next-auth/providers/42-school";
import Link from "next/link";

export default function BookingForm({ hotels, userProfile }: { hotels: HotelItem[], userProfile: UsersData }) {
    const [selectedHotel, setSelectedHotel] = useState<string>("");
    const [rooms, setRooms] = useState<RoomItem[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<RoomItem | null>(null);
    const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
    const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { data: session } = useSession();

    const handleHotelChange = (hotelName: string | undefined) => {
        if (!hotelName) {
            setSelectedHotel("");
            setRooms([]);
        } else {
            setSelectedHotel(hotelName);
            const hotel = hotels.find((h) => h.name === hotelName);
            setRooms(hotel ? hotel.rooms : []);
        }
    };

    // Sort hotels alphabetically by name
    const sortedHotels = [...hotels].sort((a, b) => a.name.localeCompare(b.name));

    // Sort rooms by room number
    const sortedRooms = [...rooms].sort((a, b) => a.number - b.number);

    const router = useRouter();

    const handleBooking = async () => {
        try {
            if (!selectedRoom) throw new Error("select a room first");
            if (!session) throw new Error("please login first");

            const bookingData = {
                checkInDate,
                checkOutDate,
            };

            const bookingDetails = await createBooking(selectedRoom._id, bookingData, session.user.token);

            const paymentId = bookingDetails.data.payment._id;
            console.log(paymentId);


            router.push(`/checkout/${paymentId}`);

        } catch (error: any) {
            setAlertType("error");
            setErrorMessage(error.message || "An error occurred during booking.");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    return (
        <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <p className="font-Outfit text-2xl font-bold text-center pt-2 pb-4">Create your booking here!</p>
            <div className="bg-white bg-opacity-20 rounded-2xl shadow-md p-6 sm:p-10 space-y-6 justify-center items-center align-middle flex flex-col">

                
                {/* Hotel Selection */}
                <Autocomplete
                    disablePortal
                    options={sortedHotels}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                        setSelectedRoom(null);
                        handleHotelChange(newValue?.name);
                    }}
                    fullWidth
                    renderInput={(params: any) => (
                        <TextField
                            {...params}
                            placeholder="Select Your Hotel"
                            variant="outlined"
                            className="font-roboto text-black bg-slate-50 rounded-xl w-full shadow-sm"
                            InputProps={{
                                ...params.InputProps,
                                className: "h-[85px] flex items-center px-4 rounded-xl",
                                classes: { notchedOutline: "border-none" },
                                startAdornment: <FaHotel className="mr-2 text-black h-[40%] w-[20vh]" />,
                            }}
                        />
                    )}
                    isOptionEqualToValue={(option, value) => option._id === value?._id}
                />

                {/* Room Selection */}
                <Autocomplete
                    disablePortal
                    options={sortedRooms}
                    getOptionLabel={(option) => `Room ${option.number} - ${option.type} - $${option.price}`}
                    value={selectedRoom}
                    onChange={(event, newValue) => setSelectedRoom(newValue)}
                    fullWidth
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Select Your Room"
                            variant="outlined"
                            className="font-roboto text-black bg-slate-50 rounded-xl w-full shadow-sm"
                            InputProps={{
                                ...params.InputProps,
                                className: "h-[85px] flex items-center px-4 rounded-xl",
                                classes: { notchedOutline: "border-none" },
                                startAdornment: <FaBed className="mr-2 text-black h-[40%] w-[20vh]" />,
                            }}
                        />
                    )}
                    isOptionEqualToValue={(option, value) => option._id === value?._id}
                    disabled={rooms.length === 0}
                />

                {/* Date Picker */}
                <div className="w-full">
                    <DateReserve
                        onDateChange={(dates) => {
                            setCheckInDate(dates[0]);
                            setCheckOutDate(dates[1]);
                        }}
                        role={userProfile.data.role}
                    />
                </div>




                <Button
                    onClick={handleBooking}
                    variant="contained"
                    color="primary"
                    className="w-full sm:w-1/2 lg:w-1/4 bg-[#F2814D] hover:bg-[#e27035] text-white px-6 py-3 rounded-lg font-bold shadow-md transition duration-300 ease-in-out"
                >
                    BOOK NOW
                </Button>



                {/* Alerts */}
                {showAlert && alertType === "success" && (
                    <Alert severity="success" className="w-full">
                        Your booking was successful!
                    </Alert>
                )}
                {showAlert && alertType === "error" && (
                    <Alert severity="error" className="w-full">
                        {errorMessage}
                    </Alert>
                )}
            </div>
        </section>
    );
}
