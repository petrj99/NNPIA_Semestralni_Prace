package com.nnpia.semPrace.Controller;

import com.nnpia.semPrace.DTO.RegistrationDto;
import com.nnpia.semPrace.Entity.AppUser;
import com.nnpia.semPrace.Repository.IAppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class UserController {
    @Autowired
    private IAppUserRepository appUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/registrace")
    public AppUser registerUser(@RequestBody RegistrationDto registration) {
        AppUser newUser = new AppUser();
        newUser.setFirstName(registration.getFirstName());
        newUser.setLastName(registration.getLastName());
        newUser.setDateOfBirth(registration.getDateOfBirth());
        newUser.setEmail(registration.getEmail());
        newUser.setPassword(passwordEncoder.encode(registration.getPassword()));

        return appUserRepository.save(newUser);
    }
}
