import { configureStore } from '@reduxjs/toolkit'
import { hotelApi } from '../features/search/hotelApi'
import searchReducer from '../features/search/searchSlice'

// Store chính của ứng dụng, dễ nhúp vào dự án MEGO sau này
export const store = configureStore({
  reducer: {
    search: searchReducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hotelApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
