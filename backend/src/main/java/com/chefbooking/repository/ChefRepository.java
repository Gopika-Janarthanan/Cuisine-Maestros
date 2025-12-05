package com.chefbooking.repository;

import com.chefbooking.entity.Chef;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChefRepository extends JpaRepository<Chef, Long> {
    List<Chef> findByCuisineSpecialtyContainingIgnoreCase(String cuisine);

    List<Chef> findByLocationContainingIgnoreCase(String location);

    List<Chef> findByHourlyRateLessThanEqual(double rate);
}
