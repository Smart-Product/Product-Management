package io.github.smart.product.management.controller.api;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.github.smart.product.management.dto.CredentialsDto;
import io.github.smart.product.management.dto.TokenDto;
import io.github.smart.product.management.dto.UsuarioDto;
import io.github.smart.product.management.model.Usuario;
import io.github.smart.product.management.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UsuarioApi {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/autenticar")
    public TokenDto autenticar(@RequestBody @Valid CredentialsDto credentialsDto) {
        return usuarioService.autenticar(credentialsDto);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario salvar(@RequestBody @Valid UsuarioDto usuario) {
        return usuarioService.salvar(usuario);
    }
}
