import axiosClient from "@/lib/axiosClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// تعريف نوع البيانات للعنصر في العربة بناءً على الـ API
export interface CartItem {
  id: number;
  image: string;
  name: string;
  supplier: string;
  price: string;
  discount_price: string;
  color: string;
  quantity: number;
}

interface CartState {
  isOpen: boolean;
  items: CartItem[];
  order_summary: {
    subtotal: number;
    shipping: string;
    total: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  isOpen: false,
  items: [],
  order_summary: {
    subtotal: 0,
    shipping: "",
    total: 0,
  },
  loading: false,
  error: null,
};

// جلب بيانات العربة
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await axiosClient();
  const res = await response.get("/cart");
  return res?.data;
});

// إضافة عنصر للعربة
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    {
      product_id,
      product_variation_id,
      quantity = 1,
    }: {
      product_id: number;
      product_variation_id?: number;
      quantity?: number;
    },
    { dispatch }
  ) => {
    const res = await axiosClient();
    const response = await res.post("/cart", {
      product_id,
      product_variation_id,
      quantity,
    });
    // بعد النجاح، جلب الداتا الجديدة
    await dispatch(fetchCart());
    return response.data;
  }
);

// تحديث الكمية
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ id, quantity }: { id: number; quantity: number }, { dispatch }) => {
    const res = await axiosClient();
    const response = await res.patch(`/cart/${id}`, { quantity });
    // بعد النجاح، جلب الداتا الجديدة
    await dispatch(fetchCart());
    return response.data;
  }
);

// حذف عنصر أو تفريغ العربة
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  // @ts-ignore
  async (item_id?: number, { dispatch }) => {
    const config = item_id ? { data: { item_id } } : {};
    const res = await axiosClient();
    await res.delete("/cart", config);
    // بعد النجاح، جلب الداتا الجديدة
    await dispatch(fetchCart());
    return item_id ? { id: item_id } : { clearAll: true };
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
  extraReducers: (builder) => {
    // جلب العربة
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.data; // العناصر في data
      state.order_summary = action.payload.order_summary; // الـ order_summary مباشرة
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch cart";
    });

    // إضافة عنصر
    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addToCart.fulfilled, (state) => {
      state.loading = false;
      toast.success("Item added to cart");
      // التعديل المحلي مش ضروري لأن fetchCart هيحدث الـ state
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to add item";
      toast.error(state.error);
    });

    // تحديث الكمية
    builder.addCase(updateCartItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCartItem.fulfilled, (state) => {
      state.loading = false;
      // التعديل المحلي مش ضروري لأن fetchCart هيحدث الـ state
    });
    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update item";
      toast.error(state.error);
    });

    // حذف عنصر
    builder.addCase(deleteCartItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCartItem.fulfilled, (state) => {
      state.loading = false;
      // التعديل المحلي مش ضروري لأن fetchCart هيحدث الـ state
    });
    builder.addCase(deleteCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to delete item";
      toast.error(state.error);
    });
  },
});

export const { openCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;
