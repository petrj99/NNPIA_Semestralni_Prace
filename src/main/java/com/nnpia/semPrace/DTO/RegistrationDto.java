package com.nnpia.semPrace.DTO;


import jakarta.validation.constraints.Past;
import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.NotBlank;
import java.util.Date;

@Getter
@Setter
public class RegistrationDto {
    @NotBlank(message = "Jméno je povinné.")
    private String firstName;
    @NotBlank(message = "Příjmení je povinné.")
    private String lastName;
    @Past(message = "Datum narození musí být v minulosti.")
    private Date dateOfBirth;
    @NotBlank(message = "Email je povinný.")
    private String email;
    @NotBlank(message = "Heslo je povinné.")
    private String password;

    public RegistrationDto(String firstName, String lastName, Date dateOfBirth, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.password = password;
    }
}
