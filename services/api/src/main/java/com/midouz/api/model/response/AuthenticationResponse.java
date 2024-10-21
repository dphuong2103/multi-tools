package com.midouz.api.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AuthenticationResponse {
    private UserResponse user;
    private String accessToken;
    private String refreshToken;
}