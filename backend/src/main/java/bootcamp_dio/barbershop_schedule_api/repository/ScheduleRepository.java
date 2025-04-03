package bootcamp_dio.barbershop_schedule_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import bootcamp_dio.barbershop_schedule_api.model.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
}