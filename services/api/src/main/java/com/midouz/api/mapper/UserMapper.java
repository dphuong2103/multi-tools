package com.midouz.api.mapper;

import com.midouz.api.entity.User;
import com.midouz.api.model.request.SignUpRequest;
import com.midouz.api.model.response.UserResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(SignUpRequest request);
    UserResponse toUserResponse(User user);
}
