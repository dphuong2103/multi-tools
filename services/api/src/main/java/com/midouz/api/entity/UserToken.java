package com.midouz.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.time.Instant;

@Entity
@Data
@Builder
@Table(name = "user_token")
@AllArgsConstructor
@NoArgsConstructor
public class UserToken {
    @Id
    @UuidGenerator
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "token_type", nullable = false)
    private TokenType tokenType;

    @Column(name = "token_value", nullable = false, columnDefinition = "TEXT")
    private String tokenValue;

    @Column(name = "expiration_time", nullable = false)
    private Instant expirationTime;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    public enum TokenType {
        ACCESS,
        REFRESH
    }
}
