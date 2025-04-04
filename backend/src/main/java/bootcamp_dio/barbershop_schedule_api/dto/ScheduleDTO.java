package bootcamp_dio.barbershop_schedule_api.dto;

import java.time.LocalDateTime;

import bootcamp_dio.barbershop_schedule_api.model.Client;
import bootcamp_dio.barbershop_schedule_api.model.Schedule;
import bootcamp_dio.barbershop_schedule_api.repository.ClientRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleDTO {

    private Long id;
    private ClientDTO client;
    private LocalDateTime startAt;
    private LocalDateTime endAt;

    public ScheduleDTO(Schedule schedule, ClientRepository clientRepository) {
        this.id = schedule.getId();
        this.startAt = schedule.getStartAt();
        this.endAt = schedule.getEndAt();

        Client client = clientRepository.findById(schedule.getClientId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado com o ID: " + schedule.getClientId()));

        // Converter o objeto Client para ClientDTO
        this.client = new ClientDTO(client);
    }
}
