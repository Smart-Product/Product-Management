package io.github.smart.product.management.exception;

public class InvalidTokenException extends RuntimeException {

    public InvalidTokenException() {
        super("Token inválido.");
    }
}
