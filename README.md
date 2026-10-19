# MEGO Hotel Search Demo 🏨

Demo ứng dụng tìm kiếm khách sạn bằng **Vector Database** — so sánh trực tiếp tìm kiếm ngữ nghĩa (Vector Search) với tìm theo từ khóa (SQL LIKE).

## Yêu cầu hệ thống

| Thành phần | Phiên bản |
|-----------|-----------|
| Java | 17+ |
| Node.js | 20+ |
| npm | 9+ |
| OpenAI API Key | Cần có |

## Cấu trúc dự án

```
Project-Vector-Database/
├── backend/backend/         # Spring Boot 4.1.1 + Spring AI 2.0.1
│   ├── src/main/java/iuh/fit/backend/
│   │   ├── controller/      # REST API endpoints
│   │   ├── service/         # Logic tìm kiếm
│   │   ├── model/           # Record/DTO
│   │   ├── config/          # VectorStore, CORS
│   │   └── data/            # HotelDataLoader (embed + seed)
│   └── src/main/resources/
│       └── hotels.json      # 25 khách sạn dữ liệu seed
└── frontend/                # Vite + React 19 + Tailwind + RTK Query
```

## Cách đặt biến môi trường

### Windows (PowerShell)
```powershell
$env:OPENAI_API_KEY = "sk-..."
```

### Windows (Command Prompt)
```cmd
set OPENAI_API_KEY=sk-...
```

### Linux/macOS
```bash
export OPENAI_API_KEY=sk-...
```

> **Lưu ý:** File `data/vector-store.json` được tạo tự động lần đầu chạy (tốn ~3-5s để embed 25 khách sạn). Các lần sau load từ file, không tốn chi phí API.

## Cách chạy

### 1. Backend

```powershell
# Windows
cd backend\backend
$env:OPENAI_API_KEY = "sk-..."
.\gradlew.bat bootRun
```

```bash
# Linux/macOS
cd backend/backend
export OPENAI_API_KEY=sk-...
./gradlew bootRun
```

Backend chạy tại: http://localhost:8080  
Swagger UI: http://localhost:8080/swagger-ui.html

### 2. Frontend

```bash
cd frontend
npm install   # Chỉ cần lần đầu
npm run dev
```

Frontend chạy tại: http://localhost:5173

## Chạy Tests (Backend)

```powershell
# Windows
cd backend\backend
.\gradlew.bat test
```

```bash
# Linux/macOS
cd backend/backend
./gradlew test
```

## Ví dụ gọi API bằng curl

### Lấy tất cả khách sạn
```bash
curl http://localhost:8080/api/hotels
```

### Tìm theo từ khóa (SQL LIKE)
```bash
curl "http://localhost:8080/api/hotels/search?q=rung+thong&mode=keyword&topK=5"
```

### Tìm theo ngữ nghĩa (Vector Search)
```bash
curl "http://localhost:8080/api/hotels/search?q=cho+nghi+yen+tinh+giua+nui+rung+hop+cap+doi&mode=semantic&topK=5"
```

### Tìm với lọc thành phố và giá
```bash
curl "http://localhost:8080/api/hotels/search?q=resort+gia+dinh&mode=semantic&city=Phu+Quoc&maxPrice=3000000"
```

### Khách sạn tương tự
```bash
curl "http://localhost:8080/api/hotels/H001/similar?topK=5"
```

## 4 câu truy vấn demo

| # | Câu hỏi | Keyword | Vector |
|---|---------|---------|--------|
| 1 | "chỗ nghỉ yên tĩnh giữa núi rừng, hợp cặp đôi" | ❌ 0 kết quả | ✅ Đà Lạt |
| 2 | "nơi cho cả nhà đi chơi, có hồ bơi cho trẻ em" | ❌ 0 kết quả | ✅ Resort gia đình |
| 3 | "khách sạn sang trọng nhìn ra biển để tổ chức đám cưới" | ❌ 0 kết quả | ✅ Khách sạn biển cao cấp |
| 4 | "ở gần sân bay, tiết kiệm cho người đi công tác" | ❌ 0 kết quả | ✅ Hotel gần sân bay giá rẻ |

> Thiết kế dữ liệu cố tình dùng từ đồng nghĩa trong mô tả để keyword search bỏ sót nhưng vector search vẫn tìm đúng ngữ nghĩa.

## API Reference

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/hotels` | Danh sách tất cả khách sạn |
| GET | `/api/hotels/search?q=...&mode=keyword\|semantic` | Tìm kiếm |
| GET | `/api/hotels/{id}/similar` | Khách sạn tương tự |

### Tham số tìm kiếm

| Tham số | Kiểu | Bắt buộc | Mô tả |
|---------|------|----------|-------|
| `q` | string | ✅ | Câu truy vấn |
| `mode` | `keyword`\|`semantic` | - | Mặc định: `semantic` |
| `topK` | int | - | Số kết quả (1-20, mặc định 5) |
| `city` | string | - | Lọc theo thành phố |
| `maxPrice` | long | - | Lọc giá tối đa (VND) |

### Response Schema

```json
{
  "mode": "semantic",
  "tookMs": 120,
  "results": [
    {
      "hotel": {
        "id": "H001",
        "name": "Pine Valley Resort",
        "city": "Đà Lạt",
        "price": 1200000,
        "stars": 4,
        "description": "...",
        "amenities": ["lò sưởi", "ban công riêng"]
      },
      "score": 0.87
    }
  ]
}
```

> `score` chỉ có giá trị ở mode `semantic` (cosine similarity 0-1). Với `keyword`, `score` = `null`.

## Tech Stack

- **Backend:** Spring Boot 4.1.1, Spring AI 2.0.1, OpenAI `text-embedding-3-small`, SimpleVectorStore (in-memory)
- **Frontend:** Vite 8.3, React 19, TypeScript 6, Tailwind CSS 4, Redux Toolkit, RTK Query
- **Embedding:** OpenAI `text-embedding-3-small` — mô hình đa ngôn ngữ, hỗ trợ tiếng Việt
"# Vector-Database" 
