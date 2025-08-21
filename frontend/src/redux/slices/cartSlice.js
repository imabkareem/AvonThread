import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";


//Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { products: [] }; 
};
//Helper function to save cart to localStorage
const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch cart for a user or guest

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async ({userId,guestId}, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/cart`,{
                params: { userId, guestId }
            });
            return response.data;
        } catch (error) {
            console.error("Failed to fetch cart:", error);
            return rejectWithValue(error.response.data);
        }
    }
);

// Add an item to the cart for user or guest
export const addItemToCart = createAsyncThunk(
    "cart/addItemToCart",
    async ({ userId, guestId, productId, size, quantity, color }, { rejectWithValue }) => {
        console.log(userId)
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/cart`, {
                productId,
                size,
                color,
                quantity,
                userId,
                guestId

            });
            return response.data;
        } catch (error) {
            console.error("Failed to add item to cart:", error);
            return rejectWithValue(error.response.data);
        }
    }
);

// Update an item quantity from the cart for user or guest
export const updateItemQuantityInCart = createAsyncThunk(
    "cart/updateItemQuantityInCart",
    async ({ userId, guestId, productId, quantity,size,color }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_API_URL}/api/cart`, {
                quantity,
                userId,
                guestId,
                productId,
                size,
                color
            });
            return response.data;
        } catch (error) {
            console.error("Failed to update item in cart:", error);
            return rejectWithValue(error.response.data);
        }
    }
);

// Remove an item from the cart for user or guest

export const removeItemFromCart = createAsyncThunk(
    "cart/removeItemFromCart",
    async ({ userId, guestId, productId,size,color}, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API_URL}/api/cart`, {
                data: { userId, guestId, productId, size, color }
            });
            return response.data;
        } catch (error) {
            console.error("Failed to remove item from cart:", error);
            return rejectWithValue(error.response.data);
        }
    }
);

// Merge guest cart with user cart
export const mergeGuestCartWithUser = createAsyncThunk(
    "cart/mergeGuestCartWithUser",
    async ({ userId, guestId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/cart/merge`, {
                userId,
                guestId
            },
            {
                headers: {
                   "Authorization": `Bearer ${localStorage.getItem("userToken")}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Failed to merge guest cart with user:", error);
            return rejectWithValue(error.response.data);
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromLocalStorage(),
        loading: false,
        error: null
    },
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [] };
            saveCartToLocalStorage(state.cart);
        }
    },
    extraReducers: (builder) => {
        builder//pending state for fetchCart
        .addCase(fetchCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })//fulfilled state for fetchCart
        .addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToLocalStorage(state.cart);
        })//rejected state for fetchCart
        .addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch cart";
        })
        //added item to cart
        .addCase(addItemToCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addItemToCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToLocalStorage(state.cart);
        })
        .addCase(addItemToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to add item to cart";
        })
        //updated item in cart
        .addCase(updateItemQuantityInCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        }
        )
        .addCase(updateItemQuantityInCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToLocalStorage(state.cart);
        })
        .addCase(updateItemQuantityInCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to update item in cart";
        })
        //removed item from cart
        .addCase(removeItemFromCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(removeItemFromCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload.cart;
             state.message = action.payload?.message;
            saveCartToLocalStorage(state.cart);

            if (action.payload.message) {
                toast.success(action.payload.message);
            }
        })
        .addCase(removeItemFromCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to remove item from cart";
            toast.error(state.error);
        })
        //merged guest cart with user
        .addCase(mergeGuestCartWithUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(mergeGuestCartWithUser.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToLocalStorage(state.cart);
        })
        .addCase(mergeGuestCartWithUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to merge guest cart with user";
        });
    }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;