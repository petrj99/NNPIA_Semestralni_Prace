package com.nnpia.semPrace.Repository;

import com.nnpia.semPrace.Entity.AppUser;
import com.nnpia.semPrace.Entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface IReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByAppUser(AppUser appUser);
    List<Reservation> findByReservedCarId(Long carId);
    List<Reservation> findByReservedCarIdAndEndTimeGreaterThanEqualAndStartTimeLessThanEqual(Long carId, Date startTime, Date endTime);
}
