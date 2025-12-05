package com.chefbooking.controller;

import com.chefbooking.entity.Chef;
import com.chefbooking.entity.Rating;
import com.chefbooking.entity.User;
import com.chefbooking.repository.ChefRepository;
import com.chefbooking.repository.RatingRepository;
import com.chefbooking.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RatingController {

    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;
    private final ChefRepository chefRepository;

    @PostMapping
    @SuppressWarnings("null")
    public ResponseEntity<?> addRating(@RequestBody RatingRequest request) {
        try {
            if (request.getUserId() == null || request.getChefId() == null) {
                return ResponseEntity.badRequest().body("User ID and Chef ID must not be null");
            }

            User user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            Chef chef = chefRepository.findById(request.getChefId())
                    .orElseThrow(() -> new RuntimeException("Chef not found"));

            Rating rating = new Rating();
            rating.setUser(user);
            rating.setChef(chef);
            rating.setScore(request.getScore());
            rating.setComment(request.getComment());

            Rating savedRating = ratingRepository.save(rating);

            // Update Chef's average rating
            updateChefAverageRating(chef);

            return ResponseEntity.ok(savedRating);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/chef/{chefId}")
    public List<Rating> getChefRatings(@PathVariable Long chefId) {
        return ratingRepository.findByChefId(chefId);
    }

    private void updateChefAverageRating(Chef chef) {
        List<Rating> ratings = ratingRepository.findByChefId(chef.getId());
        double avg = ratings.stream().mapToInt(Rating::getScore).average().orElse(0.0);
        chef.setRating(Math.round(avg * 10.0) / 10.0); // Round to 1 decimal
        chefRepository.save(chef);
    }

    @Data
    public static class RatingRequest {
        private Long userId;
        private Long chefId;
        private int score;
        private String comment;
    }
}
