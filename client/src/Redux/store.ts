import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slices/UserReducer";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";
import CartReducer from "./slices/CartReducer";

const rootReducer = combineReducers({ user: UserReducer, cart: CartReducer });

const persistConfige = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfige, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type ReduxUserState = ReturnType<typeof store.getState>;
