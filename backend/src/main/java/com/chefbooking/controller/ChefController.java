package com.chefbooking.controller;

import com.chefbooking.entity.Chef;
import com.chefbooking.repository.ChefRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chefs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allow frontend access
public class ChefController {

    private final ChefRepository chefRepository;

    @GetMapping
    public List<Chef> getAllChefs() {
        return chefRepository.findAll();
    }

    @GetMapping("/search")
    public List<Chef> searchChefs(
            @RequestParam(required = false) String cuisine,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Double maxRate) {
        if (cuisine != null && !cuisine.isEmpty()) {
            return chefRepository.findByCuisineSpecialtyContainingIgnoreCase(cuisine);
        } else if (location != null && !location.isEmpty()) {
            return chefRepository.findByLocationContainingIgnoreCase(location);
        } else if (maxRate != null) {
            return chefRepository.findByHourlyRateLessThanEqual(maxRate);
        } else {
            return chefRepository.findAll();
        }
    }

    @GetMapping("/{id}")
    public Chef getChefById(@PathVariable Long id) {
        if (id == null)
            throw new RuntimeException("ID cannot be null");
        return chefRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chef not found"));
    }
}
