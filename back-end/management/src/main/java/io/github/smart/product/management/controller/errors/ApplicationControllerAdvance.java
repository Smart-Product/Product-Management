package io.github.smart.product.management.controller.errors;

import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import io.github.smart.product.management.exception.ExpiredTokenException;
import io.github.smart.product.management.exception.InvalidTokenException;
import io.github.smart.product.management.exception.ProductNotFoundException;
import io.github.smart.product.management.exception.ResourceNotAllowedException;
import io.github.smart.product.management.exception.SenhaIncorretaException;
import io.github.smart.product.management.exception.UserFoundException;

@RestControllerAdvice
public class ApplicationControllerAdvance {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ApiErrors handlerMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
		return new ApiErrors(ex.getBindingResult().getAllErrors().stream().map(error -> {
			return error.getDefaultMessage();
		}).collect(Collectors.toList()));
	}

	@ExceptionHandler(ExpiredTokenException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	public ApiErrors handlerRuntimeException(ExpiredTokenException ex) {
		String messageError = ex.getMessage();
		return new ApiErrors(messageError);
	}

	@ExceptionHandler(UsernameNotFoundException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	public ApiErrors handlerRuntimeException(UsernameNotFoundException ex) {
		String messageError = ex.getMessage();
		return new ApiErrors(messageError);
	}

	@ExceptionHandler(InvalidTokenException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public ApiErrors handlerRuntimeException(InvalidTokenException ex) {
		String messageError = ex.getMessage();
		return new ApiErrors(messageError);
	}

	@ExceptionHandler(ResourceNotAllowedException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	public ApiErrors handlerRuntimeException(ResourceNotAllowedException ex) {
		String messageError = ex.getMessage();
		return new ApiErrors(messageError);
	}

	@ExceptionHandler(SenhaIncorretaException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public ApiErrors handlerRuntimeException(SenhaIncorretaException ex) {
		String messageError = ex.getMessage();
		return new ApiErrors(messageError);
	}

	@ExceptionHandler(UserFoundException.class)
	@ResponseStatus(HttpStatus.FOUND)
	public ApiErrors handlerRuntimeException(UserFoundException ex) {
		String messageError = ex.getMessage();
		return new ApiErrors(messageError);
	}

	@ExceptionHandler(ProductNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public ApiErrors handlerRuntimeException(ProductNotFoundException ex) {
		String messageError = ex.getMessage();
		return new ApiErrors(messageError);
	}
}