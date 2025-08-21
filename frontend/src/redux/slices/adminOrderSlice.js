import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}`;
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;
// Async thunk to fetch all orders for admin 
export const fetchAllOrders = createAsyncThunk("adminOrders/fetchAllOrders", async (__DO_NOT_USE__AcationType,{rejectWithValue}) => {
    try {
        const response = await axios.get(`${API_URL}/api/admin/orders`, {
        headers: {
            "Authorization": USER_TOKEN
        }
    });
    return response.data;
    } catch (error) {
        console.error("Failed to fetch all orders:", error);
        return rejectWithValue(error.response.data);
    }
});

//update order delivery status
export const updateOrderDeliveryStatus = createAsyncThunk("adminOrders/updateOrderDeliveryStatus", async({id,status}, { rejectWithValue }) => {
    try {
       
        const response = await axios.put(`${API_URL}/api/admin/orders/${id}`, { status }, {
            headers: {
                "Authorization": USER_TOKEN
            }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to update order delivery status:", error);
        return rejectWithValue(error.response.data);
    }
});
//delete order
export const deleteOrder = createAsyncThunk("adminOrders/deleteOrder", async (id, {
    rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/api/admin/orders/${id}`, {
            headers: {
                "Authorization": USER_TOKEN
            }
        });
        return id;// Return the order ID to remove it from the state
    } catch (error) {
        console.error("Failed to delete order:", error);
        return rejectWithValue(error.response.data);
    }
});

const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState: {
        orders: [],
        totalOrders: 0,
        totalSales: 0,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                
                state.orders = action.payload;
                state.totalOrders = action.payload.length;
                state.totalSales = action.payload.reduce((total, order) => total + order.totalPrice, 0);
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch orders";
            })
            .addCase(updateOrderDeliveryStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })//fulfilled state for updateOrderDeliveryStatus
            .addCase(updateOrderDeliveryStatus.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.orders.findIndex(order => order._id === action.payload._id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            })
            .addCase(updateOrderDeliveryStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to update order delivery status";
            })//pending state for deleteOrder
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                const orderId = action.payload;
                state.orders = state.orders.filter(order => order._id !== orderId);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete order";
            });
    }
});
export default adminOrderSlice.reducer;