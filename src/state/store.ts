import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";
import adminSlice from "./admin";
import { persistStore, persistReducer, FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux"


const persistConfig = {
  key: "root",
  storage,
  version: 1
};

const rootReducer = combineReducers({
 user: userSlice,
 admin: adminSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [REGISTER, FLUSH, PURGE, PAUSE, PERSIST, REHYDRATE]
    }
  }),
});

const persistor = persistStore(store);

export { store, persistor };
