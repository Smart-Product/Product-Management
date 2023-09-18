package io.github.smart.product.management.exception;

public class SenhaIncorretaException extends RuntimeException {

    public SenhaIncorretaException() {
        super("Senha incorreta!");
    }
}
