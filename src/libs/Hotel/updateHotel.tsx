import BACKEND_URL from "../config";

export default async function updateHotel(id: string, hotelData: object, token: string | undefined) {
    
    const response = await fetch(`${BACKEND_URL}/api/v1/hotels/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(hotelData),
    });

    if (!response.ok) {
        return new Error("Failed to update hotel");
    }

    return await response.json();
    
}
