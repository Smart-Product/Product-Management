package io.github.smart.product.management.exception;

public class UserCPFFoundException extends RuntimeException {

    public UserCPFFoundException() {
        super("Usuário com CPF já existente!");
    }
}
