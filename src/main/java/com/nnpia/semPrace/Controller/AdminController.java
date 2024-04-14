package com.nnpia.semPrace.Controller;

import com.nnpia.semPrace.Entity.Car;
import com.nnpia.semPrace.Service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/controls")
public class AdminController {

    private final CarService carService;

    public AdminController(CarService carService) {
        this.carService = carService;
    }

    @PostMapping("/caradd")
    public ResponseEntity<?> addCar(
            @RequestParam("manufacturer") String manufacturer,
            @RequestParam("model") String model,
            @RequestParam("year") int year,
            @RequestParam("mileage") int mileage,
            @RequestParam("price") int price,
            @RequestParam("registration") String registration,
            @RequestParam("image") MultipartFile image) {

        if (!image.getContentType().startsWith("image/")) {
            return ResponseEntity.badRequest().body("Soubor není obrázkem.");
        }

        if (image.getSize() > 5 * 1024 * 1024) {
            return ResponseEntity.badRequest().body("Soubor je moc velký, max velikost je 5MB.");
        }

        try {
            Car car = new Car();
            car.setMake(manufacturer);
            car.setModel(model);
            car.setYear(year);
            car.setMileage(mileage);
            car.setPrice(price);
            car.setLicencePlate(registration);

            Car savedCar = carService.saveCar(car, image);
            return ResponseEntity.ok(savedCar);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error při ukládání vozidla.");
        }
    }
}
