package bootcamp_dio.barbershop_schedule_api.controller;

import bootcamp_dio.barbershop_schedule_api.dto.ScheduleDTO;
import bootcamp_dio.barbershop_schedule_api.model.Schedule;
import bootcamp_dio.barbershop_schedule_api.repository.ClientRepository;
import bootcamp_dio.barbershop_schedule_api.service.ScheduleService;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping
    public Schedule createSchedule(@RequestBody Schedule schedule) {
        return scheduleService.createSchedule(schedule);
    }
}