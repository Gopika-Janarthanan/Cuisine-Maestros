package com.chefbooking.repository;

import com.chefbooking.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByChefId(Long chefId);
}
