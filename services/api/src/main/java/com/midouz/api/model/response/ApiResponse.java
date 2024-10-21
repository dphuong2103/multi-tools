package com.midouz.api.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.midouz.api.model.exception.ErrorDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
@Data
public class ApiResponse<T> {
    boolean isSuccess;
    T data;
    String message;
    List<ErrorDTO> errors;
}
