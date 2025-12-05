package com.chefbooking.loader;

import com.chefbooking.entity.Chef;
import com.chefbooking.entity.User;
import com.chefbooking.entity.UserRole;
import com.chefbooking.repository.ChefRepository;
import com.chefbooking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ChefRepository chefRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0)
            return; // Prevent duplicates

        // Create 10 Customers
        for (int i = 1; i <= 10; i++) {
            User customer = new User();
            customer.setName("Customer " + i);
            customer.setEmail("customer" + i + "@example.com");
            customer.setPassword(passwordEncoder.encode("password"));
            customer.setRole(UserRole.CUSTOMER);
            customer.setPhoneNumber("123456789" + i);
            customer.setAddress("Customer Address " + i);
            userRepository.save(customer);
        }

        // Create 10 Chefs
        List<String> cuisines = Arrays.asList("Italian", "French", "Japanese", "Indian", "Mexican", "Thai", "Chinese",
                "Mediterranean", "Spanish", "American");
        List<String> locations = Arrays.asList("New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
                "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose");

        for (int i = 1; i <= 10; i++) {
            User chefUser = new User();
            chefUser.setName("Chef " + (char) ('A' + i - 1));
            chefUser.setEmail("chef" + i + "@example.com");
            chefUser.setPassword(passwordEncoder.encode("password"));
            chefUser.setRole(UserRole.CHEF);
            chefUser.setPhoneNumber("987654321" + i);
            chefUser.setAddress("Chef Address " + i);
            userRepository.save(chefUser);

            Chef chef = new Chef();
            chef.setUser(chefUser);
            chef.setCuisineSpecialty(cuisines.get(i - 1));
            chef.setExperienceYears(5 + i);
            chef.setHourlyRate(50 + (i * 10)); // Rates like 60, 70, etc.
            chef.setLocation(locations.get(i - 1));
            chef.setBio("Passionate " + cuisines.get(i - 1) + " chef with over " + (5 + i)
                    + " years of experience creating culinary masterpieces.");
            chef.setRating(4.0 + (i % 2 == 0 ? 0.5 : 0.2)); // Random ratings

            chefRepository.save(chef);
        }

        System.out.println("Dummy data loaded: 10 Customers and 10 Chefs.");
    }
}
