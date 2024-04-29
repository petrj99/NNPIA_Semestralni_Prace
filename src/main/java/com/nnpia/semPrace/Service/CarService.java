package com.nnpia.semPrace.Service;

import com.nnpia.semPrace.Entity.Car;
import com.nnpia.semPrace.Repository.ICarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class CarService {

    private final ICarRepository carRepository;

    @Autowired
    public CarService(ICarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public Car saveCar(Car car, MultipartFile image) throws IOException {
        if (!image.isEmpty()) {
            byte[] imageBytes = image.getBytes();
            car.setImage(imageBytes);
        }
        return carRepository.save(car);
    }

    public Car saveCarWithoutImage(Car car) {
        return carRepository.save(car);
    }

    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }

    public Optional<Car> getCarById(Long id) {
        return carRepository.findById(id);
    }
}
