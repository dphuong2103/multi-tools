package com.midouz.api.service;

import com.midouz.api.model.request.CreateContactMessageRequest;
import com.midouz.api.repository.ContactMessageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ContactMessageService {
    private final ContactMessageRepository contactMessageRepository;

    public void create(CreateContactMessageRequest request, String ipAddress){
        var contactMessage = request.convertToEntity(ipAddress);
        contactMessageRepository.save(contactMessage);
    }
}
