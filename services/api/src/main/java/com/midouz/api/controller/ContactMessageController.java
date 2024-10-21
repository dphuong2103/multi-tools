package com.midouz.api.controller;

import com.midouz.api.model.request.CreateContactMessageRequest;
import com.midouz.api.model.response.ApiResponse;
import com.midouz.api.model.response.SuccessApiResponse;
import com.midouz.api.service.ContactMessageService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import static com.midouz.api.constant.API.API_V1_PREFIX;

@RestController
@RequestMapping(API_V1_PREFIX+"contact-us")
@RequiredArgsConstructor
public class ContactMessageController {
    private final ContactMessageService contactMessageService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<Void> create(@RequestBody @Valid CreateContactMessageRequest createContactMessageRequest, HttpServletRequest request){
        String ipAddress = request.getRemoteAddr();
        contactMessageService.create(createContactMessageRequest, ipAddress);
        return new SuccessApiResponse<>(null);
    }
}
