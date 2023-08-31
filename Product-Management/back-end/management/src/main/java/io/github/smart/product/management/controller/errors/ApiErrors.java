package io.github.smart.product.management.controller.errors;

import java.util.Arrays;
import java.util.List;

public class ApiErrors {

    private List<String> messageErrors;

    public ApiErrors(List<String> errors) {
        this.messageErrors = errors;
    }

    public ApiErrors(String messageError) {
        this.messageErrors = Arrays.asList(messageError);
    }

    public List<String> getMessageErrors() {
        return messageErrors;
    }
}
