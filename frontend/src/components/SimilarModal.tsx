import { useGetSimilarHotelsQuery } from '../features/search/hotelApi'
import { X, Sparkles, MapPin } from 'lucide-react'

interface Props {
  hotelId: string
  hotelName: string
  onClose: () => void
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN').format(price) + ' VND'

export default function SimilarModal({ hotelId, hotelName, onClose }: Props) {
  const { data, isLoading, isError } = useGetSimilarHotelsQuery({ id: hotelId, topK: 5 })

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal phong cách Booking.com */}
        <div className="bg-[#003b95] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg leading-tight">Khách sạn có phong cách tương tự</h3>
              <p className="text-xs text-blue-200 mt-0.5">Dựa trên phân tích vector nội dung của: "{hotelName}"</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Danh sách khách sạn tương tự */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-gray-50 flex-1">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-9 w-9 border-3 border-blue-600 border-t-transparent" />
              <p className="text-xs text-gray-500 mt-3 font-medium">Đang tính toán ma trận tương đồng...</p>
            </div>
          )}

          {isError && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center text-xs">
              Không thể tải danh sách khách sạn tương tự.
            </div>
          )}

          {data && data.length === 0 && (
            <div className="bg-white p-8 rounded-xl text-center text-gray-500 text-xs">
              Chưa tìm thấy khách sạn tương đồng.
            </div>
          )}

          {data &&
            data.map(({ hotel, score }) => (
              <div
                key={hotel.id}
                className="bg-white border border-gray-200 rounded-xl p-3.5 hover:border-blue-300 hover:shadow-xs transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#003b95]">{hotel.name}</h4>
                    <span className="text-yellow-500 text-xs font-semibold">{'★'.repeat(hotel.stars)}</span>
                  </div>

                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span>{hotel.city}</span>
                  </p>

                  <p className="text-xs text-gray-600 line-clamp-1 mt-1">{hotel.description}</p>

                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {hotel.amenities.slice(0, 3).map((a, i) => (
                      <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  {score !== null && score !== undefined && (
                    <div className="inline-flex items-center gap-1 bg-blue-50 text-[#003b95] border border-blue-200 px-2 py-0.5 rounded-full text-xs font-bold mb-1">
                      <Sparkles className="w-3 h-3 text-yellow-500" />
                      <span>{Math.round(score * 100)}% khớp</span>
                    </div>
                  )}
                  <div className="text-right">
                    <div className="font-bold text-sm text-gray-900">{formatPrice(hotel.price)}</div>
                    <div className="text-[10px] text-gray-400">/đêm</div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Footer Modal */}
        <div className="bg-white p-3.5 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-md transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}
