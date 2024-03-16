package com.nnpia.semPrace.Repository;

import com.nnpia.semPrace.Entity.Reservation;
import com.nnpia.semPrace.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRoleRepository extends JpaRepository<Role, Integer> {
}
