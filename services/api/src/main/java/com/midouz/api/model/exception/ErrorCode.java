package com.midouz.api.model.exception;

import io.netty.util.internal.StringUtil;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.util.StringUtils;

import java.util.Objects;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION("UNCATEGORIZED_EXCEPTION", "Uncategorized error","Lỗi không xác định!", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY("INVALID_KEY", "Uncategorized error","Lỗi không xác định!", HttpStatus.BAD_REQUEST),
    USER_EXISTED("USER_EXISTED", "User existed","Người dùng đã tồn tại", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED("USER_NOT_EXISTED", "User not existed","Người dùng không tồn tại", HttpStatus.BAD_REQUEST),
    BOOK_NOT_FOUND("BOOK_NOT_FOUND", "Book not found exception","Không tìm thấy sách", HttpStatus.NOT_FOUND),
    DUPLICATE_EMAIL("DUPLICATE_EMAIL", "Duplicate email exception","Email đã tồn tại", HttpStatus.BAD_REQUEST),
    TOKEN_NOT_FOUND("TOKEN_NOT_FOUND", "Token not found exception","Không tìm thấy token", HttpStatus.NOT_FOUND),
    CONTACT_MESSAGE_EMPTY_NAME("CONTACT_MESSAGE_EMPTY_NAME", "Name is empty","Tên rỗng!", HttpStatus.BAD_REQUEST),
    CONTACT_MESSAGE_EMPTY_EMAIL("CONTACT_MESSAGE_EMPTY_EMAIL", "Email is empty","Email rỗng!", HttpStatus.BAD_REQUEST),
    CONTACT_MESSAGE_EMPTY_MESSAGE("CONTACT_MESSAGE_EMPTY_MESSAGE", "Message is empty","Lời nhắn rỗng!", HttpStatus.BAD_REQUEST),
    ;

    ErrorCode(String code, String englishMessage,String vietnameseMessage, HttpStatusCode statusCode) {
        this.code = code;
        this.englishMessage = englishMessage;
        this.vietnameseMessage = vietnameseMessage;
        this.statusCode = statusCode;
    }

    private final String code;
    private final String englishMessage;
    private final String vietnameseMessage;
    private final HttpStatusCode statusCode;

    public static ErrorCode getByCode(final String code) {
        for (final ErrorCode e : ErrorCode.values()){
            if (Objects.equals(e.getCode(), code)) {
                return e;
            }
        }
        return null;
    }
}