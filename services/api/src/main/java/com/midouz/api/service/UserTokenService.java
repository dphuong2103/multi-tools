package com.midouz.api.service;

import com.midouz.api.entity.User;
import com.midouz.api.entity.UserToken;
import com.midouz.api.mapper.UserMapper;
import com.midouz.api.model.exception.AppException;
import com.midouz.api.model.exception.ErrorCode;
import com.midouz.api.model.response.AuthenticationResponse;
import com.midouz.api.model.exception.RefreshTokenExpiredException;
import com.midouz.api.repository.UserTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class UserTokenService {
    private final UserTokenRepository userTokenRepository;
    private final UserMapper userMapper;
    private final JwtService jwtService;
    public AuthenticationResponse refreshAccessToken(String refreshToken) {
        UserToken userToken = userTokenRepository.findUserTokenByTokenValue(refreshToken).orElseThrow(()-> new AppException(ErrorCode.TOKEN_NOT_FOUND, String.format("Token %s not found", refreshToken)));
        if(userToken.getExpirationTime().compareTo(Instant.now()) < 0){
            throw new RefreshTokenExpiredException(userToken.getTokenValue());
        }
        User user = userToken.getUser();
        String accessToken = jwtService.generateToken(user);
        return new AuthenticationResponse(userMapper.toUserResponse(user),accessToken, refreshToken);
    }

    public void save(UserToken userToken){
        userTokenRepository.save(userToken);
    }
}
