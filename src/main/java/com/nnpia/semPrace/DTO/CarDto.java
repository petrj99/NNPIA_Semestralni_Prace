package com.nnpia.semPrace.DTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CarDto {
    private long id;
    private String make;
    private String model;
    private int year;
    private int mileage;
    private int price;
    private String licencePlate;
    private String image;

    public CarDto(long id, String make, String model, int year, int mileage, int price, String licencePlate, String s) {
        this.id = id;
        this.make = make;
        this.model = model;
        this.year = year;
        this.mileage = mileage;
        this.price = price;
        this.licencePlate = licencePlate;
        this.image = s;
    }
}
