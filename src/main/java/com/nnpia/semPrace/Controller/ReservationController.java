package com.nnpia.semPrace.Controller;

import com.nnpia.semPrace.DTO.ReservationDto;
import com.nnpia.semPrace.Entity.AppUser;
import com.nnpia.semPrace.Entity.Reservation;
import com.nnpia.semPrace.Repository.IAppUserRepository;
import com.nnpia.semPrace.Service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private IAppUserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody ReservationDto reservationDto, Principal principal) {
        try {
            String userEmail = principal.getName();
            AppUser user = userRepository.findByEmail(userEmail);
            if (user == null) {
                throw new Exception("Uživatel nenalezen.");
            }
            Long userId = user.getId();
            Reservation reservation = reservationService.createReservation(reservationDto, userId);
            return ResponseEntity.ok(reservation);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
