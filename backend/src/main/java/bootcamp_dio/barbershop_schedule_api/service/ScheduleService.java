package bootcamp_dio.barbershop_schedule_api.service;

import org.springframework.stereotype.Service;
import bootcamp_dio.barbershop_schedule_api.model.Schedule;
import bootcamp_dio.barbershop_schedule_api.repository.ScheduleRepository;

import java.util.List;

@Service
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    public ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    public Schedule createSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }
}