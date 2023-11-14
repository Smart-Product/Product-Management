package io.github.smart.product.management.controller.errors;

import java.util.Arrays;
import java.util.List;

public class ApiErrors {

    private List<String> message;

    public ApiErrors(List<String> errors) {
        this.message = errors;
    }

    public ApiErrors(String messageError) {
        this.message = Arrays.asList(messageError);
    }

    public List<String> getMessage() {
        return message;
    }
}
