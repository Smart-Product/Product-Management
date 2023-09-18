package io.github.smart.product.management.context;

import io.github.smart.product.management.security.jwt.JwtClaims;

public class AppProviders {
    public static final ThreadLocal<JwtClaims> JWT_CLAIMS = new ThreadLocal<JwtClaims>();
    public static final ThreadLocal<String> JWT_CURRENT = new ThreadLocal<String>();
}
