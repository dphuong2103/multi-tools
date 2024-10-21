package com.midouz.api.model.response;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Builder
@Data
public class UserResponse {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private Instant createdTime;
    private Instant lastLoggingTime;
}
