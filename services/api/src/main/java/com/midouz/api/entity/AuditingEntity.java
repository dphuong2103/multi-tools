package com.midouz.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
@Getter
@Setter
public abstract class AuditingEntity {

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdTime;

    @CreatedBy
    @Column(name="created_by", nullable = false, updatable = false)
    private String createdBy;

    @LastModifiedDate
    @Column(name= "last_modified_at", insertable = false)
    private Instant updatedTime;

    @LastModifiedBy
    @Column(name="last_modified_by", insertable = false)
    private String updatedBy;
}
