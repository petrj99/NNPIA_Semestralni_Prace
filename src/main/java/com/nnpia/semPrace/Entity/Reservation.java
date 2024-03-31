package com.nnpia.semPrace.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Reservation {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;
    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    private AppUser appUser;
    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    private Car reservedCar;
    @Column(nullable = false)
    private Date startTime;
    @Column(nullable = false)
    private Date endTime;
}
