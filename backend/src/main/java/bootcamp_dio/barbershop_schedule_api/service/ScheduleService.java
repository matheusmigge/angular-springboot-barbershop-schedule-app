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

    public Schedule updateSchedule(Long id, Schedule schedule) {
        return scheduleRepository.findById(id).map(existingSchedule -> {
            existingSchedule.setStartAt(schedule.getStartAt());
            existingSchedule.setEndAt(schedule.getEndAt());
            existingSchedule.setClientId(schedule.getClientId());
            return scheduleRepository.save(existingSchedule);
        }).orElseThrow(() -> new RuntimeException("Agendamento não encontrado com o ID: " + id));
    }

    public void deleteSchedule(Long id) {
        if (scheduleRepository.existsById(id)) {
            scheduleRepository.deleteById(id);
        } else {
            throw new RuntimeException("Agendamento não encontrado com o ID: " + id);
        }
    }
}