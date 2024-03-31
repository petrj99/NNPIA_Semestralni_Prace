package com.nnpia.semPrace.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Car {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;
    @Column(nullable = false, length = 50)
    private String make;
    @Column(nullable = false, length = 50)
    private String model;
    @Column(nullable = false, length = 50)
    private int year;
    @Column(nullable = false, length = 50)
    private int mileage;
    @Column(nullable = false, length = 50)
    private int price;
    @Column(nullable = false, length = 50)
    private String licencePlate;
    @OneToMany(mappedBy = "reservedCar")
    private List<Reservation> reservationList = new ArrayList<>();
}
