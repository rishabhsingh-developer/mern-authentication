import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
// import { combineReducers } from "@reduxjs/toolkit";
// import { persistReducer } from "redux-persist";
// import persistStore from "redux-persist/es/persistStore";
// import storage from "redux-persist/lib/storage";

// const rootReducer = combineReducers({ user: userReducer });
// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };/

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
