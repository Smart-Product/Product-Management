package io.github.smart.product.management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.smart.product.management.dto.CredentialsDto;
import io.github.smart.product.management.dto.TokenDto;
import io.github.smart.product.management.exception.SenhaInvalidaException;
import io.github.smart.product.management.exception.UserCPFFoundException;
import io.github.smart.product.management.model.Usuario;
import io.github.smart.product.management.repository.UsuarioRepository;
import io.github.smart.product.management.security.jwt.JwtClaims;
import io.github.smart.product.management.security.jwt.JwtService;

@Service
public class UsuarioService {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public TokenDto autenticar(CredentialsDto credentialsDto) {
        try {
            Usuario usuario = new Usuario();
            if (credentialsDto.getLogin().contains("@")) {
                usuario = usuarioRepository.findByEmail(credentialsDto.getLogin())
                        .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
            } else {
                usuario = usuarioRepository.findByCpf(credentialsDto.getLogin().replaceAll("\\D", ""))
                        .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
            }
            boolean senhaMatch = encoder.matches(credentialsDto.getSenha(), usuario.getSenha());
            if (!senhaMatch) {
                throw new SenhaInvalidaException();
            }

            JwtClaims jwtClaims = new JwtClaims();
            jwtClaims.setCpf(usuario.getCpf());
            jwtClaims.setEmail(usuario.getEmail());
            jwtClaims.setNome(usuario.getNome());
            jwtClaims.setUsuarioId(usuario.getUsuarioId());
            String token = jwtService.generateToken(jwtClaims);

            return new TokenDto(jwtClaims.getNome(), token);
        } catch (UsernameNotFoundException | SenhaInvalidaException e) {
            throw e;
        }
    }

    @Transactional
    public Usuario salvar(Usuario usuario) throws UserCPFFoundException {
        try {
            if (usuarioRepository.findByCpf(usuario.getCpf()).isPresent()) {
                throw new UserCPFFoundException();
            }
            String senhaCriptografada = encoder.encode(usuario.getSenha());
            usuario.setSenha(senhaCriptografada);
            return usuarioRepository.save(usuario);
        } catch (UserCPFFoundException e) {
            throw e;
        }
    }

}
