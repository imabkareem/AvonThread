import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch checkout data
export const createCheckout = createAsyncThunk(
    'checkout/createCheckout',
    async (checkoutdata, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/checkout`,checkoutdata
                ,{
                    headers: {
                    "Authorization": `Bearer ${localStorage.getItem("userToken")}` // Ensure the token is included in the request headers
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Failed to create checkout:", error);
            return rejectWithValue(error.response.data);
        }
    }
);

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        checkoutData: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCheckout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCheckout.fulfilled, (state, action) => {
                state.loading = false;
                state.checkout = action.payload;
            })
            .addCase(createCheckout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Failed to create checkout";
            });
    }
});

export default checkoutSlice.reducer;