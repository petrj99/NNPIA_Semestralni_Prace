package com.nnpia.semPrace.Controller;

import com.nnpia.semPrace.Entity.AppUser;
import com.nnpia.semPrace.Entity.Car;
import com.nnpia.semPrace.Entity.Reservation;
import com.nnpia.semPrace.Repository.IAppUserRepository;
import com.nnpia.semPrace.Repository.ICarRepository;
import com.nnpia.semPrace.Repository.IReservationRepository;
import com.nnpia.semPrace.Security.SecurityConfiguration;
import com.nnpia.semPrace.Service.ReservationService;
import com.nnpia.semPrace.DTO.ReservationDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Calendar;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@Import({SecurityConfiguration.class, UserController.class, ReservationService.class})
public class ReservationIntegrationTest {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private IReservationRepository reservationRepository;

    @Autowired
    private IAppUserRepository appUserRepository;

    @Autowired
    private ICarRepository carRepository;

    @Test
    @Transactional
    void testCreateReservation() throws Exception {
        Calendar calendar = Calendar.getInstance();
        calendar.set(1990, Calendar.JANUARY, 1);

        Date birthDate = calendar.getTime();

        AppUser user = new AppUser();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setDateOfBirth(birthDate);
        user.setEmail("johndoe@example.com");
        user.setPassword("password");
        appUserRepository.save(user);

        Car car = new Car();
        car.setLicencePlate("ABC-1234");
        car.setMake("Tesla");
        car.setModel("Model S");
        car.setMileage(50000);
        car.setPrice(80000);
        car.setYear(2020);
        car.setId(1L);
        carRepository.save(car);

        ReservationDto reservationDto = new ReservationDto();
        reservationDto.setCarId(1L);
        reservationDto.setStartTime(new Date(System.currentTimeMillis() + 10000));
        reservationDto.setEndTime(new Date(System.currentTimeMillis() + 20000));

        Reservation reservation = reservationService.createReservation(reservationDto, user.getId());

        assertNotNull(reservation);
        assertNotNull(reservationRepository.findById(reservation.getId()).orElse(null));
    }
}
