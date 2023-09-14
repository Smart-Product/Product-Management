package io.github.smart.product.management.exception;

public class ExpiredTokenException extends RuntimeException {

    public ExpiredTokenException() {
        super("Token expirado!");
    }
}
