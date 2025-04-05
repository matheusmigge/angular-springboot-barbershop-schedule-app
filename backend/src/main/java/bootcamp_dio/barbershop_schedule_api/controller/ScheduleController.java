package bootcamp_dio.barbershop_schedule_api.controller;

import bootcamp_dio.barbershop_schedule_api.dto.ScheduleDTO;
import bootcamp_dio.barbershop_schedule_api.model.Schedule;
import bootcamp_dio.barbershop_schedule_api.repository.ClientRepository;
import bootcamp_dio.barbershop_schedule_api.service.ScheduleService;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/schedules")
public class ScheduleController {

    private final ScheduleService scheduleService;
    private final ClientRepository clientRepository;

    public ScheduleController(ScheduleService scheduleService, ClientRepository clientRepository) {
        this.scheduleService = scheduleService;
        this.clientRepository = clientRepository;
    }

    @GetMapping
    public List<ScheduleDTO> getSchedules() {
        return scheduleService.getAllSchedules()
                .stream()
                .map(schedule -> new ScheduleDTO(schedule, clientRepository))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ScheduleDTO getScheduleById(@PathVariable Long id) {
        Schedule schedule = scheduleService.getScheduleById(id);
        return new ScheduleDTO(schedule, clientRepository);
    }

    @PostMapping
    public Schedule createSchedule(@RequestBody Schedule schedule) {
        return scheduleService.createSchedule(schedule);
    }

    @PutMapping("/{id}")
    public Schedule updateSchedule(@PathVariable Long id, @RequestBody Schedule schedule) {
        return scheduleService.updateSchedule(id, schedule);
    }

    @DeleteMapping("/{id}")
    public void deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
    }
}