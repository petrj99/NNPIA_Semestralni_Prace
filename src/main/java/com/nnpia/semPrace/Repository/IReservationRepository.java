package com.nnpia.semPrace.Repository;

import com.nnpia.semPrace.Entity.AppUser;
import com.nnpia.semPrace.Entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByAppUser(AppUser appUser);
}
