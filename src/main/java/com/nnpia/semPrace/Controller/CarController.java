package com.nnpia.semPrace.Controller;

import com.nnpia.semPrace.DTO.CarDto;
import com.nnpia.semPrace.Entity.Car;
import com.nnpia.semPrace.Repository.ICarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/load/vehicles")
public class CarController {

    @Autowired
    private ICarRepository carRepository;

    @GetMapping
    public ResponseEntity<List<CarDto>> getAllCars() {
        List<Car> cars = carRepository.findAll();

        List<CarDto> carDtos = cars.stream().map(car -> new CarDto(
                car.getId(),
                car.getMake(),
                car.getModel(),
                car.getYear(),
                car.getMileage(),
                car.getPrice(),
                car.getLicencePlate(),
                Base64.getEncoder().encodeToString(car.getImage())
        )).collect(Collectors.toList());

        return ResponseEntity.ok(carDtos);
    }
}
