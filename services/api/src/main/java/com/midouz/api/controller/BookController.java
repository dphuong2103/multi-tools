package com.midouz.api.controller;

import com.midouz.api.model.request.CreateBookRequest;
import com.midouz.api.model.request.UpdateBookRequest;
import com.midouz.api.model.response.ApiResponse;
import com.midouz.api.model.response.BookResponse;
import com.midouz.api.model.response.SuccessApiResponse;
import com.midouz.api.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/books")
@RequiredArgsConstructor
@Slf4j
public class BookController {
    private final BookService bookService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public ApiResponse<BookResponse> create(@RequestBody @Valid CreateBookRequest input){
        log.info("BookController::create - title: {}", input.getName());
        return new SuccessApiResponse<>(BookResponse.from(bookService.create(input)));
    }

    @PutMapping
    public ApiResponse<BookResponse> update(@RequestBody UpdateBookRequest input){
        log.info("BookController::update - title: {}", input.getName());
        return new SuccessApiResponse<>(BookResponse.from(bookService.update(input)));
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<BookResponse> getBookById(@PathVariable Long id) throws InterruptedException {
        return new SuccessApiResponse<>(bookService.getBookById(id));
    }
}
