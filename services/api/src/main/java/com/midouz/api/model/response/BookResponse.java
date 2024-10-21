package com.midouz.api.model.response;

import com.midouz.api.entity.Book;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class BookResponse implements Serializable {
    private Long id;
    private String name;

    public static BookResponse from(Book book){
        return BookResponse.builder()
                .id(book.getId())
                .name(book.getName())
                .build();
    }


}
