package com.nnpia.semPrace.DTO;

import lombok.Getter;
import lombok.Setter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Setter
@Getter
public class ReservationFullDto {
    private Long id;
    private String userEmail;
    private String carModel;
    private Date startTime;
    private Date endTime;

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");

    public void  setStartTime(Date startTime){
        this.startTime = startTime;
    }

    public void  setEndTime(Date endTime){
        this.endTime = endTime;
    }

    public void setStartTime(String startTime) {
        try {
            this.startTime = dateFormat.parse(startTime);
        } catch (ParseException e) {
            // Handle the exception here, perhaps set startTime to null or keep the old value
            this.startTime = null;
            System.out.println("Error parsing the date: " + e.getMessage());
        }
    }

    public void setEndTime(String endTime) {
        try {
            this.endTime = dateFormat.parse(endTime);
        } catch (ParseException e) {
            this.endTime = null;
            System.out.println("Error parsing the date: " + e.getMessage());
        }
    }
}
