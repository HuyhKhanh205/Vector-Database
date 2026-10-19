import { useGetSimilarHotelsQuery } from '../features/search/hotelApi'

interface Props {
  hotelId: string
  hotelName: string
  onClose: () => void
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)

export default function SimilarModal({ hotelId, hotelName, onClose }: Props) {
  const { data, isLoading, isError } = useGetSimilarHotelsQuery({ id: hotelId })

  return (
    // Overlay
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-gray-900">Khách sạn tương tự</h2>
            <p className="text-sm text-gray-500">Tương tự với "{hotelName}"</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-4">
          {isLoading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          )}
          {isError && (
            <p className="text-red-500 text-center py-4">Không thể tải dữ liệu</p>
          )}
          {data && data.length === 0 && (
            <p className="text-gray-500 text-center py-4">Không tìm thấy khách sạn tương tự</p>
          )}
          {data && data.map(({ hotel, score }) => (
            <div key={hotel.id} className="border border-gray-100 rounded-xl p-3 mb-3 hover:bg-blue-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-sm text-gray-900">{hotel.name}</p>
                  <p className="text-xs text-blue-600">{hotel.city}</p>
                </div>
                {score !== null && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    {Math.round((score ?? 0) * 100)}%
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{hotel.description}</p>
              <p className="text-blue-700 font-bold text-sm mt-2">{formatPrice(hotel.price)}/đêm</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
