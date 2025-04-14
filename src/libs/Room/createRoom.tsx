import BACKEND_URL from "../config";

export default async function createRoom(roomData: object) {
    
    const response = await fetch(`${BACKEND_URL}/api/v1/hotels`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(roomData),
    });

    if (!response.ok) {
        return new Error("Failed to create room");
    }

    return await response.json();
    
}
