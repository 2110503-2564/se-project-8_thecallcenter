import getHotels from "@/libs/Hotel/getHotels";
import { Suspense } from "react";
import HotelCatalog from "@/components/HotelCatalog";
import { LinearProgress } from "@mui/material";
import HeroSection from "@/components/HeroSection";

export default function hotel() {

const hotels = getHotels()

    return (
        <div className="h-[1200px] min-h-screen">
            
            <HeroSection
                    title={
                      <>
                        Explore <br /> Your Stay
                      </>
                    }
                    description="The most seamless and secure way to book unique hotel experiences around the world."
                    imageSrc="/assets/room.png"
                  />
            <div className="col-span-12 text-center font-serif mt-4 text-8xl text-white md:text-7xl font-Outfit font-bold leading-tight">
                
            </div>
            {/* <div className="col-span-12 text-center font-serif text-2xl mt-4">Explore Stay</div> */}
            <div className="col-span-12">
            <Suspense fallback={ <p className="text-center font-roboto font-semibold text-base">Loading...<LinearProgress/></p> }>
                <HotelCatalog  hotelsJson={hotels}/>
            </Suspense>
            </div>
        </div>
    );
}