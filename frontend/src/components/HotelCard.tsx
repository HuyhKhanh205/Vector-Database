import { useState } from 'react'
import type { SearchResult } from '../features/search/hotelApi'
import SimilarModal from './SimilarModal'
import { MapPin, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'

interface Props {
  result: SearchResult
  showScore: boolean
}

// Format giá VND
const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN').format(price) + ' VND'

// Mô phỏng ảnh khách sạn chất lượng cao theo thành phố
const getHotelImage = (city: string, id: string) => {
  const imagesByCity: Record<string, string[]> = {
    'Đà Lạt': [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80'
    ],
    'Vũng Tàu': [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80'
    ],
    'Phú Quốc': [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'
    ],
    'Nha Trang': [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=600&q=80'
    ],
    'Hà Nội': [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=600&q=80'
    ],
    'TP.HCM': [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80'
    ]
  }

  const list = imagesByCity[city] || imagesByCity['Đà Lạt']
  const index = (id.charCodeAt(id.length - 1) || 0) % list.length
  return list[index]
}

export default function HotelCard({ result, showScore }: Props) {
  const { hotel, score } = result
  const [showSimilar, setShowSimilar] = useState(false)

  // Đánh giá dựa trên sao
  const getReviewLabel = (stars: number) => {
    if (stars >= 5) return { label: 'Xuất sắc', score: '9.4' }
    if (stars >= 4) return { label: 'Tuyệt vời', score: '8.8' }
    if (stars >= 3) return { label: 'Rất tốt', score: '8.2' }
    return { label: 'Tốt', score: '7.8' }
  }

  const review = getReviewLabel(hotel.stars)
  const scorePercent = score !== null && score !== undefined ? Math.round(score * 100) : null

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row group">
      {/* Cột ảnh khách sạn (style Booking.com) */}
      <div className="sm:w-56 h-48 sm:h-auto relative overflow-hidden flex-shrink-0 bg-gray-100">
        <img
          src={getHotelImage(hotel.city, hotel.id)}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Badge hạng sao */}
        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-yellow-400 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-0.5">
          {'★'.repeat(hotel.stars)}
        </div>

        {/* Badge tương đồng Semantic (nếu có) */}
        {showScore && scorePercent !== null && (
          <div className="absolute bottom-2 left-2 right-2 bg-blue-900/90 backdrop-blur-xs text-white px-2 py-1 rounded text-xs font-medium flex items-center justify-between">
            <span className="flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              Độ hợp ý:
            </span>
            <span className="font-bold text-yellow-300">{scorePercent}%</span>
          </div>
        )}
      </div>

      {/* Cột nội dung chi tiết */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Header & Điểm đánh giá kiểu Booking */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div>
              <h3 className="font-bold text-base text-[#003b95] hover:text-[#00224f] cursor-pointer line-clamp-1 leading-snug">
                {hotel.name}
              </h3>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span>{hotel.city}</span>
                <span className="text-gray-300">•</span>
                <span className="text-blue-700 underline text-[11px] cursor-pointer">Xem trên bản đồ</span>
              </p>
            </div>

            {/* Khối review điểm số phong cách Booking.com */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-gray-800 leading-tight">{review.label}</div>
                <div className="text-[10px] text-gray-400">128 đánh giá</div>
              </div>
              <div className="w-8 h-8 rounded-t-lg rounded-br-lg bg-[#003b95] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                {review.score}
              </div>
            </div>
          </div>

          {/* Mô tả khách sạn */}
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 my-2">
            {hotel.description}
          </p>

          {/* Tiện ích nổi bật */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {hotel.amenities.slice(0, 4).map((amenity, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[11px] bg-gray-50 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-sm"
              >
                <ShieldCheck className="w-3 h-3 text-green-600" />
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 4 && (
              <span className="text-[11px] text-gray-400 self-center">
                +{hotel.amenities.length - 4} tiện ích khác
              </span>
            )}
          </div>
        </div>

        {/* Footer: Giá & Nút hành động */}
        <div className="pt-2 border-t border-gray-100 flex items-end justify-between gap-3 mt-1">
          <div>
            <div className="text-[11px] text-gray-500">Giá mỗi đêm từ</div>
            <div className="text-lg font-bold text-gray-900 leading-tight">
              {formatPrice(hotel.price)}
            </div>
            <div className="text-[10px] text-green-700 font-medium flex items-center gap-1">
              ✓ Đã bao gồm thuế & phí
            </div>
          </div>

          <div className="flex items-center gap-2">
            {showScore && (
              <button
                onClick={() => setShowSimilar(true)}
                className="text-xs px-3 py-2 bg-blue-50 text-[#003b95] hover:bg-blue-100 font-semibold rounded-md border border-blue-200 transition-colors flex items-center gap-1"
              >
                <span>Tương tự</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
            <button className="text-xs px-3.5 py-2 bg-[#006ce4] hover:bg-[#0057b8] text-white font-semibold rounded-md shadow-xs transition-colors">
              Xem phòng
            </button>
          </div>
        </div>
      </div>

      {showSimilar && (
        <SimilarModal
          hotelId={hotel.id}
          hotelName={hotel.name}
          onClose={() => setShowSimilar(false)}
        />
      )}
    </div>
  )
}
