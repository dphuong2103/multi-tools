package com.midouz.api.repository;

import com.midouz.api.entity.UserToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserTokenRepository extends JpaRepository<UserToken, String> {
    Optional<UserToken> findUserTokenByTokenValue(String token);
}
