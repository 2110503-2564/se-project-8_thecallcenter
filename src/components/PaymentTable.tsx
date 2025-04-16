import { useState } from 'react';
import PaymentRow from './PaymentRow';

export default function PaymentTable({ bookings }: { bookings: BookingItem[] }) {
  const [minPrice, setMinPrice] = useState<number | string>('');
  const [maxPrice, setMaxPrice] = useState<number | string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [showPriceInputs, setShowPriceInputs] = useState(false);
  const [showDateInputs, setShowDateInputs] = useState(false);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'minPrice') setMinPrice(value);
    if (name === 'maxPrice') setMaxPrice(value);
    if (name === 'startDate') setStartDate(value);
    if (name === 'endDate') setEndDate(value);
    if (name === 'paymentMethod') setPaymentMethod(value);
    if (name === 'status') setStatus(value);
  };

  const filterPayments = (payments: PaymentItem[]) => {
    return payments.filter(payment => {
      const price = payment.amount;
      if ((minPrice && Number(price) < parseFloat(minPrice as string)) || (maxPrice && Number(price) > parseFloat(maxPrice as string))) {
        return false;
      }
      const paymentDate = payment.paymentDate ? new Date(payment.paymentDate) : new Date(0);
      if (startDate && paymentDate < new Date(startDate)) return false;
      if (endDate && paymentDate > new Date(endDate)) return false;
      if (paymentMethod && payment.method !== paymentMethod) return false;
      if (status && payment.status !== status) return false;
      return true;
    });
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg space-y-6">

      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={() => setShowPriceInputs(!showPriceInputs)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          {showPriceInputs ? 'Hide Price Filter' : 'Filter by Price'}
        </button>
        <button
          type="button"
          onClick={() => setShowDateInputs(!showDateInputs)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          {showDateInputs ? 'Hide Date Filter' : 'Filter by Date'}
        </button>
      </div>

      {showPriceInputs && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-600">Price Range</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              name="minPrice"
              value={minPrice}
              onChange={handleFilterChange}
              placeholder="Min Price"
              className="p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="number"
              name="maxPrice"
              value={maxPrice}
              onChange={handleFilterChange}
              placeholder="Max Price"
              className="p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      )}

      {showDateInputs && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-green-600">Date Range</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={handleFilterChange}
              className="p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-green-300"
            />
            <input
              type="date"
              name="endDate"
              value={endDate}
              onChange={handleFilterChange}
              className="p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-green-300"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Payment Method</label>
          <select
            name="paymentMethod"
            value={paymentMethod}
            onChange={handleFilterChange}
            className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-300"
          >
            <option value="">All Methods</option>
            <option value="ThaiQR">ThaiQR</option>
            <option value="Card">Card</option>
            <option value="Bank">Bank</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={status}
            onChange={handleFilterChange}
            className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-300"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto mt-4 border rounded-lg shadow-lg">
        <table className="min-w-full text-sm text-left text-black">
          <thead>
            <tr className="bg-blue-200 text-gray-800">
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium">Method</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">User</th>
              <th className="p-4 w-1 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {bookings.flatMap((bookingItem: any) =>
              filterPayments(bookingItem.payments).map((paymentItem: PaymentItem) => (
                <PaymentRow 
                payment={paymentItem}
                booking={bookingItem}
                onStatusChange={(id, newStatus) => {/* อัปเดต state */}}
                onDelete={(id) => {/* ลบออกจากตาราง */}}
              />

              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
