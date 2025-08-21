import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch order data
export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async ( _ , {  rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/orders/my-orders`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("userToken")}` // Ensure the token is included in the request headers
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to fetch order details by ID
export const fetchOrderDetails = createAsyncThunk(
    'orders/fetchOrderDetails',
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/orders/${orderId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("userToken")}` // Ensure the token is included in the request headers
                }
            });
            return response.data;
        } catch (error) {
            console.error("Failed to fetch order details:", error);
            return rejectWithValue(error.response.data);
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        totalOrders: 0,
        loading: false,
        orderDetails: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
            
        })
        .addCase(fetchOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to fetch orders";
        })
        // Handle pending, fulfilled, and rejected states for fetchOrderDetails
        .addCase(fetchOrderDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchOrderDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.orderDetails = action.payload;
        })
        .addCase(fetchOrderDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message || "Failed to fetch order details";
        });
    }
});
export default orderSlice.reducer;