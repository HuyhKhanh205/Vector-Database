import type { SearchResponse } from '../features/search/hotelApi'
import HotelCard from './HotelCard'

interface Props {
  title: string
  subtitle: string
  data: SearchResponse | undefined
  isLoading: boolean
  isError: boolean
  showScore: boolean
  icon: string
  accentColor: string
}

export default function ResultColumn({
  title, subtitle, data, isLoading, isError, showScore, icon, accentColor
}: Props) {
  return (
    <div className="flex flex-col">
      {/* Tiêu đề cột */}
      <div className={`rounded-xl p-4 mb-4 ${accentColor}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{icon}</span>
          <h2 className="font-bold text-white text-base">{title}</h2>
        </div>
        <p className="text-white/80 text-xs">{subtitle}</p>
        {data && (
          <div className="flex gap-3 mt-2 text-white/90 text-xs">
            <span>⏱ {data.tookMs}ms</span>
            <span>📊 {data.results.length} kết quả</span>
          </div>
        )}
      </div>

      {/* Trạng thái loading */}
      {isLoading && (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-xl border border-blue-100 p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/4 mb-3" />
              <div className="h-3 bg-gray-200 rounded w-full mb-1" />
              <div className="h-3 bg-gray-200 rounded w-5/6" />
            </div>
          ))}
        </div>
      )}

      {/* Lỗi */}
      {isError && !isLoading && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-red-600 text-sm">Lỗi kết nối API</p>
          <p className="text-red-400 text-xs mt-1">Kiểm tra backend đang chạy</p>
        </div>
      )}

      {/* Không có kết quả */}
      {!isLoading && !isError && data && data.results.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
          <p className="text-4xl mb-2">&#x1F50D;</p>
          <p className="text-amber-800 font-medium text-sm">Không tìm thấy kết quả</p>
          {!showScore && (
            <p className="text-amber-600 text-xs mt-1">
              Tìm theo từ khóa không tìm thấy cụm từ này trong mô tả.
              Cột bên phải (Vector) có thể hiểu được ý nghĩa câu hỏi.
            </p>
          )}
        </div>
      )}

      {/* Danh sách kết quả */}
      {!isLoading && !isError && data && data.results.length > 0 && (
        <div className="flex flex-col gap-3">
          {data.results.map((result) => (
            <HotelCard
              key={result.hotel.id}
              result={result}
              showScore={showScore}
            />
          ))}
        </div>
      )}
    </div>
  )
}
