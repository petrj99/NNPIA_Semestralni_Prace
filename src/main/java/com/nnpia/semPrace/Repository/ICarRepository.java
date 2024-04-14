package com.nnpia.semPrace.Repository;

import com.nnpia.semPrace.Entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ICarRepository extends JpaRepository<Car, Long> {
    List<Car> findByMake(String make);
    List<Car> findByModel(String model);
    Optional<Car> findById(Long id);
}
