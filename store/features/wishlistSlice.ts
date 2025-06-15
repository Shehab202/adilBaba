import axiosClient from "@/lib/axiosClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// تعريف نوع البيانات للعنصر في العربة بناءً على الـ API
export interface WishlistItem {
  id: number;
  image: string;
  name: string;
  price: string;
  discount_price: string;
  cost_price: string;
  category: string;
  rating: number;
}

interface WishlistState {
  isOpen: boolean;
  items: WishlistItem[];
  // order_summary: {
  //   subtotal: number;
  //   shipping: string;
  //   total: number;
  // };
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  isOpen: false,
  items: [],
  // order_summary: {
  //   subtotal: 0,
  //   shipping: "",
  //   total: 0,
  // },
  loading: false,
  error: null,
};

// جلب بيانات العربة
export const fetchWishlist = createAsyncThunk("wishlist/fetchWishlist", async () => {
  const response = await axiosClient();
  const res = await response.get("/wishlist");
  return res?.data;
});

// دالة للبحث عن المنتج في الـ wishlist بناءً على id
export const isProductInWishlist = (productId: number, wishlistItems: WishlistItem[]): boolean => {
  return wishlistItems.some(item => item.id === productId);
};
// إضافة عنصر للعربة
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (
    {
      product_id,
    }: {
      product_id: number;
    },
    { dispatch }
  ) => {    
    const res = await axiosClient();
    const response = await res.post("/wishlist", {
      product_id: product_id + "",
    });
    // بعد النجاح، جلب الداتا الجديدة
    await dispatch(fetchWishlist());
    return response.data;
  }
);

// تحديث الكمية
export const updateWishlistItem = createAsyncThunk(
  "wishlist/updateWishlistItem",
  async ({ id }: { id: number;}, { dispatch }) => {
    const res = await axiosClient();
    const response = await res.patch(`/wishlist`, { products_id: id });
    // بعد النجاح، جلب الداتا الجديدة
    await dispatch(fetchWishlist());
    return response.data;
  }
);

// حذف عنصر أو تفريغ العربة
export const deleteWishlistItem = createAsyncThunk(
  "wishlist/deleteWishlistItem",
  // @ts-ignore
  async (product_id?: number, { dispatch }) => {
    const config = product_id ? { data: { product_id } } : {};
    const res = await axiosClient();
    await res.delete("/wishlist", config);
    // بعد النجاح، جلب الداتا الجديدة
    await dispatch(fetchWishlist());
    return product_id ? { id: product_id } : { clearAll: true };
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    openWishlist: (state) => {
      state.isOpen = true;
    },
    closeWishlist: (state) => {
      state.isOpen = false;
    },
  },
  extraReducers: (builder) => {
    // جلب العربة
    builder.addCase(fetchWishlist.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchWishlist.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.data; // العناصر في data
      // state.order_summary = action.payload.order_summary; // الـ order_summary مباشرة
    });
    builder.addCase(fetchWishlist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch wishlist";
    });

    // إضافة عنصر
    builder.addCase(addToWishlist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addToWishlist.fulfilled, (state) => {
      state.loading = false;
      toast.success("Item added to wishlist");
      // التعديل المحلي مش ضروري لأن fetchWishlist هيحدث الـ state
    });
    builder.addCase(addToWishlist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to add item";
      toast.error(state.error);
    });

    // تحديث الكمية
    builder.addCase(updateWishlistItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateWishlistItem.fulfilled, (state) => {
      state.loading = false;
      // التعديل المحلي مش ضروري لأن fetchWishlist هيحدث الـ state
    });
    builder.addCase(updateWishlistItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update item";
      toast.error(state.error);
    });

    // حذف عنصر
    builder.addCase(deleteWishlistItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteWishlistItem.fulfilled, (state) => {
      state.loading = false;
      toast.success("Item deleted from wishlist");
      // التعديل المحلي مش ضروري لأن fetchWishlist هيحدث الـ state
    });
    builder.addCase(deleteWishlistItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to delete item";
      toast.error(state.error);
    });
  },
});

export const { openWishlist, closeWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
