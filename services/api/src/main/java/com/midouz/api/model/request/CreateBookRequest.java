package com.midouz.api.model.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateBookRequest {
    @NotEmpty(message = "USERNAME_INVALID")
    private String name;

    @NotEmpty(message = "TEST_ERROR")
    private String test;
}
