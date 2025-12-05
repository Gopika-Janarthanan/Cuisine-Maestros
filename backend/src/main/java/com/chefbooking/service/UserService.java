package com.chefbooking.service;

import com.chefbooking.dto.LoginRequest;
import com.chefbooking.dto.RegisterRequest;
import com.chefbooking.entity.Chef;
import com.chefbooking.entity.User;
import com.chefbooking.entity.UserRole;
import com.chefbooking.repository.ChefRepository;
import com.chefbooking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ChefRepository chefRepository;
    private final PasswordEncoder passwordEncoder;

    public User register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        // Save user first
        User savedUser = userRepository.save(user);

        // If role is CHEF, create chef profile
        if (request.getRole() == UserRole.CHEF) {
            Chef chef = new Chef();
            chef.setUser(savedUser);
            chef.setCuisineSpecialty(request.getCuisineSpecialty());
            chef.setExperienceYears(request.getExperienceYears());
            chef.setHourlyRate(request.getHourlyRate());
            chef.setBio(request.getBio());
            chef.setLocation(request.getLocation());
            chef.setAvailable(true);

            chefRepository.save(chef);
        }

        return savedUser;
    }

    public User login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}
