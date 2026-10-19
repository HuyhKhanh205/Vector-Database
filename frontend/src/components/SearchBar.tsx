import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../app/store'
import { setInputValue, setQuery, submitSearch } from '../features/search/searchSlice'

// 4 câu trưng cầu dùng làm chip mẫu
const SAMPLE_QUERIES = [
  'chỗ nghỉ yên tĩnh giữa núi rừng, hợp cặp đôi',
  'nơi cho cả nhà đi chơi, có hồ bơi cho trẻ em',
  'khách sạn sang trọng nhìn ra biển để tổ chức đám cưới',
  'ở gần sân bay, tiết kiệm cho người đi công tác',
]

export default function SearchBar() {
  const dispatch = useDispatch<AppDispatch>()
  const inputValue = useSelector((s: RootState) => s.search.inputValue)

  const handleSearch = () => {
    dispatch(submitSearch())
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  const handleChipClick = (q: string) => {
    dispatch(setQuery(q))
  }

  return (
    <div className="w-full">
      {/* Ô tìm kiếm chính */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => dispatch(setInputValue(e.target.value))}
          onKeyDown={handleKeyDown}
          placeholder="Nhập câu tìm kiếm bằng tiếng Việt... (ví dụ: chỗ nghỉ yên tĩnh cạnh biển)"
          className="flex-1 px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:outline-none text-gray-800 bg-white shadow-sm text-sm"
        />
        <button
          onClick={handleSearch}
          disabled={!inputValue.trim()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded-xl shadow-sm transition-colors text-sm whitespace-nowrap"
        >
          🔍 Tìm
        </button>
      </div>

      {/* Chip câu hỏi mẫu */}
      <div className="flex flex-wrap gap-2">
        {SAMPLE_QUERIES.map((q) => (
          <button
            key={q}
            onClick={() => handleChipClick(q)}
            className="text-xs px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full border border-blue-200 hover:border-blue-400 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  )
}
