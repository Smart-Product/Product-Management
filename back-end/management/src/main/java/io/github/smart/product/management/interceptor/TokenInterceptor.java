package io.github.smart.product.management.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import io.github.smart.product.management.annotations.TokenRequired;
import io.github.smart.product.management.context.AppProviders;
import io.github.smart.product.management.exception.ExpiredTokenException;
import io.github.smart.product.management.exception.ResourceNotAllowedException;
import io.github.smart.product.management.security.jwt.JwtClaims;
import io.github.smart.product.management.security.jwt.JwtService;

@Component
public class TokenInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    private JwtService jwtService;

    @Override
    public boolean preHandle(HttpServletRequest request,
            HttpServletResponse response,
            Object handler) throws ExpiredTokenException {
        if (handler instanceof HandlerMethod) {
            String token = request.getHeader("Authorization");
            validateToken(handler, token, response);
        }
        return true;
    }

    private void validateToken(Object handler, String token, HttpServletResponse response) {
        TokenRequired tokenRequiredAnnotation = ((HandlerMethod) handler).getMethod()
                .getAnnotation(TokenRequired.class);
        if (tokenRequiredAnnotation != null) {
            if (token == null) {
                throw new ResourceNotAllowedException();
            } else {
                token = token.replace("Bearer ", "").replace("bearer ", "");
                token = !token.equals("null") ? token : null;
                if (token != null) {
                    JwtClaims claims = jwtService.getClaims(token);
                    AppProviders.JWT_CLAIMS.set(claims);
                    token = jwtService.generateToken(claims);
                    response.setHeader("Authorization", token);
                    AppProviders.JWT_CURRENT.set(token);
                }
            }
        }

    }
}
