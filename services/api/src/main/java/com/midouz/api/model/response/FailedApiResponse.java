package com.midouz.api.model.response;

import com.midouz.api.model.exception.ErrorDTO;

import java.util.*;

public class FailedApiResponse extends ApiResponse<Void> {
    public FailedApiResponse(List<ErrorDTO> errors){
        super(false, null, null, errors);
    }
}
