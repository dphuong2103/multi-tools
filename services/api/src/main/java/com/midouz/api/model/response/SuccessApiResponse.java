package com.midouz.api.model.response;

public class SuccessApiResponse<T> extends ApiResponse<T>{
    public SuccessApiResponse(T data){
        super(true, data, null, null);
    }
}
