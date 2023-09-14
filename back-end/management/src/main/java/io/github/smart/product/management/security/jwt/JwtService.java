package io.github.smart.product.management.security.jwt;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.LinkedHashMap;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.github.smart.product.management.exception.ExpiredTokenException;
import io.github.smart.product.management.exception.InvalidTokenException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;

@Service
public class JwtService {

    @Value("${security.jwt.expiration}")
    private Integer expiration;

    @Value("${security.jwt.signing-key}")
    private String signingKey;

    public String generateToken(JwtClaims claims) {
        Date issuedAt = new Date();
        long exp = Long.valueOf(expiration);
        LocalDateTime dataHoraExpiracao = LocalDateTime.now().plusMinutes(exp);
        Instant instant = dataHoraExpiracao.atZone(ZoneId.systemDefault()).toInstant();
        Date data = Date.from(instant);
        return generateJwt(claims, data, issuedAt);
    }

    private String generateJwt(JwtClaims claims, Date data, Date issuedAt) {
        return Jwts
                .builder()
                .setSubject(claims.getUsuarioId().toString())
                .setExpiration(data)
                .setIssuedAt(issuedAt)
                .signWith(SignatureAlgorithm.HS512, signingKey)
                .claim("dados", claims)
                .compact();
    }

    public Claims getBody(String token) {
        validateToken(token);
        return Jwts
                .parser()
                .setSigningKey(getSigningKey())
                .parseClaimsJws(token)
                .getBody();
    }

    public void validateToken(String token) {
        try {
            if (StringUtils.isBlank(token)) {
                throw new InvalidTokenException();
            }
            Jwts.parser().setSigningKey(getSigningKey()).parseClaimsJws(token);
        } catch (SignatureException | IllegalArgumentException | MalformedJwtException e) {
            throw new InvalidTokenException();
        } catch (ExpiredJwtException e) {
            throw new ExpiredTokenException();
        }
    }

    @SuppressWarnings("unchecked")
    public JwtClaims getClaims(String token) {
        LinkedHashMap<String, Object> claims = getBody(token).get("dados", LinkedHashMap.class);
        ObjectMapper mapper = new ObjectMapper();
        return mapper.convertValue(claims, JwtClaims.class);
    }

    public String getSubjectToken(String token) throws ExpiredJwtException {
        return getBody(token).get("sub", String.class);
    }

    public Integer getExpiration() {
        return expiration;
    }

    public String getSigningKey() {
        return signingKey;
    }

}
