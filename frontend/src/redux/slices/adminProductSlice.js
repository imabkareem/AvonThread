import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}`
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`

// Async thunk to fetch all products
export const fetchAllProducts = createAsyncThunk("admin/fetchAllProducts", async () =>{
    const response = await axios.get(`${API_URL}/api/admin/products`, {
        headers: {
            Authorization: USER_TOKEN
        }
    })
    return response.data;
});

// Async thunk to add a new product

export const addProduct = createAsyncThunk("admin/addProduct", async (productData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/api/products`, productData, {
            headers: {
                Authorization: USER_TOKEN
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Async thunk to update product details
export const updateProduct = createAsyncThunk("admin/updateProduct", async ({id,productData}, { rejectWithValue}) => {
    try {
        const response = await axios.put(`${API_URL}/api/products/${id}`,productData, {
            headers: {
                Authorization: USER_TOKEN
            }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to update product:", error);
        return rejectWithValue(error.response.data);
    }
});

// Async thunk to delete a product

export const deleteProduct = createAsyncThunk("admin/deleteProduct", async (id, { rejectWithValue }) => {
    try {
        console.log(id)
        const response = await axios.delete(`${API_URL}/api/products/${id}`, {
            headers: {
                Authorization: USER_TOKEN
            }
        });
        return {id, message: response.data.message};
    } catch (error) {
        console.error("Failed to delete product:", error);
        return rejectWithValue(error.response.data.message);
    }
});

const adminProductSlice = createSlice({
    name: 'adminProducts',
    initialState: {
        products: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products.push(action.payload.product);
        })
        .addCase(addProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to add product";
        })
        .addCase(fetchAllProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(fetchAllProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to fetch products";
        })
        .addCase(deleteProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.message;
            state.products = state.products.filter(product => product._id !== action.payload.id);
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to delete product";
        })
        .addCase(updateProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.products.findIndex(product => product._id === action.payload.id);
            state.products[index] = action.payload;
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to update product";
        })
    }
});

export default adminProductSlice.reducer;

