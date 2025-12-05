package com.chefbooking.controller;

import com.chefbooking.entity.Booking;
import com.chefbooking.entity.Chef;
import com.chefbooking.entity.User;
import com.chefbooking.repository.BookingRepository;
import com.chefbooking.repository.ChefRepository;
import com.chefbooking.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final ChefRepository chefRepository;

    @PostMapping
    @SuppressWarnings("null")
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request) {
        try {
            if (request.getUserId() == null || request.getChefId() == null) {
                return ResponseEntity.badRequest().body("User ID and Chef ID must not be null");
            }
            User user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            Chef chef = chefRepository.findById(request.getChefId())
                    .orElseThrow(() -> new RuntimeException("Chef not found"));

            Booking booking = new Booking();
            booking.setUser(user);
            booking.setChef(chef);
            booking.setBookingTime(request.getBookingTime());
            booking.setNumberOfGuests(request.getNumberOfGuests());
            booking.setSpecialRequests(request.getSpecialRequests());
            booking.setStatus(Booking.BookingStatus.PENDING);

            return ResponseEntity.ok(bookingRepository.save(booking));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(@PathVariable Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    @GetMapping("/chef/{chefId}")
    public List<Booking> getChefBookings(@PathVariable Long chefId) {
        return bookingRepository.findByChefId(chefId);
    }

    @PutMapping("/{id}/status")
    @SuppressWarnings("null")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        try {
            String statusStr = payload.get("status");
            Booking.BookingStatus newStatus = Booking.BookingStatus.valueOf(statusStr);

            Booking booking = bookingRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Booking not found"));

            booking.setStatus(newStatus);
            return ResponseEntity.ok(bookingRepository.save(booking));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Data
    public static class BookingRequest {
        private Long userId;
        private Long chefId;
        private LocalDateTime bookingTime;
        private int numberOfGuests;
        private String specialRequests;
    }
}
