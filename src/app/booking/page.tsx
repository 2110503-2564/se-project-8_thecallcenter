import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import getHotels from "@/libs/Hotel/getHotels";
import BookingForm from "@/components/BookingForm";
import HeroSection from "@/components/HeroSection";

export default async function Booking() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const profile = await getUserProfile(session.user.token);
  const hotelJson: HotelJson = await getHotels();

  return (
    <main className="h-auto min-h-screen">
      <HeroSection
        title={
          <>
            Booking <br /> Your Stay
          </>
        }
        description="The most seamless and secure way to book unique hotel experiences around the world."
        imageSrc="/assets/room.png"
      />
      {/* <BookingHero /> */}
      <BookingForm hotels={hotelJson.data} userProfile={profile} />
    </main>
  );
}
