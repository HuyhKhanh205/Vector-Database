package iuh.fit.backend.controller;

import iuh.fit.backend.model.Hotel;
import iuh.fit.backend.model.SearchResponse;
import iuh.fit.backend.model.SearchResult;
import iuh.fit.backend.service.HotelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller cung cấp RESTful APIs quản lý và tìm kiếm khách sạn
 */
@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    private final HotelService hotelService;

    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    /**
     * GET /api/hotels : Lấy danh sách tất cả khách sạn
     */
    @GetMapping
    public List<Hotel> getAllHotels() {
        return hotelService.getAllHotels();
    }

    /**
     * GET /api/hotels/search?q=...&mode=keyword|semantic&topK=5&city=...&maxPrice=...
     */
    @GetMapping("/search")
    public ResponseEntity<SearchResponse> search(
            @RequestParam String q,
            @RequestParam(defaultValue = "semantic") String mode,
            @RequestParam(defaultValue = "5") int topK,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Long maxPrice
    ) {
        if (q == null || q.trim().isEmpty()) {
            throw new IllegalArgumentException("Tham số 'q' không được để trống");
        }
        if (topK < 1 || topK > 20) {
            throw new IllegalArgumentException("Tham số 'topK' phải nằm trong khoảng từ 1 đến 20");
        }

        SearchResponse response = switch (mode.toLowerCase()) {
            case "keyword" -> hotelService.keywordSearch(q.trim(), topK, city, maxPrice);
            case "semantic" -> hotelService.semanticSearch(q.trim(), topK, city, maxPrice);
            default -> throw new IllegalArgumentException("Tham số 'mode' phải là 'keyword' hoặc 'semantic'");
        };

        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/hotels/{id}/similar?topK=5 : Tìm khách sạn tương tự
     */
    @GetMapping("/{id}/similar")
    public ResponseEntity<List<SearchResult>> findSimilar(
            @PathVariable String id,
            @RequestParam(defaultValue = "5") int topK
    ) {
        List<SearchResult> results = hotelService.findSimilar(id, topK);
        return ResponseEntity.ok(results);
    }
}
