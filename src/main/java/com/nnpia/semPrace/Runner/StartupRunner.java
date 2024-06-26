package com.nnpia.semPrace.Runner;
import com.nnpia.semPrace.Entity.AppUser;
import com.nnpia.semPrace.Entity.Role;
import com.nnpia.semPrace.Repository.IAppUserRepository;
import com.nnpia.semPrace.Repository.IRoleRepository;
import org.hibernate.engine.spi.SessionDelegatorBaseImpl;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class StartupRunner implements CommandLineRunner {

    private final IAppUserRepository appUserRepository;
    private final IRoleRepository roleRepository;

    public StartupRunner(IAppUserRepository appUserRepository, IRoleRepository roleRepository) {
        this.appUserRepository = appUserRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        long userCount = appUserRepository.count();
        System.out.println("Number of AppUsers in the database: " + userCount);

        List<AppUser> users = appUserRepository.findAll();

        System.out.println("ID všech uživatelů:");
        for (AppUser user : users) {
            System.out.println("ID: " + user.getId() + " Prijmeni: " + user.getLastName() + ", Email: " + user.getEmail());
        }
    }
}
