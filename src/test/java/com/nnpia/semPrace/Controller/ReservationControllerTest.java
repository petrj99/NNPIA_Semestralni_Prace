package com.nnpia.semPrace.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nnpia.semPrace.Config.TestSecurityConfig;
import com.nnpia.semPrace.DTO.ReservationDto;
import com.nnpia.semPrace.DTO.ReservationFullDto;
import com.nnpia.semPrace.Entity.AppUser;
import com.nnpia.semPrace.Entity.Car;
import com.nnpia.semPrace.Entity.Reservation;
import com.nnpia.semPrace.Repository.IAppUserRepository;
import com.nnpia.semPrace.Repository.IReservationRepository;
import com.nnpia.semPrace.Service.ReservationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.security.Principal;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ReservationController.class)
@Import(TestSecurityConfig.class)
public class ReservationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReservationService reservationService;

    @MockBean
    private IAppUserRepository userRepository;

    @MockBean
    private IReservationRepository reservationRepository;

    @InjectMocks
    private ReservationController reservationController;

    @Autowired
    private ObjectMapper objectMapper;

    private AppUser user;
    private ReservationDto reservationDto;
    private Principal mockPrincipal;

    @BeforeEach
    void setUp() {
        user = new AppUser();
        user.setId(1L);
        user.setEmail("test@example.com");

        reservationDto = new ReservationDto();
        reservationDto.setCarId(1L);
        reservationDto.setStartTime(new Date(System.currentTimeMillis() + 10000)); // future start time
        reservationDto.setEndTime(new Date(System.currentTimeMillis() + 20000)); // future end time

        mockPrincipal = () -> "test@example.com";
    }

    @Test
    void testCreateReservationSuccess() throws Exception {
        Reservation reservation = new Reservation();
        reservation.setId(1L);

        when(userRepository.findByEmail("test@example.com")).thenReturn(user);
        when(reservationService.createReservation(any(ReservationDto.class), any(Long.class))).thenReturn(reservation);

        mockMvc.perform(post("/reservations")
                        .principal(mockPrincipal)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(reservationDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }

    @Test
    void testCreateReservationUserNotFound() throws Exception {
        when(userRepository.findByEmail("test@example.com")).thenReturn(null);

        mockMvc.perform(post("/reservations")
                        .principal(mockPrincipal)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(reservationDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Uživatel nenalezen."));
    }

    @Test
    void testCreateReservationConflict() throws Exception {
        when(userRepository.findByEmail("test@example.com")).thenReturn(user);
        when(reservationService.createReservation(any(ReservationDto.class), any(Long.class)))
                .thenThrow(new Exception("Existuje konflikt v rezervacích pro toto vozidlo v zadaném časovém období."));

        mockMvc.perform(post("/reservations")
                        .principal(mockPrincipal)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(reservationDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Existuje konflikt v rezervacích pro toto vozidlo v zadaném časovém období."));
    }

    @Test
    void testGetAllReservationsSuccess() throws Exception {
        Car car1 = new Car();
        car1.setId(1L);
        car1.setModel("Model A");

        Car car2 = new Car();
        car2.setId(2L);
        car2.setModel("Model B");

        Reservation reservation1 = new Reservation();
        reservation1.setId(1L);
        reservation1.setAppUser(user);
        reservation1.setReservedCar(car1);
        reservation1.setStartTime(new Date(System.currentTimeMillis() + 10000));
        reservation1.setEndTime(new Date(System.currentTimeMillis() + 20000));

        Reservation reservation2 = new Reservation();
        reservation2.setId(2L);
        reservation2.setAppUser(user);
        reservation2.setReservedCar(car2);
        reservation2.setStartTime(new Date(System.currentTimeMillis() + 30000));
        reservation2.setEndTime(new Date(System.currentTimeMillis() + 40000));

        List<Reservation> reservations = Arrays.asList(reservation1, reservation2);

        when(reservationRepository.findAll()).thenReturn(reservations);

        mockMvc.perform(get("/reservations/all-reservations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].userEmail").value("test@example.com"))
                .andExpect(jsonPath("$[0].carModel").value("Model A"))
                .andExpect(jsonPath("$[1].id").value(2L))
                .andExpect(jsonPath("$[1].userEmail").value("test@example.com"))
                .andExpect(jsonPath("$[1].carModel").value("Model B"));
    }

    @Test
    void testGetReservationByIdSuccess() throws Exception {
        ReservationFullDto reservationDto = new ReservationFullDto();
        reservationDto.setId(1L);

        when(reservationService.getReservationById(1L)).thenReturn(reservationDto);

        mockMvc.perform(get("/reservations/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }

    @Test
    void testGetReservationByIdNotFound() throws Exception {
        when(reservationService.getReservationById(1L)).thenThrow(new Exception("Reservation with ID 1 not found"));

        mockMvc.perform(get("/reservations/1"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$").value("Reservation not found: Reservation with ID 1 not found"));
    }
}
