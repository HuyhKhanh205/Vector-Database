package iuh.fit.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

/**
 * Record chứa thông tin chi tiết một khách sạn
 */
public record Hotel(
        String id,
        String name,
        String city,
        @JsonProperty("price") long price,
        int stars,
        String description,
        List<String> amenities
) {}
