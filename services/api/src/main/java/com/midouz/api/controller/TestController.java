package com.midouz.api.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/test")
public class TestController {
//    @GetMapping
//    @PreAuthorize("hasAuthority('USER_GET_POST')")
//    public String test() {
//        return "Alive";
//    }

    @PostMapping
    public String post() {
        return "Post";
    }

    @GetMapping
    public String test() {
        return "Alive";
    }
}
