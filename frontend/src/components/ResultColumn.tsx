import type { SearchResponse } from '../features/search/hotelApi'
import HotelCard from './HotelCard'
import { Clock, CheckCircle2, AlertTriangle, SearchX, Cpu, Database } from 'lucide-react'

interface Props {
  title: string
  subtitle: string
  data: SearchResponse | undefined
  isLoading: boolean
  isError: boolean
  showScore: boolean
  mode: 'keyword' | 'semantic'
}

export default function ResultColumn({
  title,
  subtitle,
  data,
  isLoading,
  isError,
  showScore,
  mode,
}: Props) {
  const isSemantic = mode === 'semantic'

  return (
    <div className="flex flex-col h-full">
      {/* Header cột kết quả */}
      <div
        className={`rounded-xl p-4 mb-4 border transition-all ${
          isSemantic
            ? 'bg-gradient-to-r from-[#003b95] to-[#006ce4] text-white border-blue-600 shadow-md'
            : 'bg-white text-gray-800 border-gray-200 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                isSemantic ? 'bg-white/15 text-yellow-300' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {isSemantic ? <Cpu className="w-5 h-5" /> : <Database className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="font-bold text-base leading-tight flex items-center gap-2">
                <span>{title}</span>
                {isSemantic && (
                  <span className="text-[10px] bg-yellow-400 text-gray-900 px-1.5 py-0.5 rounded font-extrabold uppercase tracking-wide">
                    AI Vector
                  </span>
                )}
              </h2>
              <p
                className={`text-xs mt-0.5 ${
                  isSemantic ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Thông tin Took ms & Số lượng kết quả */}
        {data && (
          <div
            className={`mt-3 pt-2.5 flex items-center justify-between text-xs border-t ${
              isSemantic ? 'border-white/15 text-blue-100' : 'border-gray-100 text-gray-500'
            }`}
          >
            <span className="flex items-center gap-1">
              <CheckCircle2 className={`w-3.5 h-3.5 ${isSemantic ? 'text-green-300' : 'text-green-600'}`} />
              Tìm thấy <strong className="font-bold text-sm ml-0.5">{data.results.length}</strong> khách sạn
            </span>
            <span className="flex items-center gap-1 font-mono text-[11px] opacity-90">
              <Clock className="w-3 h-3" />
              {data.tookMs} ms
            </span>
          </div>
        )}
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse flex flex-col sm:flex-row gap-4"
            >
              <div className="sm:w-52 h-40 bg-gray-200 rounded-lg flex-shrink-0" />
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/4 mb-3" />
                  <div className="h-3 bg-gray-100 rounded w-full mb-1.5" />
                  <div className="h-3 bg-gray-100 rounded w-5/6" />
                </div>
                <div className="h-6 bg-gray-200 rounded w-1/3 mt-4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lỗi kết nối */}
      {isError && !isLoading && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <h4 className="font-bold text-red-700 text-sm">Không thể kết nối Backend</h4>
          <p className="text-red-500 text-xs mt-1">
            Vui lòng kiểm tra ứng dụng Spring Boot đã được khởi động ở cổng 8080.
          </p>
        </div>
      )}

      {/* Trạng thái không tìm thấy kết quả */}
      {!isLoading && !isError && data && data.results.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center flex-1 flex flex-col items-center justify-center">
          <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mb-3">
            <SearchX className="w-7 h-7 text-amber-600" />
          </div>
          <h4 className="font-bold text-gray-800 text-sm">Không tìm thấy khách sạn phù hợp</h4>
          {!isSemantic ? (
            <p className="text-gray-500 text-xs mt-2 max-w-sm leading-relaxed">
              Thuật toán <strong>SQL LIKE</strong> tìm kiếm chuỗi con chính xác từng chữ nên đã bỏ sót các khách sạn dùng từ đồng nghĩa. Hãy nhìn sang cột bên phải (<strong>Vector Search</strong>) để thấy điều kỳ diệu!
            </p>
          ) : (
            <p className="text-gray-500 text-xs mt-2 max-w-sm leading-relaxed">
              Không tìm thấy khách sạn nào thỏa mãn tiêu chí lọc ngân sách hoặc thành phố. Hãy thử tăng mức giá hoặc chọn "Tất cả thành phố".
            </p>
          )}
        </div>
      )}

      {/* Danh sách kết quả thẻ khách sạn */}
      {!isLoading && !isError && data && data.results.length > 0 && (
        <div className="flex flex-col gap-3.5">
          {data.results.map((result) => (
            <HotelCard key={result.hotel.id} result={result} showScore={showScore} />
          ))}
        </div>
      )}
    </div>
  )
}
