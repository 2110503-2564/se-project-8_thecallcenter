import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import CheckoutCard from "@/components/Checkout";
import { getPayment } from "@/libs/Payment/getPayment";

export default async function Checkout({ params }: { params: { bid: string } }) {

    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const profile = await getUserProfile(session.user.token);

    const payment = await getPayment(params.bid, session.user.token);
    
    console.log(payment.data);

    return (
        <main >
            <CheckoutCard paymentData={payment.data} />
        </main>
    );
}