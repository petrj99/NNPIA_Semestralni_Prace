package Repository;

import Entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICarRepository extends JpaRepository<Car, Long> {
    List<Car> findByMake(String make);
    List<Car> findByModel(String model);
}
