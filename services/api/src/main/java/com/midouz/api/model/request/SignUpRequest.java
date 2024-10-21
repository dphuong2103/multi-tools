package com.midouz.api.model.request;

import com.midouz.api.entity.User;
import jakarta.annotation.Nonnull;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Builder
@Data
public class SignUpRequest {
    @Nonnull
    private String firstName;
    @Nonnull
    private String lastName;
    @Nonnull
    private String email;
    @Nonnull
    private String password;

    public User toUser(String encodedPassword){
        Instant now = Instant.now();
        return User.builder()
                .firstName(this.firstName)
                .lastName(this.lastName)
                .email(this.email)
                .password(encodedPassword)
                .createdTime(now)
                .lastLoggingTime(now)
                .build();
    }
}
