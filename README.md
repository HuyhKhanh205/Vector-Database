# MEGO Hotel Search Demo 🏨 (Ollama Local Miễn Phí)

Demo ứng dụng tìm kiếm khách sạn bằng **Vector Database** — so sánh trực tiếp tìm kiếm ngữ nghĩa (Vector Search) với tìm theo từ khóa (SQL LIKE), chạy hoàn toàn **Local miễn phí qua Ollama**, không phụ thuộc OpenAI API.

## Yêu cầu hệ thống

| Thành phần | Phiên bản |
|-----------|-----------|
| Java | 21 |
| Node.js | 20+ |
| npm | 9+ |
| Ollama | Phiên bản mới nhất trên Windows |
| Model Embedding | `nomic-embed-text` |

## 1. Cài đặt và chuẩn bị Ollama trên Windows

### Bước 1: Tải và cài đặt Ollama
- Truy cập trang chủ: [https://ollama.com/download](https://ollama.com/download)
- Tải file `OllamaSetup.exe` và tiến hành cài đặt.
- Sau khi cài xong, Ollama sẽ chạy ngầm dưới khay hệ thống (System Tray).

### Bước 2: Tải Embedding Model
Mở PowerShell hoặc Command Prompt trên Windows và chạy lệnh:
```powershell
ollama pull nomic-embed-text
```

*(Nếu sau này cần dùng thêm Chatbot cục bộ, bạn có thể tải thêm model: `ollama pull qwen2.5:3b`)*.

### Bước 3: Kiểm tra Ollama hoạt động
Chạy lệnh kiểm tra danh sách model đã tải:
```powershell
ollama list
```
Kiểm tra endpoint API cục bộ (cổng 11434):
```powershell
curl http://localhost:11434/api/tags
```

---

## 2. Cách chạy dự án

### Backend (Spring Boot)
1. Mở PowerShell tại thư mục `backend`:
```powershell
cd backend
.\gradlew.bat bootRun
```
*Lưu ý: Lần khởi động đầu tiên, `HotelDataLoader` sẽ gọi Ollama local để tạo vector embedding cho 25 khách sạn và lưu vào file `data/vector-store.json`. Các lần khởi động tiếp theo sẽ nạp trực tiếp từ file này nên khởi động cực nhanh và không tốn tài nguyên.*

- Backend API: http://localhost:8080  
- Swagger UI tài liệu API: http://localhost:8080/swagger-ui.html

### Frontend (React + Vite + Tailwind)
1. Mở một cửa sổ PowerShell khác tại thư mục `frontend`:
```powershell
cd frontend
npm run dev
```
2. Mở trình duyệt truy cập: http://localhost:5173

---

## 3. Chạy Unit Test Backend

```powershell
cd backend
.\gradlew.bat test
```
*(Tất cả 7 test cases bao gồm MockMvc, keyword search, semantic search, validation 400 & 404 đều pass 100%).*

---

## 4. Ví dụ gọi API bằng curl

### Lấy danh sách toàn bộ khách sạn
```bash
curl http://localhost:8080/api/hotels
```

### Tìm kiếm theo từ khóa (SQL LIKE '%q%')
```bash
curl "http://localhost:8080/api/hotels/search?q=rung+thong&mode=keyword&topK=5"
```

### Tìm kiếm theo ngữ nghĩa (Vector Search qua Ollama)
```bash
curl "http://localhost:8080/api/hotels/search?q=cho+nghi+yen+tinh+giua+nui+rung+hop+cap+doi&mode=semantic&topK=5"
```

### Tìm kiếm lai (Hybrid: Semantic + Lọc theo thành phố & giá)
```bash
curl "http://localhost:8080/api/hotels/search?q=resort+gia+dinh&mode=semantic&city=Phu+Quoc&maxPrice=3000000"
```

### Tìm khách sạn tương tự
```bash
curl "http://localhost:8080/api/hotels/H001/similar?topK=5"
```

---

## 5. 4 câu truy vấn demo kiểm thử

1. `chỗ nghỉ yên tĩnh giữa núi rừng, hợp cặp đôi`
2. `nơi cho cả nhà đi chơi, có hồ bơi cho trẻ em`
3. `khách sạn sang trọng nhìn ra biển để tổ chức đám cưới`
4. `ở gần sân bay, tiết kiệm cho người đi công tác`

> Cả 4 câu truy vấn trên khi tìm ở cột **Từ khóa** sẽ trả về 0 kết quả (do mô tả khách sạn dùng từ đồng nghĩa, tránh từ khóa trực tiếp). Ngược lại, cột **Ngữ nghĩa (Ollama)** sẽ tìm ra chính xác các khách sạn phù hợp nhất.
