"use client"

import { useState } from "react";
import dayjs from "dayjs";
import { updatePayment } from "@/libs/Payment/updatePayment";
import { useSession } from "next-auth/react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert, Select, MenuItem } from "@mui/material";
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";

export default function PaymentCard({ 
    paymentData, 
    handlePaymentUpdate, 
    onDelete,
}: { 
    paymentData: PaymentItem; 
    handlePaymentUpdate: (paymentId: string, updatedData: object) => void,
    onDelete: (paymentId: string) => void; 
}) {
    const [cancelOpen, setCancelOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const { data: session } = useSession();

    const [amount, setAmount] = useState(Number(paymentData.amount));
    const [updateAmount, setUpdateAmount] = useState<number | undefined>(undefined);
    const [status, setStatus] = useState(paymentData.status);
    const [updateStatus, setUpdateStatus] = useState<string | undefined>(paymentData.status);
    const [method, setMethod] = useState(paymentData.method);
    const [updateMethod, setUpdateMethod] = useState<string | undefined>(paymentData.method);

    const handlePay = async () => {
        try {
            handlePaymentUpdate(paymentData._id, { status: "pending" });
            setStatus("pending");
            handlePaymentUpdate(paymentData._id, { status: status }); 
            setSnackbarMessage("Payment is now pending.");
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage(error instanceof Error ? error.message : "Failed to update payment.");
            setSnackbarOpen(true);
        }
    };

    const handleUpdate = async (status: string | undefined, method: string | undefined, amount: number | undefined) => {
        try {
            const updatedData: any = {};
            if (status) updatedData.status = status;
            if (method) updatedData.method = method;
            if (amount) updatedData.amount = amount;

            await updatePayment(paymentData._id, updatedData, session?.user.token);

            if (status) setStatus(status);
            if (method) setMethod(method);
            if (amount) setAmount(amount);

            setSnackbarMessage("Payment updated successfully.");
            setSnackbarOpen(true);
            setUpdateOpen(false);
        } catch (error) {
            setSnackbarMessage(error instanceof Error ? error.message : "Failed to update payment details.");
            setSnackbarOpen(true);
        }
    };

    const handleDeletePayment = async () => {
        try {

            Swal.fire({
                title: "Confirm?",
                text: "Are you sure to delete this payment?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then( async (result) => {
                if(result.isConfirmed) {
                    onDelete(paymentData._id)
                }
            })

        } catch (error) {
            setSnackbarMessage(error instanceof Error ? error.message : "Failed to delete payment.");
            Swal.fire({
                title: "Error!",
                text: "Sorry, failed to delete this payment!",
                icon: "error"
            })
        }
    };

    const router = useRouter();

    const handleBooking = async () => {
        try {

            console.log("check1");
            router.push(`/checkout/${paymentData._id}`);


        } catch (error: any) {
            Swal.fire({
                title: "Error!",
                text: "Sorry, unable to update this payment!",
                icon: "error"
            })
        }
    };

    return (
        <div>
            <div className="flex flex-col text-black bg-white p-6 rounded-xl shadow-lg my-5 relative z-10">
                <p><span className="font-semibold">Amount: </span> {amount}</p>
                <p><span className="font-semibold">Method: </span> {method}</p>
                <p><span className="font-semibold">Status: </span>
                    <span className={`px-2 py-1 rounded-md ${status === "pending" ? "bg-yellow-200 text-yellow-700" :
                            status === "completed" ? "bg-green-200 text-green-700" :
                                status === "failed" ? "bg-red-200 text-red-700" :
                                    status === "canceled" ? "bg-red-200 text-red-700" :
                                        "bg-gray-200 text-gray-700"}`}>
                        {status}
                    </span>
                </p>
                <p><span className="font-semibold">Payment Date: </span> {dayjs(paymentData.paymentDate).format("MMMM D, YYYY")}</p>

                <div className="absolute top-6 right-6 flex space-x-3">

                    <Button
                        onClick={handleBooking}
                        variant="contained"

                        color="success"
                        disabled={status !== "unpaid"}
                        className="w-full sm:w-1/2 lg:w-1/4 bg-[#F2814D] hover:bg-[#e27035] text-white px-6 py-3 rounded-lg font-bold shadow-md transition duration-300 ease-in-out"
                    >
                        {status !== "unpaid" ? "Paid" : "Pay"}
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeletePayment()}
                    >
                        Delete
                    </Button>
                </div>
            </div>

           
            <Dialog open={cancelOpen} onClose={() => setCancelOpen(false)}>
                <DialogTitle>Are you sure you want to cancel this payment?</DialogTitle>
                <DialogContent>
                    <DialogContentText>Canceling a payment cannot be undone.</DialogContentText>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={() => setCancelOpen(false)} color="primary">Back</Button>
                    <Button onClick={handleCancelConfirm} color="error" autoFocus>Confirm Cancel</Button>
                </DialogActions> */}
            </Dialog>

            {/* Delete Dialog */}
            {/* <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
                <DialogTitle>Are you sure you want to delete this payment?</DialogTitle>
                <DialogContent>
                    <DialogContentText>Deleting a payment is permanent and cannot be undone.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteOpen(false)} color="primary">Back</Button>
                    <Button onClick={handleDeleteConfirm} color="error" autoFocus>Confirm Delete</Button>
                </DialogActions>
            </Dialog> */}

            {/* Update Status Dialog */}
            <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
                <DialogTitle>Update Payment</DialogTitle>
                <DialogContent>
                    {/* Amount */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount:</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={updateAmount ?? ""}
                                onChange={(e) => setUpdateAmount(Number(e.target.value))}
                                placeholder="Enter new amount"
                            />
                            <button
                                onClick={() => setUpdateAmount(undefined)}
                                className="text-gray-500 hover:text-black font-semibold text-lg px-2"
                                aria-label="Clear"
                            >
                                ×
                            </button>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status:</label>
                        <div className="flex items-center gap-2">
                            <Select
                                fullWidth
                                value={updateStatus ?? ""}
                                onChange={(e) =>
                                    setUpdateStatus(e.target.value === "" ? undefined : e.target.value)
                                }
                                displayEmpty
                            >
                                <MenuItem value="unpaid">Unpaid</MenuItem>
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="completed">Completed</MenuItem>
                                <MenuItem value="failed">Failed</MenuItem>
                            </Select>
                            <button
                                onClick={() => setUpdateStatus(undefined)}
                                className="text-gray-500 hover:text-black font-semibold text-lg px-2"
                                aria-label="Clear"
                            >
                                ×
                            </button>
                        </div>
                    </div>

                   
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method:</label>
                        <div className="flex items-center gap-2">
                            <Select
                                fullWidth
                                value={updateMethod ?? ""}
                                onChange={(e) =>
                                    setUpdateMethod(e.target.value === "" ? undefined : e.target.value)
                                }
                                displayEmpty
                            >
                                <MenuItem value="Card">Card</MenuItem>
                                <MenuItem value="Bank">Bank</MenuItem>
                                <MenuItem value="ThaiQR">ThaiQR</MenuItem>
                            </Select>
                            <button
                                onClick={() => setUpdateMethod(undefined)}
                                className="text-gray-500 hover:text-black font-semibold text-lg px-2"
                                aria-label="Clear"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions className="px-6 pb-4">
                    <Button onClick={() => setUpdateOpen(false)} color="secondary" className="mr-2">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleUpdate(updateStatus, updateMethod, updateAmount)}
                        color="primary"
                        variant="contained"
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar Alert */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}
