import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../app/store'
import { setCity, setMaxPrice } from '../features/search/searchSlice'

const CITIES = ['', 'Đà Lạt', 'Vũng Tàu', 'Phú Quốc', 'Nha Trang', 'Hà Nội', 'TP.HCM']

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN').format(price) + 'đ'

export default function FilterPanel() {
  const dispatch = useDispatch<AppDispatch>()
  const { city, maxPrice } = useSelector((s: RootState) => s.search)

  return (
    <div className="flex flex-wrap gap-4 items-center bg-white rounded-xl border border-blue-100 p-4 shadow-sm">
      {/* Dropdown thành phố */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">📍 Thành phố:</label>
        <select
          value={city}
          onChange={(e) => dispatch(setCity(e.target.value))}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:border-blue-400 focus:outline-none"
        >
          {CITIES.map((c) => (
            <option key={c} value={c}>{c || 'Tất cả'}</option>
          ))}
        </select>
      </div>

      {/* Slider giá tối đa */}
      <div className="flex items-center gap-3 flex-1 min-w-48">
        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
          💰 Giá tối đa:
        </label>
        <input
          type="range"
          min={300000}
          max={10000000}
          step={100000}
          value={maxPrice}
          onChange={(e) => dispatch(setMaxPrice(Number(e.target.value)))}
          className="flex-1 accent-blue-600"
        />
        <span className="text-sm font-semibold text-blue-700 whitespace-nowrap min-w-28 text-right">
          {formatPrice(maxPrice)}
        </span>
      </div>
    </div>
  )
}
