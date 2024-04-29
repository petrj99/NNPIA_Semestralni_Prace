package com.nnpia.semPrace.Controller;

import com.nnpia.semPrace.DTO.CarDto;
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

    @DeleteMapping("/cars/{carId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> deleteCar(@PathVariable Long carId) {
        try {
            carService.deleteCar(carId);
            return ResponseEntity.ok().body("Vozidlo bylo úspěšně odstraněno.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Při odstraňování vozidla došlo k chybě.");
        }
    }

    @PutMapping("/cars/{carId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> updateCar(@PathVariable Long carId, @RequestPart("car") CarDto carDto, @RequestParam(required = false) MultipartFile image) {
        try {
            if (image != null && (!image.getContentType().startsWith("image/") || image.getSize() > 5 * 1024 * 1024)) {
                return ResponseEntity.badRequest().body("Neplatný soubor: zkontrolujte typ a velikost obrázku.");
            }

            Car car = carService.getCarById(carId).orElseThrow(() -> new Exception("Vozidlo nenalezeno"));
            car.setMake(carDto.getMake());
            car.setModel(carDto.getModel());
            car.setYear(carDto.getYear());
            car.setMileage(carDto.getMileage());
            car.setPrice(carDto.getPrice());
            car.setLicencePlate(carDto.getLicencePlate());

            if (image != null && !image.isEmpty()) {
                car = carService.saveCar(car, image);
            } else {
                car = carService.saveCarWithoutImage(car);
            }

            return ResponseEntity.ok(car);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Při aktualizaci vozidla došlo k chybě.");
        }
    }
}
