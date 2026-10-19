import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../app/store'
import { setCity, setMaxPrice } from '../features/search/searchSlice'
import { MapPin, DollarSign, SlidersHorizontal, RotateCcw } from 'lucide-react'

const CITIES = ['', 'Đà Lạt', 'Vũng Tàu', 'Phú Quốc', 'Nha Trang', 'Hà Nội', 'TP.HCM']

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN').format(price) + ' đ'

export default function FilterPanel() {
  const dispatch = useDispatch<AppDispatch>()
  const { city, maxPrice } = useSelector((s: RootState) => s.search)

  const handleReset = () => {
    dispatch(setCity(''))
    dispatch(setMaxPrice(10000000))
  }

  const isFiltered = city !== '' || maxPrice < 10000000

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-4 flex-1">
        {/* Tiêu đề bộ lọc */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 pr-2 border-r border-gray-200">
          <SlidersHorizontal className="w-4 h-4 text-[#006ce4]" />
          <span>Bộ lọc nâng cao:</span>
        </div>

        {/* Dropdown thành phố */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-gray-600 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            Điểm đến:
          </label>
          <select
            value={city}
            onChange={(e) => dispatch(setCity(e.target.value))}
            className="text-xs font-medium border border-gray-300 rounded-md px-2.5 py-1.5 bg-gray-50 text-gray-800 focus:bg-white focus:border-[#006ce4] focus:outline-none transition-colors cursor-pointer"
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c || 'Tất cả 6 thành phố'}
              </option>
            ))}
          </select>
        </div>

        {/* Slider giá tối đa */}
        <div className="flex items-center gap-3 flex-1 min-w-[240px] max-w-md">
          <label className="text-xs font-semibold text-gray-600 flex items-center gap-1 whitespace-nowrap">
            <DollarSign className="w-3.5 h-3.5 text-gray-400" />
            Ngân sách tối đa:
          </label>
          <input
            type="range"
            min={300000}
            max={10000000}
            step={100000}
            value={maxPrice}
            onChange={(e) => dispatch(setMaxPrice(Number(e.target.value)))}
            className="flex-1 accent-[#006ce4] cursor-pointer h-1.5 bg-gray-200 rounded-lg"
          />
          <span className="text-xs font-bold text-[#003b95] whitespace-nowrap bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            {formatPrice(maxPrice)}
          </span>
        </div>
      </div>

      {/* Nút đặt lại */}
      {isFiltered && (
        <button
          onClick={handleReset}
          className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Đặt lại</span>
        </button>
      )}
    </div>
  )
}
