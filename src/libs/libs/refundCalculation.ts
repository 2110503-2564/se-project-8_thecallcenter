import { Session } from "inspector/promises";
import getBooking from "../Booking/getBooking";
import { getPayment } from "../Payment/getPayment";

export async function refundCalculation(
    bookingData : BookingItem,
    token : string
  ){
    const CheckInDate = new Date(bookingData.checkInDate)
    const CheckOutDate = new Date(bookingData.checkOutDate)
    const CancellationDate = new Date(); // current time

    const bookingJson:BookingJsonwithPopulate = await getBooking(bookingData._id, token)
    const paymentAmount = bookingJson.data.payments[0].amount

    const dayMs = 24 * 60 * 60 * 1000; // milliseconds in a day
  
    let refundPercent = 0; // Default refund percent
  
    if (CancellationDate < CheckInDate) {

      // Cancel before check-in date
      if (CheckInDate.getTime() - CancellationDate.getTime() > 3 * dayMs) {
        refundPercent = 0.9;
      } else {
        refundPercent = 0.5;
      }

    } else if (CancellationDate > CheckOutDate) {
      // Cancel after check-out date
      refundPercent = 0.0;

    } else {
      // Cancel between check-in and check-out
      const bookingDuration = CheckOutDate.getTime() - CheckInDate.getTime();
      const stayDuration = CancellationDate.getTime() - CheckInDate.getTime();
  
      if (bookingDuration === 1 * dayMs) {
        refundPercent = 0.0;

      } else if (bookingDuration === 2 * dayMs) {
        refundPercent = stayDuration < 1 * dayMs ? 0.25 : 0.0;

      } else if (bookingDuration === 3 * dayMs) {

        if (stayDuration < 1 * dayMs) {
          refundPercent = 0.365;
          
        } else if (stayDuration < 2 * dayMs) {
          refundPercent = 0.12;

        } else {
          refundPercent = 0.0;

        }
      }
    }
  
    console.log("Refund percent =", refundPercent * 100, "%");
    return refundPercent * paymentAmount;
  }
  