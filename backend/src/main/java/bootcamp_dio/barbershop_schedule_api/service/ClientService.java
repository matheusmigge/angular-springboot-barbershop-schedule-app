package bootcamp_dio.barbershop_schedule_api.service;

import org.springframework.stereotype.Service;
import bootcamp_dio.barbershop_schedule_api.model.Client;
import bootcamp_dio.barbershop_schedule_api.repository.ClientRepository;
import bootcamp_dio.barbershop_schedule_api.repository.ScheduleRepository;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {
    
    private final ClientRepository clientRepository;
    private final ScheduleRepository scheduleRepository;

    public ClientService(ClientRepository clientRepository, ScheduleRepository scheduleRepository) {
        this.clientRepository = clientRepository;
        this.scheduleRepository = scheduleRepository;
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Client getClientById(Long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado com o ID: " + id));
    }

    public Client createClient(Client client) {
        return clientRepository.save(client);
    }

    public Client updateClient(Long id, Client client) {
        Optional<Client> existingClient = clientRepository.findById(id);
        if (existingClient.isPresent()) {
            Client updatedClient = existingClient.get();
            updatedClient.setName(client.getName());
            updatedClient.setEmail(client.getEmail());
            updatedClient.setPhone(client.getPhone());
            return clientRepository.save(updatedClient);
        } else {
            throw new RuntimeException("Cliente não encontrado com o ID: " + id);
        }
    }

    public void deleteClient(Long id) {
        if (clientRepository.existsById(id)) {
            clientRepository.deleteById(id);
        } else {
            throw new RuntimeException("Cliente não encontrado com o ID: " + id);
        }
    }
    
    @Transactional
    public void deleteClientAndSchedules(Long clientId) {
        if (!clientRepository.existsById(clientId)) {
            throw new RuntimeException("Cliente não encontrado com o ID: " + clientId);
        }

        scheduleRepository.deleteByClientId(clientId);
        clientRepository.deleteById(clientId);
    }
}