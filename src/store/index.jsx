import {
  combineReducers,
  configureStore,
  createAction,
} from "@reduxjs/toolkit";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import AuthReducer from "./app/auth";
import leadsReducer from "./app/leads";
import dashboardReducer from "./app/dashboard";

const rootPersistConfig = {
  key: "root",
  storage,
  // blacklist: ['studentsReducer'], // Avoid persisting large or non-essential reducers
};

const userPersistConfig = {
  key: "user",
  storage: storageSession,
};

const appReducer = combineReducers({
  authReducer: persistReducer(userPersistConfig, AuthReducer),
  leadsReducer: leadsReducer,
  dashboardReducer: dashboardReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
    localStorage.clear();
    sessionStorage.clear();
    const Cookies = document.cookie.split(";");
    for (let i = 0; i < Cookies.length; i++) {
      document.cookie = Cookies[i] + "=; expires=" + new Date(0).toUTCString();
    }
    // clearAllLogs();
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: process.env.NODE_ENV === "development", // Only enable in development
    }),
});

export const logout = createAction("auth/logout");

export const persistor = persistStore(store);

// export AppState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;
export const { dispatch } = store;
export const useDispatch = () => useAppDispatch();
// export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;

export default store;
