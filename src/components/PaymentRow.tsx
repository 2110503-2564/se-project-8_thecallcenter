"use client";

import { useState } from "react";
import { updatePayment } from "@/libs/Payment/updatePayment";
import { cancelPayment } from "@/libs/Payment/cancelPayment";
import { deletePayment } from "@/libs/Payment/deletePayment";
import { useSession } from "next-auth/react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert, Button, Select, MenuItem } from "@mui/material";

export default function PaymentRow({ payment, booking, onStatusChange, onDelete }: {
  payment: PaymentItem;
  booking: BookingItem;
  onStatusChange: (id: string, newStatus: string) => void;
  onDelete: (id: string) => void;
}) {
  const { data: session } = useSession();
  const [updateOpen, setUpdateOpen] = useState(false);
  const [status, setStatus] = useState(payment.status);
  const [method, setMethod] = useState(payment.method);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleUpdate = async () => {
    try {
      

      const re = await updatePayment(payment._id, { status, method }, session?.user.token);
      console.log(re);
      setSnackbarMessage("Payment updated successfully");
      setSnackbarOpen(true);
      setUpdateOpen(false);
      onStatusChange(payment._id, status);
    } catch (err) {
      setSnackbarMessage("Failed to update payment");
      setSnackbarOpen(true);
    }
  };

  const handleCancel = async () => {
    try {
      await cancelPayment(payment._id, session?.user.token);
      setStatus("canceled");
      setSnackbarMessage("Payment canceled");
      setSnackbarOpen(true);
      onStatusChange(payment._id, "canceled");
    } catch (err) {
      setSnackbarMessage("Failed to cancel payment");
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePayment(payment._id, session?.user.token);
      setSnackbarMessage("Payment deleted");
      setSnackbarOpen(true);
      onDelete(payment._id);
    } catch (err) {
      setSnackbarMessage("Failed to delete payment");
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <tr className="border-t border-gray-200 bg-gray-50">
        <td className="p-3 px-10">{payment.amount ? String(payment.amount) : 'N/A'}</td>
        <td className="p-3 px-10">{payment.method || 'N/A'}</td>
        <td className="p-3 px-10">{payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : 'N/A'}</td>
        <td className="p-3 px-10">
          <span
            className={`rounded-xl p-1 px-2 ${
              status === 'pending' ? 'text-yellow-500 bg-yellow-100' :
              status === 'completed' ? 'text-green-500 bg-green-100' :
              status === 'failed' ? 'text-red-500 bg-red-100' :
              status === 'canceled' ? 'text-red-800 bg-red-100' :
              'text-gray-500 bg-gray-200'
            }`}
          >
            {status}
          </span>
        </td>
        <td className="p-3 px-10">{booking.user.name || 'N/A'}</td>
        <td className="p-3 text-right space-x-2">
          <button onClick={() => setUpdateOpen(true)} className="text-blue-600 font-semibold">Update</button>
          <button onClick={handleCancel} className="text-yellow-600 font-semibold">Cancel</button>
          <button onClick={handleDelete} className="text-red-600 font-semibold">Delete</button>
        </td>
      </tr>

      {/* Update Dialog */}
      <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
        <DialogTitle>Update Payment</DialogTitle>
        <DialogContent>
          <div className="my-4">
            <label className="block mb-1 font-medium">Status:</label>
            <Select fullWidth value={status} onChange={(e) => setStatus(e.target.value)}>
              <MenuItem value="unpaid">Unpaid</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
              <MenuItem value="canceled">Canceled</MenuItem>
            </Select>
          </div>
          <div className="my-4">
            <label className="block mb-1 font-medium">Method:</label>
            <Select fullWidth value={method} onChange={(e) => setMethod(e.target.value)}>
              <MenuItem value="Card">Card</MenuItem>
              <MenuItem value="Bank">Bank</MenuItem>
              <MenuItem value="ThaiQR">ThaiQR</MenuItem>
            </Select>
          </div>
        </DialogContent>


        <DialogActions>
          <Button onClick={() => setUpdateOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">Update</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
