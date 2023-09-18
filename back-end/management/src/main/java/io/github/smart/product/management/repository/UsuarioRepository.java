package io.github.smart.product.management.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.smart.product.management.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByEmail(String email);

    Optional<Usuario> findByCpf(String cpf);

}
