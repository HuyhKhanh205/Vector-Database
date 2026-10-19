import { useState } from 'react'
import type { SearchResult } from '../features/search/hotelApi'
import SimilarModal from './SimilarModal'

interface Props {
  result: SearchResult
  showScore: boolean
}

// Format giá VND
const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)

// Hiển thị sao
const StarRating = ({ stars }: { stars: number }) => (
  <span className="text-yellow-400">
    {'\u2605'.repeat(stars)}{'\u2606'.repeat(5 - stars)}
  </span>
)

export default function HotelCard({ result, showScore }: Props) {
  const { hotel, score } = result
  const [showSimilar, setShowSimilar] = useState(false)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{hotel.name}</h3>
          <p className="text-blue-600 text-xs mt-0.5">{hotel.city}</p>
        </div>
        <StarRating stars={hotel.stars} />
      </div>

      {/* Mô tả rút gọn */}
      <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">
        {hotel.description}
      </p>

      {/* Tiện ích */}
      <div className="flex flex-wrap gap-1 mb-3">
        {hotel.amenities.slice(0, 3).map((a) => (
          <span key={a} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">
            {a}
          </span>
        ))}
        {hotel.amenities.length > 3 && (
          <span className="text-gray-400 text-xs">+{hotel.amenities.length - 3}</span>
        )}
      </div>

      {/* Giá + điểm tương đồng */}
      <div className="flex items-center justify-between">
        <span className="font-bold text-blue-700 text-sm">{formatPrice(hotel.price)}/đêm</span>
        {showScore && score !== null && score !== undefined && (
          <div className="flex items-center gap-1">
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                style={{ width: `${Math.round(score * 100)}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 font-medium">{Math.round(score * 100)}%</span>
          </div>
        )}
      </div>

      {/* Nút khách sạn tương tự (chỉ hiện cột semantic) */}
      {showScore && (
        <button
          onClick={() => setShowSimilar(true)}
          className="mt-3 w-full text-xs text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-400 rounded-lg py-1.5 transition-colors"
        >
          Khách sạn tương tự
        </button>
      )}

      {showSimilar && (
        <SimilarModal hotelId={hotel.id} hotelName={hotel.name} onClose={() => setShowSimilar(false)} />
      )}
    </div>
  )
}
