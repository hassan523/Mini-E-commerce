import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
     id: number;
     title: string;
     image: string;
     unitPrice: number;
     totalPrice: number;
     quantity: number;
}

interface CartState {
     items: Record<number, CartItem>;
}

const initialState: CartState = {
     items: {},
};

type CartItemPayload = {
     id: number;
     title: string;
     image: string;
     price: number | string;
     quantity: number;
};

export const cartState = createSlice({
     name: 'cart',
     initialState,
     reducers: {
          addToCart: (state, action: PayloadAction<CartItemPayload>) => {
               const payload = action.payload;
               const unitPrice = Number(payload.price) || 0;
               const existing = state.items[payload.id];

               if (existing) {
                    existing.quantity += payload.quantity;
                    existing.totalPrice = Number((existing.unitPrice * existing.quantity).toFixed(2));
               } else {
                    state.items[payload.id] = {
                         id: payload.id,
                         title: payload.title,
                         image: payload.image,
                         unitPrice,
                         quantity: payload.quantity,
                         totalPrice: Number((unitPrice * payload.quantity).toFixed(2)),
                    };
               }
          },

          removeFromCart: (state, action: PayloadAction<number>) => {
               delete state.items[action.payload];
          },

          updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
               const { id, quantity } = action.payload;
               if (state.items[id]) {
                    if (quantity <= 0) {
                         delete state.items[id];
                    } else {
                         state.items[id].quantity = quantity;
                         state.items[id].totalPrice = Number((state.items[id].unitPrice * quantity).toFixed(2));
                    }
               }
          },

          clearCart: state => {
               state.items = {};
          },
     },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartState.actions;

export default cartState.reducer;
