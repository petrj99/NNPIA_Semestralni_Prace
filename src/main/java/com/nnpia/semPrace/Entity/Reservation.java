package com.nnpia.semPrace.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
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
