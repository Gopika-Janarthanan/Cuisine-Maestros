package com.chefbooking.dto;

import com.chefbooking.entity.UserRole;
import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private UserRole role; // CUSTOMER or CHEF

    // Optional Chef details if role is CHEF
    private String cuisineSpecialty;
    private int experienceYears;
    private double hourlyRate;
    private String location;
    private String bio;
}
