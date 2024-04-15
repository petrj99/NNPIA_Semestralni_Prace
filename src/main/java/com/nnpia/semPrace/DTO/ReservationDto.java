package com.nnpia.semPrace.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class ReservationDto {
    private Long carId;
    private Date startTime;
    private Date endTime;
}
