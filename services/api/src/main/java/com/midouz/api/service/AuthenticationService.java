package com.midouz.api.service;

import com.midouz.api.entity.User;
import com.midouz.api.entity.UserToken;
import com.midouz.api.mapper.UserMapper;
import com.midouz.api.model.exception.AppException;
import com.midouz.api.model.exception.ErrorCode;
import com.midouz.api.model.response.AuthenticationResponse;
import com.midouz.api.model.request.LoginRequest;
import com.midouz.api.model.request.SignUpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserTokenService userTokenService;
    private final UserMapper userMapper;
    public AuthenticationResponse signUp(SignUpRequest request) {
        if (isEmailExist(request.getEmail())) {
            throw new AppException(ErrorCode.DUPLICATE_EMAIL,String.format("Account %s does not exist", request.getEmail()));
        }
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        User user = request.toUser(encodedPassword);
        userService.save(user);
        String accessToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        Instant now = Instant.now();
        UserToken userToken = UserToken
                .builder()
                .user(user)
                .tokenValue(refreshToken)
                .tokenType(UserToken.TokenType.REFRESH)
                .createdAt(now)
                .updatedAt(now)
                .expirationTime(jwtService.extractExpirationInstant(refreshToken))
                .build();
        userTokenService.save(userToken);
        return new AuthenticationResponse(userMapper.toUserResponse(user), accessToken ,refreshToken);
    }

    public AuthenticationResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user = userService.getUserEntityByEmail(request.getEmail());
        String jwt = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        Instant now = Instant.now();
        UserToken userToken = UserToken
                .builder()
                .user(user)
                .tokenValue(refreshToken)
                .tokenType(UserToken.TokenType.REFRESH)
                .createdAt(now)
                .updatedAt(now)
                .expirationTime(jwtService.extractExpirationInstant(refreshToken))
                .build();
        userTokenService.save(userToken);
        return new AuthenticationResponse(userMapper.toUserResponse(user), jwt, refreshToken);
    }

    private boolean isEmailExist(String email) {
        return userService.existsByEmail(email);
    }
}
