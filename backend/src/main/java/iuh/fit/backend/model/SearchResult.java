package iuh.fit.backend.model;

/**
 * Một phần tử kết quả tìm kiếm gồm khách sạn và điểm cosine similarity (nếu là semantic)
 */
public record SearchResult(
        Hotel hotel,
        Double score // null khi mode = keyword
) {}
