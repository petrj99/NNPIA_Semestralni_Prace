package Repository;

import Entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoleRepository extends JpaRepository<Reservation, Integer> {
}
