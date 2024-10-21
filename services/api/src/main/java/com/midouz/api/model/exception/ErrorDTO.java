package com.midouz.api.model.exception;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class ErrorDTO {
    private String code;
    private String en;
    private String vn;

    public static ErrorDTO from(ErrorCode error){
        return ErrorDTO.builder()
                .code(error.getCode())
                .en(error.getEnglishMessage())
                .vn(error.getVietnameseMessage())
                .build();
    }
}
