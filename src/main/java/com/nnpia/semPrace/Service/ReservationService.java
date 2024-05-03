package com.nnpia.semPrace.Service;

import com.nnpia.semPrace.DTO.ReservationDto;
import com.nnpia.semPrace.DTO.ReservationFullDto;
import com.nnpia.semPrace.Entity.AppUser;
import com.nnpia.semPrace.Entity.Car;
import com.nnpia.semPrace.Entity.Reservation;
import com.nnpia.semPrace.Repository.IAppUserRepository;
import com.nnpia.semPrace.Repository.ICarRepository;
import com.nnpia.semPrace.Repository.IReservationRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.TimeZone;

@Service
public class ReservationService {


    @Autowired
    private IReservationRepository reservationRepository;

    @Autowired
    private ICarRepository carRepository;

    @Autowired
    private IAppUserRepository userRepository;

    @Transactional
    public Reservation createReservation(ReservationDto reservationDto, Long userId) throws Exception {
        Optional<AppUser> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            throw new Exception("Uživatel neexistuje.");
        }

        Optional<Car> carOptional = carRepository.findById(reservationDto.getCarId());
        if (!carOptional.isPresent()) {
            throw new Exception("Vůz neexistuje.");
        }

        Date now = new Date();
        if (reservationDto.getStartTime().before(now) || reservationDto.getEndTime().before(now)) {
            throw new Exception("Rezervace nemůže být v minulosti.");
        }

        if (reservationDto.getEndTime().before(reservationDto.getStartTime())) {
            throw new Exception("Konec rezervace musí být po začátku rezervace.");
        }

        List<Reservation> existingReservations = reservationRepository.findByReservedCarIdAndEndTimeGreaterThanEqualAndStartTimeLessThanEqual(
                reservationDto.getCarId(),
                reservationDto.getStartTime(),
                reservationDto.getEndTime()
        );

        if (!existingReservations.isEmpty()) {
            throw new Exception("Existuje konflikt v rezervacích pro toto vozidlo v zadaném časovém období.");
        }

        Reservation reservation = new Reservation();
        reservation.setAppUser(userOptional.get());
        reservation.setReservedCar(carOptional.get());
        reservation.setStartTime(reservationDto.getStartTime());
        reservation.setEndTime(reservationDto.getEndTime());

        return reservationRepository.save(reservation);
    }

    public ReservationFullDto getReservationById(Long id) throws Exception {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        if (!reservation.isPresent()) {
            throw new Exception("Reservation with ID " + id + " not found");
        }
        return convertToDto(reservation.get());
    }

    private ReservationFullDto convertToDto(Reservation reservation) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
        dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));

        ReservationFullDto dto = new ReservationFullDto();
        dto.setId(reservation.getId());
        dto.setUserEmail(reservation.getAppUser().getEmail());
        dto.setCarModel(reservation.getReservedCar().getModel());
        dto.setStartTime(dateFormat.format(reservation.getStartTime()));
        dto.setEndTime(dateFormat.format(reservation.getEndTime()));
        return dto;
    }

    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }
}
