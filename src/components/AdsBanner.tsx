'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from './Button';
import InteractiveButton from './InteractiveButton';
import { motion, AnimatePresence } from 'framer-motion';
import randomBanners from '@/libs/Ads/randomBanners';
import SlideArrowButton from './SlideArrowButton';
import Loader from './Loader';


export default function AdsBanner() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0); 
    const [hotelsBanner, setHotelsBanner] = useState<HotelItem[]>([]);
    const [loading, setLoading] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const hasFetchedRef = useRef(false);

    const startInterval = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setDirection(1);
            setIndex((prevIndex) => (prevIndex + 1) % 5);
        }, 5000);
    };

    const handleLeftClick = () => {
        setDirection(-1);
        setIndex((prevIndex) => (prevIndex + 4) % 5);
        startInterval();
    };

    const handleRightClick = () => {
        setDirection(1);
        setIndex((prevIndex) => (prevIndex + 1) % 5);
        startInterval();
    };

    useEffect(() => {
        const fetchHotels = async () => {
            if (hasFetchedRef.current) return;
            hasFetchedRef.current = true;
            
            const hotelBannerJson = await randomBanners();
            setHotelsBanner(hotelBannerJson.data);
        };
    
        fetchHotels();
        startInterval();
    
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <div> {        
            hotelsBanner[index] === undefined ? 
                <div className="pt-16">
                    <Loader />
                </div>
            :
            <div className="flex flex-col justify-center items-center text-black mb-20">  
                <div className="relative w-screen h-[600px] rounded-lg overflow-hidden shadow-lg">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={hotelsBanner[index]._id}
                            custom={direction}
                            initial={{ x: direction > 0 ? 1100 : -1100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: direction > 0 ? -1100 : 1100, opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0"
                        >
                            {hotelsBanner[index]?.picture && (
                                <div className="relative w-full h-full">
                                    <Image
                                    src={hotelsBanner[index].picture}
                                    alt="Hotel cover"
                                    fill
                                    priority
                                    onLoad={() => setLoading(false)}
                                    className={`object-cover transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
                                    />

                                    {loading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
                                        <span className="text-gray-600 text-lg">
                                        Hotel Image Loading...
                                        </span>
                                    </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    <div className="absolute top-1/2 left-5 -translate-y-1/2 z-10 opacity-70">
                        <SlideArrowButton direction="left" onClick={handleLeftClick} variant="primary"/>
                    </div>

                    <div className="absolute top-1/2 right-5 -translate-y-1/2 z-10 opacity-70">
                        <SlideArrowButton direction="right" onClick={handleRightClick} variant="primary"/>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-5 px-10 bg-gradient-to-r from-transparent to-white text-right z-10">
                        <h2 className="text-3xl font-bold">{hotelsBanner[index]?.name}</h2>
                        <h4 className="text-xl font-bold">{hotelsBanner[index]?.address}</h4>
                        <h4 className="text-xl font-bold">Tel: {hotelsBanner[index]?.tel}</h4>
                        <div className="mt-5">
                            <InteractiveButton>
                                <Button href={`/hotel/${hotelsBanner[index]?._id}`} variant="primary">VIEW MORE</Button>
                            </InteractiveButton>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}
