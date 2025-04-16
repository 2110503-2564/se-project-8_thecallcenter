import RoomCatalog from "./RoomCatalog";
import Image from "next/image";
import HotelCard from "./HotelCard";

export default async function HotelPage({ hotelDetail }: { hotelDetail: Promise<HotelResponse> }) {

    const hotel = (await hotelDetail).data;

    return (
        <div className="container mx-auto p-6">
            {/* <h1 className="text-2xl font-semibold text-center mb-6">{hotel.name}</h1> */}

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative w-full md:w-1/3 h-[20vh] md:h-auto rounded-lg overflow-hidden shadow-lg">
                    <HotelCard
                        hotelName={""}
                        address={""}
                        imgSrc={hotel.picture || "/img/hotel.jpg"}
                    />
                </div>

                <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-lg text-black space-y-2 text-left">
                        <p className="font-outfit font-medium text-left text-8xl">{hotel.name}</p>
                        <p className="font-medium text-slate-700">Address : {hotel.address}</p>
                        <p className="font-medium text-slate-700">Tel : {hotel.tel}</p>
                    </div>
                    <div className="relative w-full h-[21vh] rounded-lg overflow-hidden shadow-lg mt-4">
                        <Image
                            src="/img/Map.jpg"
                            alt="Map image"
                            fill
                            className="object-cover rounded-lg"
                            priority
                        />
                    </div>

                </div>

            </div>

            <div className="mt-12">
                <RoomCatalog rooms={hotel.rooms} />
            </div>
        </div>
    );
}
