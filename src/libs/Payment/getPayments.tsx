export async function getPayments(token: string | undefined) {
    const response = await fetch("https://hotel-booking-backend-ten.vercel.app/api/v1/payments", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch payments");

    return data;
}