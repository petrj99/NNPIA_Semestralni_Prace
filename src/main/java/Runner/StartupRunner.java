package Runner;
import Entity.AppUser;
import Repository.IAppUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StartupRunner implements CommandLineRunner {

    private final IAppUserRepository appUserRepository;

    public StartupRunner(IAppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        AppUser appUser1 = new AppUser();
        AppUser appUser2 = new AppUser();
        appUserRepository.save(appUser1);
        appUserRepository.save(appUser2);

        long userCount = appUserRepository.count();
        System.out.println("Number of AppUsers in the database: " + userCount);
    }
}
