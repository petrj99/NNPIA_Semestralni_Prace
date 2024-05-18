package com.nnpia.semPrace.Controller;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nnpia.semPrace.Config.TestSecurityConfig;
import com.nnpia.semPrace.DTO.RegistrationDto;
import com.nnpia.semPrace.Entity.AppUser;
import com.nnpia.semPrace.Entity.Role;
import com.nnpia.semPrace.Repository.IAppUserRepository;
import com.nnpia.semPrace.Repository.IRoleRepository;
import com.nnpia.semPrace.Security.JwtRequest;
import com.nnpia.semPrace.Security.JwtTokenUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.validation.BindingResult;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@WebMvcTest(UserController.class)
@ExtendWith(MockitoExtension.class)
@Import(TestSecurityConfig.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IAppUserRepository appUserRepository;

    @MockBean
    private IRoleRepository roleRepository;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private JwtTokenUtil jwtTokenUtil;

    @InjectMocks
    private UserController userController;

    @Autowired
    private ObjectMapper objectMapper;

    private RegistrationDto registrationDto;

    @BeforeEach
    void setUp() {
        registrationDto = new RegistrationDto();
        registrationDto.setFirstName("John");
        registrationDto.setLastName("Doe");
        LocalDate localDate = LocalDate.of(1973, 10, 28);
        registrationDto.setDateOfBirth(Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant()));
        registrationDto.setEmail("john.doe@example.com");
        registrationDto.setPassword("password");
    }

    @Test
    void testRegisterUserSuccess() throws Exception {
        Role userRole = new Role();
        userRole.setName("USER");

        AppUser newUser = new AppUser();
        newUser.setFirstName("John");
        newUser.setLastName("Doe");
        LocalDate localDate = LocalDate.of(1973, 10, 28);
        newUser.setDateOfBirth(Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant()));
        newUser.setEmail("john.doe@example.com");
        newUser.setPassword("encodedPassword");
        newUser.setRoles(Collections.singletonList(userRole));

        when(roleRepository.findByName("USER")).thenReturn(Optional.of(userRole));
        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");
        when(appUserRepository.save(any(AppUser.class))).thenReturn(newUser);

        mockMvc.perform(post("/registrace")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registrationDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("John"))
                .andExpect(jsonPath("$.lastName").value("Doe"))
                .andExpect(jsonPath("$.email").value("john.doe@example.com"));
    }

    @Test
    void testCreateAuthenticationTokenSuccess() throws Exception {
        JwtRequest jwtRequest = new JwtRequest();
        jwtRequest.setEmail("john.doe@example.com");
        jwtRequest.setPassword("password");

        Authentication authentication = Mockito.mock(Authentication.class);
        when(authenticationManager.authenticate(any())).thenReturn(authentication);
        when(jwtTokenUtil.generateToken(authentication)).thenReturn("mockToken");

        mockMvc.perform(post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(jwtRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("mockToken"));
    }

    @Test
    void testCreateAuthenticationTokenFailure() throws Exception {
        JwtRequest jwtRequest = new JwtRequest();
        jwtRequest.setEmail("john.doe@example.com");
        jwtRequest.setPassword("wrongpassword");

        when(authenticationManager.authenticate(any())).thenThrow(new RuntimeException("Authentication failed"));

        mockMvc.perform(post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(jwtRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$").value("Nesprávné uživatelské jméno nebo heslo"));
    }
}
