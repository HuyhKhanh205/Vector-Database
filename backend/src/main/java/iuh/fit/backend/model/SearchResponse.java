package iuh.fit.backend.model;

import java.util.List;

/**
 * Cấu trúc JSON trả về của API tìm kiếm:
 * { "mode": "...", "tookMs": 12, "results": [ ... ] }
 */
public record SearchResponse(
        String mode,
        long tookMs,
        List<SearchResult> results
) {}
