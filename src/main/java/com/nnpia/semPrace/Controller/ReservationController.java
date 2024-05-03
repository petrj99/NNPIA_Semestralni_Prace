package com.nnpia.semPrace.Controller;

import com.nnpia.semPrace.DTO.ReservationDto;
import com.nnpia.semPrace.DTO.ReservationFullDto;
import com.nnpia.semPrace.Entity.AppUser;
import com.nnpia.semPrace.Entity.Reservation;
import com.nnpia.semPrace.Repository.IAppUserRepository;
import com.nnpia.semPrace.Repository.IReservationRepository;
import com.nnpia.semPrace.Service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private IAppUserRepository userRepository;

    @Autowired
    private IReservationRepository reservationRepository;

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

    @GetMapping("/all-reservations")
    public ResponseEntity<List<ReservationFullDto>> getAllReservations() {
        List<Reservation> reservations = reservationRepository.findAll();
        List<ReservationFullDto> reservationDtos = reservations.stream().map(reservation -> {
            ReservationFullDto dto = new ReservationFullDto();
            dto.setId(reservation.getId());
            dto.setUserEmail(reservation.getAppUser().getEmail());
            dto.setCarModel(reservation.getReservedCar().getModel());
            dto.setStartTime(reservation.getStartTime());
            dto.setEndTime(reservation.getEndTime());
            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(reservationDtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReservationById(@PathVariable("id") Long reservationId) {
        try {
            ReservationFullDto reservation = reservationService.getReservationById(reservationId);
            return ResponseEntity.ok(reservation);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reservation not found: " + e.getMessage());
        }
    }
}
