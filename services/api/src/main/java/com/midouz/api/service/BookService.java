package com.midouz.api.service;

import com.midouz.api.entity.Book;
import com.midouz.api.model.request.CreateBookRequest;
import com.midouz.api.model.request.UpdateBookRequest;
import com.midouz.api.model.response.BookResponse;
import com.midouz.api.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;

    public Book create(CreateBookRequest request){
        Book book = Book.builder().name(request.getName()).build();
        bookRepository.save(book);
        return book;
    }

    public Book update(UpdateBookRequest request){
        Book book = bookRepository.findById(request.getId()).orElseThrow(()-> new RuntimeException("Book not found"));
        book.setName(request.getName());
        bookRepository.save(book);
        return book;
    }

    @Cacheable(key="#id", value="Book")
    public BookResponse getBookById(Long id) throws InterruptedException {
        longRunningTask();
        Book book = bookRepository.findById(id).orElseThrow(()->new RuntimeException("Book not found exception"));
        return BookResponse.from(book);
    }

    //    @GetMapping("/{id}")
//    @Cacheable(key = "#id",value = "Product",unless = "#result.price > 1000")
//    public Product findProduct(@PathVariable int id) {
//        return dao.findProductById(id);
//    }

//    @DeleteMapping("/{id}")
//    @CacheEvict(key = "#id",value = "Product")
//    public String remove(@PathVariable int id) {
//        return dao.deleteProduct(id);
//    }

    public void longRunningTask() throws InterruptedException {
        Thread.currentThread().sleep(3000);
    }
}
