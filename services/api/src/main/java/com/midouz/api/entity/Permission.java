package com.midouz.api.entity;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "permission")
public class Permission {
    @Id
    @UuidGenerator
    private String id;

    @Nonnull
    private String name;

//    @ManyToMany
//    @JoinTable(
//            name = "role_permission",
//            joinColumns = @JoinColumn(
//                    name = "permission_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(
//                    name = "role_id", referencedColumnName = "id"))
//    private Collection<Role> roles;
}
