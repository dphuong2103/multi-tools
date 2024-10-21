package com.midouz.api.controller;

import com.midouz.api.constant.API;
import com.midouz.api.model.response.AuthenticationResponse;
import com.midouz.api.model.request.LoginRequest;
import com.midouz.api.model.request.SignUpRequest;
import com.midouz.api.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(API.API_V1_PREFIX+"authenticate")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthenticationResponse register(@RequestBody SignUpRequest request){
        return authenticationService.signUp(request);
    }

    @PostMapping("login")
    @ResponseStatus(HttpStatus.OK)
    public AuthenticationResponse login(@RequestBody LoginRequest request){
        return authenticationService.login(request);
    }

}
