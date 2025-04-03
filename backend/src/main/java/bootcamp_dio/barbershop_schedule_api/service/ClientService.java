package bootcamp_dio.barbershop_schedule_api.service;

import org.springframework.stereotype.Service;
import bootcamp_dio.barbershop_schedule_api.model.Client;
import bootcamp_dio.barbershop_schedule_api.repository.ClientRepository;

import java.util.List;

@Service
public class ClientService {
    
    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Client createClient(Client client) {
        return clientRepository.save(client);
    }
}