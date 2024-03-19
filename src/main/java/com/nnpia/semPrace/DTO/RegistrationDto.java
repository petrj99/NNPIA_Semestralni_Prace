package com.nnpia.semPrace.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class RegistrationDto {
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private String email;
    private String password;

    public RegistrationDto(String firstName, String lastName, Date dateOfBirth, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.password = password;
    }
}
