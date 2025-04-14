"use client";

import { useEffect, useState } from "react";
import getUserProfile from "@/libs/Auth/getUserProfile";
import { getPayments } from "@/libs/Payment/getPayments";
import PaymentCard from "@/components/PaymentCard";
import { useSession } from "next-auth/react";

export default function Payment() {
    const { data: session } = useSession();
    const [payments, setPayments] = useState<PaymentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserItem | null>(null);

    useEffect(() => {
        async function fetchData() {
            if (!session?.user?.token) return;
            
            const profile = await getUserProfile(session.user.token);
            setUserProfile(profile.data);

            const paymentJson: PaymentJson = await getPayments(session.user.token);
            setPayments(paymentJson.data);
            setLoading(false);
        }

        fetchData();
    }, []);

    // Callback function to update payment status in the state
    const handlePaymentUpdate = (paymentId: string, newStatus: string) => {
        setPayments((prevPayments) =>
            prevPayments.map((payment) =>
                payment._id === paymentId ? { ...payment, status: newStatus } : payment
            )
        );
    };

    const handleDeletePayment = (paymentId: string) => {
        setPayments((prevPayments) => prevPayments.filter((payment) => payment._id !== paymentId));
    };    

    if (loading) return <p className="text-center text-gray-500">Loading payments...</p>;

    return (
        <main className="w-full min-h-screen flex flex-col items-center">
            <div className="max-w-4xl w-full p-8 rounded-lg">
                
                {userProfile?.role === "admin" ? (
                    <h1 className="text-3xl font-semibold text-center text-white mb-6">All Payments</h1>
                ) : (
                    <h1 className="text-3xl font-semibold text-center text-white mb-6">My Payments</h1>
                )}

                {payments.length > 0 ? (
                    <div>
                        {payments.map((paymentItem) => (
                            <PaymentCard 
                                key={paymentItem._id} 
                                paymentData={paymentItem} 
                                onStatusChange={handlePaymentUpdate}
                                onDelete={handleDeletePayment} 
                                role={userProfile?.role || 'user'}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No payments found.</p>
                )}
            </div>
        </main>
    );
}
