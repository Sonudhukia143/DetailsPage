import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import flashReducer from './flash/flashMessage.js';
import { persistStore,persistReducer} from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user','flash'],
};

const rootReducer = combineReducers({
    user:userReducer,
    flash:flashReducer
});

const persistedReducer = persistReducer(persistConfig,rootReducer);

const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck:false
        })
});

const persistor = persistStore(store);

export { persistor,store };

