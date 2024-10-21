package com.midouz.api.model.request;

import com.midouz.api.entity.ContactMessage;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateContactMessageRequest {
    @NotBlank(message= "CONTACT_MESSAGE_EMPTY_NAME")
    private String name;
    @NotBlank(message="CONTACT_MESSAGE_EMPTY_EMAIL")
    private String email;
    @NotBlank(message="CONTACT_MESSAGE_EMPTY_MESSAGE")
    private String message;

    public ContactMessage convertToEntity (String ipAddress){
        return ContactMessage.builder()
                .name(this.name)
                .email(this.email)
                .ipAddress(ipAddress)
                .message(this.message)
                .build();
    }
}
