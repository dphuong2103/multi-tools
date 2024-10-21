package com.midouz.api.config;

import com.midouz.api.model.exception.AppException;
import com.midouz.api.model.exception.ErrorCode;
import com.midouz.api.model.exception.ErrorDTO;
import com.midouz.api.model.response.ApiResponse;
import com.midouz.api.model.response.FailedApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.Collections;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiResponse<Void>> handleAppException(AppException e) {
        log.error("GlobalExceptionHandler::handleAppException - {}", e.getMessage(), e);
        ErrorCode error =  e.getErrorCode();
        ErrorDTO errorDTO = ErrorDTO.from(error);
        FailedApiResponse apiResponse = new FailedApiResponse(Collections.singletonList(errorDTO));
        return ResponseEntity.status(error.getStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidationExceptions(MethodArgumentNotValidException e) {
        ArrayList<ErrorDTO> errors = new ArrayList<>();
        e.getBindingResult().getAllErrors().forEach((err)->{
            ErrorCode error =  ErrorCode.getByCode(err.getDefaultMessage());

            if(error != null){
                ErrorDTO errorDTO = ErrorDTO.from(error);
                errors.add(errorDTO);
            }
        });
        log.error("GlobalExceptionHandler::handleValidationExceptions - {}", e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new FailedApiResponse(errors));
    }
}
