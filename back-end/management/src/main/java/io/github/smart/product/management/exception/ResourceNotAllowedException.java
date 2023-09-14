package io.github.smart.product.management.exception;

public class ResourceNotAllowedException extends RuntimeException {
    public ResourceNotAllowedException() {
        super("Acesso Negado!");
    }
}
