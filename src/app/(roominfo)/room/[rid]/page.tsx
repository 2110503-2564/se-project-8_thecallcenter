import RoomCatalog from "@/components/RoomCatalog";
import getRoom from "@/libs/Room/getRoom";
import Image from "next/image";

export default async function RoomDetailPage({ params }: { params: { rid: string } }) {
    const roomDetail = await getRoom(params.rid);

    let imgSrc = ""
    if (roomDetail.data.type == 'superior') imgSrc = "https://drive.google.com/uc?id=1Brpms2FiUrxjYI3LlVWi2f4I84zhJH4U"
    else if (roomDetail.data.type == 'deluxe') imgSrc = "https://drive.google.com/uc?id=1yEzvJXtgIJ7LPcGFKOxEsP0Lbysi1kdN"
    else if (roomDetail.data.type == 'suite') imgSrc = "https://drive.google.com/uc?id=1UPqmS-xkoAdiZG2oPlZrTyOrtGy6sOGe"
    else imgSrc = "https://drive.google.com/uc?id=1lZvDpg5gaXv-RPhk3MdPKga9YqDeT92d"

    return (
        <main className="text-center p-5 align-middle flex flex-col items-center justify-center">
            <h1 className="text-lg font-bold">Room {roomDetail.data.number}</h1>
            <h1 className="text-md ">{roomDetail.data.hotel.name} Hotel</h1>
           
            <div className="w-full h-auto flex justify-center pt-10">
                <div className="relative w-[500px] h-[350px]">
                    <Image src={imgSrc} alt="Room Image" fill className="object-cover rounded-lg" />
                </div>

            </div>

            <div className="text-md font-bold py-10">Number {roomDetail.data.number} | {roomDetail.data.type} | ${roomDetail.data.price}</div>

        </main>
    );
}
