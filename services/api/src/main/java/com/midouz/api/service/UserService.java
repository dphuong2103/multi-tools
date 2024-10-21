package com.midouz.api.service;

import com.midouz.api.entity.User;
import com.midouz.api.mapper.UserMapper;
import com.midouz.api.model.exception.AppException;
import com.midouz.api.model.exception.ErrorCode;
import com.midouz.api.model.response.UserResponse;
import com.midouz.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserMapper userMapper;
    private final UserRepository userRepository;

    public UserResponse getUserById(String userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED, String.format("User %s not found", userId)));
        return userMapper.toUserResponse(user);
    };

    public User getUserEntityById(String userId) {
        return userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED, String.format("User %s not found", userId)));
    }

    public User getUserEntityByEmail(String email){
        return userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED, String.format("User %s not found", email)));
    }

    public User save(User user){
        return userRepository.save(user);
    }

    public boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }
}