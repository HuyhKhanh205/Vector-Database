import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Đọc base URL từ biến môi trường
const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

export interface Hotel {
  id: string
  name: string
  city: string
  price: number
  stars: number
  description: string
  amenities: string[]
}

export interface SearchResult {
  hotel: Hotel
  score: number | null
}

export interface SearchResponse {
  mode: string
  tookMs: number
  results: SearchResult[]
}

export interface SearchParams {
  q: string
  mode: 'keyword' | 'semantic'
  topK?: number
  city?: string
  maxPrice?: number
}

/**
 * API slice duy nhất tập trung mọi lời gọi API.
 * Dễ ghép vào dự án MEGO sau này bằng cách đổi baseUrl.
 */
export const hotelApi = createApi({
  reducerPath: 'hotelApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE}/api` }),
  endpoints: (builder) => ({
    // Lấy tất cả khách sạn
    getAllHotels: builder.query<Hotel[], void>({
      query: () => '/hotels',
    }),

    // Tìm kiếm (keyword hoặc semantic)
    searchHotels: builder.query<SearchResponse, SearchParams>({
      query: ({ q, mode, topK = 5, city, maxPrice }) => ({
        url: '/hotels/search',
        params: {
          q,
          mode,
          topK,
          ...(city ? { city } : {}),
          ...(maxPrice ? { maxPrice } : {}),
        },
      }),
    }),

    // Tìm khách sạn tương tự
    getSimilarHotels: builder.query<SearchResult[], { id: string; topK?: number }>({
      query: ({ id, topK = 5 }) => `/hotels/${id}/similar?topK=${topK}`,
    }),
  }),
})

export const {
  useGetAllHotelsQuery,
  useSearchHotelsQuery,
  useGetSimilarHotelsQuery,
} = hotelApi
