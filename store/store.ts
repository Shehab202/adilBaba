import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import wishlistSlice from "./features/wishlistSlice";
import becomeSellerSlice from "./features/sellerSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartSlice,
      wishlist: wishlistSlice,
      becomeSellerSlice
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
