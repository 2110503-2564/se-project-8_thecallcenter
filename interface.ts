interface BookingItem {
  _id: string,
  checkInDate: string,
  checkOutDate: string,
  room: RoomItem,
  hotel: HotelItem,
  payments: PaymentItem[],
  user: UserItem,
  status: string,

  payments: PaymentItem[];
}

interface PaymentCurrencyAmount {
  amount: number;  
  currency: string;
}

  
interface BookingJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: BookingItem[]
}

interface BookingJsonwithPopulate {
  success: boolean,
  count: number,
  pagination: Object,
  data: BookingWithPopulate
}

interface BookingWithPopulate {
  _id: string,
  checkInDate: string,
  checkOutDate: string,
  room: RoomItem,
  hotel: HotelItem,
  user: UserItem,
  status: string,
  payments: PaymentItemPopulate[],
}

interface UnavailablePeriod {
  startDate: string,
  endDate: string,
  _id: string
}

interface RoomItem {
  _id: string,
  hotel: string,
  type: string,
  number: number,
  price: number,
  unavailablePeriod: UnavailablePeriod[]
}
  
interface RoomJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: RoomItem[]
}

interface HotelItem {
  _id: string,
  name: string,
  address: string,
  tel: string,
  bookings: BookingItem[],
  rooms: RoomItem[],
  picture: string,
  id: string
}
  
interface HotelJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: HotelItem[]
}

interface HotelResponse {
  success: boolean,
  data: HotelItem
}

interface UserItem {
  _id: string
  name: string
  tel: string
  email: string
  role: string
}

interface UsersData {
  success: boolean,
  data: UserItem
}

interface PaymentItem {
  _id: string;
  booking: string; 
  user: string; 
  // @ts-ignore
  amount: number;
  status: string;
  method: string;
  paymentDate?: Date;
  canceledAt?: Date | null;
}

interface PaymentJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: PaymentItem[]
}

interface PaymentItem2 {
  _id: string;
  booking: BookingItemforPayment; 
  user: UserItem; 
  // @ts-ignore
  amount: number;
  status: string;
  method: string;
  paymentDate?: Date;
  canceledAt?: Date | null;
}

interface PaymentItemPopulate {
  _id: string;
  booking: string; 
  amount: number;
  status: string;
  paymentDate?: Date;
}

interface BookingItemforPayment {
  _id: string,
  checkInDate: string,
  checkOutDate: string,
  room: RoomItem,
  hotel: HotelItem, 
  user: UserItem
}

