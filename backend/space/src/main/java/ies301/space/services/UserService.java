package ies301.space.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ies301.space.entities.user.User;
import ies301.space.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Retorna todas as Users
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    // Retorna uma User específica pelo ID
    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    // Cria uma nova User
    public User createUser(User user) {
        return userRepository.save(user);
    }
    
    public User updateUser(User user) {
        User existingUser = userRepository.findById(user.getId()).get();
        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        existingUser.setAddress(user.getAddress());
        return userRepository.save(existingUser);
    }
}
