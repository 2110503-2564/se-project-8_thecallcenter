import RoomCard from "./RoomCard";
import Link from "next/link";

export default function RoomCatalog({ rooms }: { rooms: RoomItem[] }) {
    const sortedRooms = Array.isArray(rooms)
        ? [...rooms].sort((a, b) => a.number - b.number)
        : [];

    return (
        <div className="grid gap-6 
                        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {sortedRooms.length > 0 ? (
                sortedRooms.map((roomItem: RoomItem) => (
                    <Link
                        href={`/room/${roomItem._id}`}
                        key={roomItem._id}
                        className="block transition-transform hover:scale-[1.02]"
                    >
                        <RoomCard roomItem={roomItem} />
                    </Link>
                ))
            ) : (
                <p className="text-gray-500 text-center w-full py-4 col-span-full">
                    No rooms available.
                </p>
            )}
        </div>
    );
}
