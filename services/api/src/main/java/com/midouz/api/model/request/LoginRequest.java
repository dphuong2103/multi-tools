package com.midouz.api.model.request;

import jakarta.annotation.Nonnull;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class LoginRequest {
    @Nonnull
    private String email;
    @Nonnull
    private String password;
}
