import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './RootReducers';

//store for redux
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})
export default store;

