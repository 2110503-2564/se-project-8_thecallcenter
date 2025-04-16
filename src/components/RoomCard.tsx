"use client"
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';

export default function Card ( { roomItem } : { roomItem:RoomItem } ) {

    let imgSrc=""
    if (roomItem.type=='superior') imgSrc="https://drive.google.com/uc?id=1Brpms2FiUrxjYI3LlVWi2f4I84zhJH4U"
    else if (roomItem.type=='deluxe') imgSrc="https://drive.google.com/uc?id=1yEzvJXtgIJ7LPcGFKOxEsP0Lbysi1kdN"
    else if (roomItem.type=='suite') imgSrc="https://drive.google.com/uc?id=1UPqmS-xkoAdiZG2oPlZrTyOrtGy6sOGe"
    else imgSrc="https://drive.google.com/uc?id=1lZvDpg5gaXv-RPhk3MdPKga9YqDeT92d"
    console.log(imgSrc)

    return (
        <InteractiveCard className={ roomItem.number.toString() }>
            { <div className='w-full h-[180px] relative rounded-t-lg'>
                <Image src={imgSrc}
                alt='Card'
                fill={true}
                className='object-cover rounded-t-lg'
                />
            </div> }
            <div className='w-full h-[100px] text-center text-black bg-white rounded-b-lg p-3 shadow-md'>
                <div className='font-bold'>Number {roomItem.number}</div>
                <div>{roomItem.type}</div>
                <div className='font-bold'>${roomItem.price}</div>
            </div>
        </InteractiveCard>
    );
}