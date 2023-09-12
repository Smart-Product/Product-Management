package io.github.smart.product.management.controller.errors;

import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import io.github.smart.product.management.exception.ProductNotFoundException;

@RestControllerAdvice
public class ApplicationControllerAdvance {

	// @ExceptionHandler(RuntimeException.class)
	// @ResponseStatus(HttpStatus.BAD_REQUEST)
	// public ApiErrors handlerRuntimeException(RuntimeException ex) {
	// String messageError = ex.getMessage();
	// return new ApiErrors(messageError);
	// }

	// @ExceptionHandler(ProductNotFoundException.class)
	// @ResponseStatus(HttpStatus.NOT_FOUND)
	// public ApiErrors ProductNotFoundException(ProductNotFoundException ex) {
	// String messageError = ex.getMessage();
	// return new ApiErrors(messageError);
	// }

	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ApiErrors handlerMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
		return new ApiErrors(ex.getBindingResult().getAllErrors().stream().map(error -> {
			return error.getDefaultMessage();
		}).collect(Collectors.toList()));
	}
}