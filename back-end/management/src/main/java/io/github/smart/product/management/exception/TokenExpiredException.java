package io.github.smart.product.management.exception;

public class TokenExpiredException extends RuntimeException {

    public TokenExpiredException() {
        super("Token expirado!");
    }
}
