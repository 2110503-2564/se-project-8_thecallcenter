import Button from "./Button";
export default function Hero() {
    return (
        <section className="grid grid-cols-12 gap-[15px] w-[1065px] mx-auto pt-32 pb-36 bg-[#000235]">
        {/* Left content */}
        <div className="col-span-12 md:col-span-6 space-y-6">
          <h1 className="text-8xl text-white md:text-7xl font-Outfit font-bold leading-tight">
            Find And <br /> Book Your <br /> Perfect Stay
          </h1>
          <p className="text-lg text-white font-roboto font-weight-600 pt-7">
            The most seamless and secure way to book unique hotel experiences around the world.
          </p>
                  {/* Button row with 5/12 width */}
        <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-9 flex space-x-8 pt-3">
            <Button variant="primary">BOOK NOW</Button>
            <Button variant="black-outline">VIEW STAYS</Button>
          </div>
        </div>
          
          {/* button */}
          {/* <div className="col-span-12 md:col-span-4 flex space-x-4">
            <button className="bg-orange-400 text-white rounded-md y-2 px-6">Book Now</button>
            <button className="border text-white border-white py-2 px-6 rounded-md">View Stays</button>
            </div> */}
        </div>

  
        {/* Right image */}
        <div className="col-span-12 md:col-span-6 flex justify-center">
          <img src="/assets/hero-graphic.png" alt="Hero Graphic" className="w-auto h-auto" />
        </div>
      </section>
    );
  }
  