import { useSelector } from 'react-redux'
import type { RootState } from './app/store'
import FilterPanel from './components/FilterPanel'
import ResultColumn from './components/ResultColumn'
import SearchBar from './components/SearchBar'
import { useSearchHotelsQuery } from './features/search/hotelApi'

export default function App() {
  const { query, city, maxPrice, topK } = useSelector((s: RootState) => s.search)

  // Gọi cả hai mode song song khi có query
  const hasQuery = query.trim().length > 0

  const keywordResult = useSearchHotelsQuery(
    { q: query, mode: 'keyword', topK, city: city || undefined, maxPrice },
    { skip: !hasQuery }
  )

  const semanticResult = useSearchHotelsQuery(
    { q: query, mode: 'semantic', topK, city: city || undefined, maxPrice },
    { skip: !hasQuery }
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-blue-700 text-white py-6 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-3xl">🏨</span>
            <div>
              <h1 className="text-2xl font-bold">MEGO Hotel Search Demo</h1>
              <p className="text-blue-200 text-sm">Tìm kiếm khách sạn bằng ngôn ngữ tự nhiên</p>
            </div>
          </div>
          <div className="mt-1 text-blue-300 text-xs">
            Demo Vector Database &bull; Spring AI 2.0.1 &bull; OpenAI text-embedding-3-small
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Tìm kiếm */}
        <div className="mb-4">
          <SearchBar />
        </div>

        {/* Bộ lọc */}
        <div className="mb-6">
          <FilterPanel />
        </div>

        {/* Trạng thái ban đầu */}
        {!hasQuery && (
          <div className="text-center py-16">
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-gray-500 text-lg">Nhập câu tìm kiếm hoặc chọn câu mẫu ở trên</p>
            <p className="text-gray-400 text-sm mt-2">
              Thử ngay: "chỗ nghỉ yên tĩnh giữa núi rừng, hợp cặp đôi"
            </p>
          </div>
        )}

        {/* Hai cột kết quả */}
        {hasQuery && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResultColumn
              title="Tìm theo Từ khóa"
              subtitle="SQL LIKE — khớp chuỗi con chính xác"
              icon="📝"
              accentColor="bg-gray-600"
              data={keywordResult.data}
              isLoading={keywordResult.isFetching}
              isError={keywordResult.isError}
              showScore={false}
            />
            <ResultColumn
              title="Tìm theo Ngữ nghĩa"
              subtitle="Vector Search — hiểu ý nghĩa câu hỏi"
              icon="🧠"
              accentColor="bg-blue-600"
              data={semanticResult.data}
              isLoading={semanticResult.isFetching}
              isError={semanticResult.isError}
              showScore={true}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-400 text-xs">
        MEGO Hotel Search Demo &bull; Vector Database Demo &bull; Spring Boot 4.1.1 + Spring AI 2.0.1
      </footer>
    </div>
  )
}
