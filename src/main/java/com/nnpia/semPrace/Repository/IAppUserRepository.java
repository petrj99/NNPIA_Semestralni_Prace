package com.nnpia.semPrace.Repository;

import com.nnpia.semPrace.Entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAppUserRepository extends JpaRepository<AppUser, Long> {
    AppUser findById(long id);
}
