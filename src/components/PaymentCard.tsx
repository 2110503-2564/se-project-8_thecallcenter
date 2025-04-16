import { useState } from "react";
import dayjs from "dayjs";
import { updatePayment } from "@/libs/Payment/updatePayment";
import { cancelPayment } from "@/libs/Payment/cancelPayment";
import { deletePayment } from "@/libs/Payment/deletePayment";
import { useSession } from "next-auth/react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert, Select, MenuItem} from "@mui/material";

export default function PaymentCard({ paymentData, onStatusChange, role, onDelete }: { paymentData: PaymentItem; onStatusChange: (id: string, newStatus: string) => void; role: string; onDelete: (paymentId: string) => void; }) {
    const [cancelOpen, setCancelOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const { data: session } = useSession();

    const [amount, setAmount] = useState(Number(paymentData.amount));
    const [updateAmount, setUpdateAmount] = useState<number | undefined>(undefined);
    const [status, setStatus] = useState(paymentData.status);
    const [updateStatus, setUpdateStatus] = useState<string | undefined>(paymentData.status);
    const [method, setMethod] = useState(paymentData.method);
    const [updateMethod, setUpdateMethod] = useState<string | undefined>(paymentData.method);

    const isAdmin = role === "admin";

    const handlePay = async () => {
        try {
            await updatePayment(paymentData._id, { status: "pending" }, session?.user.token);
            setStatus("pending");
            onStatusChange(paymentData._id, "pending"); // Notify the parent
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
            if (status) onStatusChange(paymentData._id, status); // Notify the parent   
    
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
    

    const handleCancelConfirm = async () => {
        try {
            await cancelPayment(paymentData._id, session?.user.token);
            setStatus("canceled");
            onStatusChange(paymentData._id, "canceled"); // Notify the parent
            setSnackbarMessage("Payment has been canceled.");
            setSnackbarOpen(true);
            setCancelOpen(false);
        } catch (error) {
            setSnackbarMessage(error instanceof Error ? error.message : "Failed to cancel payment.");
            setSnackbarOpen(true);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await deletePayment(paymentData._id, session?.user.token); // Call API function
    
            onDelete(paymentData._id);

            setSnackbarMessage("Payment deleted successfully.");
            setSnackbarOpen(true);
            setDeleteOpen(false); // Close dialog
        } catch (error) {
            setSnackbarMessage(error instanceof Error ? error.message : "Failed to delete payment.");
            setSnackbarOpen(true);
        }
    };    

    return (
        <div>
            <div className="flex flex-col text-black bg-white p-6 rounded-xl shadow-lg my-5 relative z-10">
                <p><span className="font-semibold">Amount: </span> {amount}</p>
                <p><span className="font-semibold">Method: </span> {method}</p>
                <p><span className="font-semibold">Status: </span> 
                    <span className={`px-2 py-1 rounded-md ${ 
                        status === "pending" ? "bg-yellow-200 text-yellow-700" :
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
                        variant="contained" 
                        color="success" 
                        onClick={handlePay} 
                        disabled={status !== "unpaid"}
                    >
                        {status !== "unpaid" ? "Paid" : "Pay"}
                    </Button>
                    
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => setUpdateOpen(true)}
                    >
                        Update
                    </Button>

                    <Button 
                        variant="contained" 
                        color="warning" 
                        onClick={() => setCancelOpen(true)}
                        disabled={status === "canceled" || status === "failed"}
                    >
                        Cancel
                    </Button>

                    <Button 
                        variant="contained" 
                        color="error" 
                        onClick={() => setDeleteOpen(true)}
                    >
                        Delete
                    </Button>
                </div>
            </div>

            { /* Cancel Dialog */ }
            <Dialog open={cancelOpen} onClose={() => setCancelOpen(false)}>
                <DialogTitle>Are you sure you want to cancel this payment?</DialogTitle>
                <DialogContent>
                    <DialogContentText>Canceling a payment cannot be undone.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCancelOpen(false)} color="primary">Back</Button>
                    <Button onClick={handleCancelConfirm} color="error" autoFocus>Confirm Cancel</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
                <DialogTitle>Are you sure you want to delete this payment?</DialogTitle>
                <DialogContent>
                    <DialogContentText>Deleting a payment is permanent and cannot be undone.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteOpen(false)} color="primary">Back</Button>
                    <Button onClick={handleDeleteConfirm} color="error" autoFocus>Confirm Delete</Button>
                </DialogActions>
            </Dialog>

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

                    {/* Payment Method */}
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
