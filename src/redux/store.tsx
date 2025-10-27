import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authState } from './Features/authState';
import cartReducer from './CartSlice/CartSlice';
import Product from './Product/Product';

const persistConfig = {
     key: 'root',
     storage: AsyncStorage,
     blacklist: ['Product'],
};

const cartPersistConfig = {
     key: 'cart',
     storage: AsyncStorage,
};

const rootReducer = combineReducers({
     userData: authState.reducer,
     cart: persistReducer(cartPersistConfig, cartReducer),
     [Product.reducerPath]: Product.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
     reducer: persistedReducer,
     middleware: getDefaultMiddleware =>
          getDefaultMiddleware({
               serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
               },
          }).concat(Product.middleware),
});

export default store;
export const persistor = persistStore(store);
