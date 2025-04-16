import Button from "./Button";
import InteractiveButton from "./InteractiveButton";
export default function Hero() {
    return (
        <section className="grid grid-cols-12 gap-[15px] w-[1065px] mx-auto pt-32 pb-28">
        {/* Left content */}
        <div className="col-span-12 md:col-span-6 space-y-6">
          <h1 className="text-8xl  md:text-7xl font-Outfit font-bold leading-tight">
            Find And <br /> Book Your <br /> Perfect Stay
          </h1>
          <p className="text-lg  font-roboto font-weight-600 pt-7">
            The most seamless and secure way to book unique hotel experiences around the world.
          </p>
                  {/* Button row with 5/12 width */}
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-9 flex space-x-8 pt-3">
              <InteractiveButton>
                  <Button href="/booking" variant="primary">BOOK NOW</Button>
              </InteractiveButton>
              <InteractiveButton>
              <Button href="/hotel" variant="black-outline-light">VIEW STAYS</Button>
              </InteractiveButton>
              
            </div>
          </div>
        </div>

  
        {/* Right image */}
        <div className="col-span-12 md:col-span-6 flex justify-center">
          <img src="/assets/hero-graphic.png" alt="Hero Graphic" className="w-[100vh]] h-[60vh]" />
        </div>
      </section>
    );
  }
  