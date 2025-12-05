package com.chefbooking.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "chefs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Chef {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    private String cuisineSpecialty; // e.g., "Italian, Mexican"

    private int experienceYears;

    private double hourlyRate;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private double rating;

    private String location; // e.g., "New York, NY"

    private boolean available = true;
}
