import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface SearchState {
  query: string        // Câu truy vấn hiện tại
  inputValue: string   // Giá trị trong ô nhập (chưa gửi)
  city: string         // Lọc theo thành phố
  maxPrice: number     // Lọc theo giá tối đa
  topK: number         // Số kết quả trả về
}

const initialState: SearchState = {
  query: '',
  inputValue: '',
  city: '',
  maxPrice: 10000000,
  topK: 5,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setInputValue(state, action: PayloadAction<string>) {
      state.inputValue = action.payload
    },
    submitSearch(state) {
      state.query = state.inputValue.trim()
    },
    setQuery(state, action: PayloadAction<string>) {
      state.inputValue = action.payload
      state.query = action.payload
    },
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload
    },
    setMaxPrice(state, action: PayloadAction<number>) {
      state.maxPrice = action.payload
    },
    setTopK(state, action: PayloadAction<number>) {
      state.topK = action.payload
    },
  },
})

export const { setInputValue, submitSearch, setQuery, setCity, setMaxPrice, setTopK } = searchSlice.actions
export default searchSlice.reducer
