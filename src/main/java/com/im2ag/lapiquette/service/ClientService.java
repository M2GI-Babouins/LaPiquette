package com.im2ag.lapiquette.service;

import com.im2ag.lapiquette.domain.Client;
import com.im2ag.lapiquette.domain.User;
import com.im2ag.lapiquette.repository.ClientRepository;
import com.im2ag.lapiquette.repository.UserRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Client}.
 */
@Service
@Transactional
public class ClientService {

    private final Logger log = LoggerFactory.getLogger(ClientService.class);

    private final ClientRepository clientRepository;
    private final UserRepository userRepository;

    public ClientService(ClientRepository clientRepository, UserRepository userRepository) {
        this.clientRepository = clientRepository;
        this.userRepository = userRepository;
    }

    /**
     * Save a client.
     *
     * @param client the entity to save.
     * @return the persisted entity.
     */
    public Client save(Client client) {
        log.debug("Request to save Client : {}", client);
        return clientRepository.save(client);
    }

    /**
     * Create a client from a user
     * @param user
     * @return client
     */
    public void createClient(User user) {
        log.debug("CREATE A CLIENT FROM A USER : {}", user);
        log.debug("USER ID  :{}", user.getId());

        Client newClient = new Client(
            user.getId(),
            user.getLogin(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            "dummyAdresse",
            false,
            user.getPassword()
        );

        this.save(newClient);
        log.debug("NEW CLIENT ID : {}", newClient.getId());
    }

    /**
     * Partially update a client.
     *
     * @param client the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Client> partialUpdate(Client client) {
        log.debug("Request to partially update Client : {}", client);

        return clientRepository
            .findById(client.getId())
            .map(
                existingClient -> {
                    if (client.getFirstName() != null) {
                        existingClient.setFirstName(client.getFirstName());
                    }
                    if (client.getLastName() != null) {
                        existingClient.setLastName(client.getLastName());
                    }
                    if (client.getEmail() != null) {
                        existingClient.setEmail(client.getEmail());
                    }
                    if (client.getAdress() != null) {
                        existingClient.setAdress(client.getAdress());
                    }
                    if (client.getLoggedIn() != null) {
                        existingClient.setLoggedIn(client.getLoggedIn());
                    }
                    if (client.getPassword() != null) {
                        existingClient.setPassword(client.getPassword());
                    }

                    return existingClient;
                }
            )
            .map(clientRepository::save);
    }

    /**
     * Get all the clients.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Client> findAll(Pageable pageable) {
        log.debug("Request to get all Clients");
        return clientRepository.findAll(pageable);
    }

    /**
     * Get one client by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Client> findOne(Long id) {
        log.debug("Request to get Client : {}", id);
        return clientRepository.findById(id);
    }

    /**
     * Delete the client by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Client : {}", id);
        clientRepository.deleteById(id);
    }
}
