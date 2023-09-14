package io.github.smart.product.management.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.github.smart.product.management.exception.SenhaInvalidaException;
import io.github.smart.product.management.model.Usuario;
import io.github.smart.product.management.repository.UsuarioRepository;

//Essa classe serve pra trazer o usuario da database atraves do login
@Service
public class UsuarioServiceImpl implements UserDetailsService {

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private UsuarioRepository usuarioRepository;

	public UserDetails autenticar(Usuario usuario) {
		String login;
		if (usuario.getCpf() != null) {
			login = usuario.getCpf();
		} else {
			login = usuario.getEmail();
		}
		UserDetails user = loadUserByUsername(login);
		boolean senhaBatem = encoder.matches(usuario.getSenha(), user.getPassword());
		if (senhaBatem) {
			return user;
		}
		throw new SenhaInvalidaException();
	}

	@Override
	public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
		Usuario usuario = usuarioRepository.findById(Integer.parseInt(login)).get();
		if (usuario == null) {
			if (login.contains("@")) {
				usuario = usuarioRepository.findByEmail(login)
						.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
			} else {
				usuario = usuarioRepository.findByCpf(login)
						.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
			}
		}
		return User
				.builder()
				.username(usuario.getNome())
				.password(usuario.getSenha())
				.authorities("USER")
				.build();
	}

}
