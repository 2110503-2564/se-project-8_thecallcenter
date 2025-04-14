import BACKEND_URL from "../config";

export default async function createHotel(hotelData: object) {
    
    const response = await fetch(`${BACKEND_URL}/api/v1/hotels`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(hotelData),
    });

    if (!response.ok) {
        return new Error("Failed to create hotel");
    }

    return await response.json();
    
}
