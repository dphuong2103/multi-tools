package com.midouz.api.entity;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

@Entity
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "contact_message")
@NoArgsConstructor
public class ContactMessage extends DateTimeAuditingEntity {
    @Id
    @UuidGenerator
    private String id;

    @Nonnull
    @Column(name="name")
    private String name;

    @Nonnull
    @Column(name="email")
    private String email;

    @Nonnull
    @Column(name="message")
    private String message;

    @Nonnull
    @Column(name="ip_address")
    private String ipAddress;
}
