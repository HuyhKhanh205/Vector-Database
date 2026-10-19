import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../app/store'
import { setInputValue, setQuery, submitSearch } from '../features/search/searchSlice'
import { Search, Sparkles, Compass } from 'lucide-react'

// 4 câu truy vấn demo chuẩn theo yêu cầu đề bài
const SAMPLE_QUERIES = [
  { text: 'chỗ nghỉ yên tĩnh giữa núi rừng, hợp cặp đôi', tag: 'Đà Lạt / Núi rừng' },
  { text: 'nơi cho cả nhà đi chơi, có hồ bơi cho trẻ em', tag: 'Gia đình / Resort' },
  { text: 'khách sạn sang trọng nhìn ra biển để tổ chức đám cưới', tag: 'Biển / Tiệc cưới' },
  { text: 'ở gần sân bay, tiết kiệm cho người đi công tác', tag: 'Công tác / Sân bay' },
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
      {/* Khung tìm kiếm chính viền vàng Booking.com đặc trưng */}
      <div className="p-1.5 bg-[#febb02] rounded-xl shadow-lg">
        <div className="bg-white rounded-lg p-2 flex flex-col md:flex-row items-center gap-2">
          {/* Ô nhập input chính */}
          <div className="flex items-center gap-3 flex-1 px-3 py-2 w-full">
            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => dispatch(setInputValue(e.target.value))}
              onKeyDown={handleKeyDown}
              placeholder="Bạn muốn đi đâu? (Ví dụ: resort ven biển có bể bơi trẻ em, chỗ nghỉ thanh bình ở Đà Lạt...)"
              className="w-full text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Nút Tìm kiếm phong cách Booking.com */}
          <button
            onClick={handleSearch}
            disabled={!inputValue.trim()}
            className="w-full md:w-auto px-8 py-3 bg-[#006ce4] hover:bg-[#0057b8] disabled:bg-gray-300 text-white font-bold text-base rounded-md shadow-sm transition-all duration-150 flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer disabled:cursor-not-allowed"
          >
            <Search className="w-4 h-4" />
            <span>Tìm kiếm</span>
          </button>
        </div>
      </div>

      {/* Danh sách 4 chip câu hỏi mẫu phong cách Discovery tags */}
      <div className="mt-3.5 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-gray-600 flex items-center gap-1 mr-1">
          <Compass className="w-3.5 h-3.5 text-blue-600" />
          Gợi ý câu hỏi mẫu:
        </span>
        {SAMPLE_QUERIES.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleChipClick(q.text)}
            className="group inline-flex items-center gap-1.5 text-xs px-3 py-1.5 bg-white hover:bg-blue-50 text-gray-700 hover:text-[#003b95] border border-gray-200 hover:border-[#006ce4] rounded-full shadow-2xs transition-all duration-150 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-amber-500 group-hover:scale-110 transition-transform" />
            <span className="font-medium">{q.text}</span>
            <span className="text-[10px] bg-blue-50 group-hover:bg-blue-100 text-[#006ce4] px-1.5 py-0.2 rounded-full font-semibold">
              {q.tag}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
