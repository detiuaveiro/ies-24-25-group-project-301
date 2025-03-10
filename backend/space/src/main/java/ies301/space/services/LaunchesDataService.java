package ies301.space.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import ies301.space.model.Message;
import ies301.space.repositories.LaunchRepository;
import ies301.space.entities.Launch;

import java.util.Map;

import java.util.List;
import ies301.space.entities.Alert;
import ies301.space.entities.Status;

@Service
public class LaunchesDataService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final Logger logger = LoggerFactory.getLogger(LaunchesDataService.class);

    @Autowired
    private LaunchRepository launchRepository;

    @Autowired
    private AlertService alertService;

    @Autowired
    private InfluxDBService influxDBService;

    @Autowired
    private AlertProcessor alertProcessor;

    @RabbitListener(queues = "generatorQueue")
    public void consumeMessage(String messageJson) {
        try {
            // Log da mensagem recebida
            // logger.info("Mensagem recebida: " + messageJson);
            Message message = objectMapper.readValue(messageJson, Message.class);
            
            
            if (message.getTerminado()) {
                Long id = Long.parseLong(message.getIdLancamento());
                Launch launch = launchRepository.findById(id).orElse(null);
                if (launch != null) {
                    launch.setStatus(Status.SUCCESS);
                    launchRepository.save(launch);
                }
                logger.info("Lançamento terminado: {}", message.getIdLancamento());
            }

            // Valida os dados recebidos
            if (message.getTripulantes() == null || message.getNave() == null) {
                logger.warn("Mensagem com dados incompletos: {}", messageJson);
                return;
            }

            messagingTemplate.convertAndSend("/topic/" + message.getIdLancamento() + "/astronaut-data",
                    message.getTripulantes());
            message.getTripulantes().forEach(astronaut -> messagingTemplate.convertAndSend(
                    "/topic/" + message.getIdLancamento() + "/astronaut-data/" + astronaut.getId(), astronaut));
            messagingTemplate.convertAndSend("/topic/" + message.getIdLancamento() + "/launch-data", message.getNave());



            // Processa alertas e salva dados em uma thread separada
            processAlertsAndSaveData(message);

        } catch (Exception e) {
            logger.error("Erro ao processar mensagem: ", e.getMessage(), e);

        }
    }

    @Async
    public void processAlertsAndSaveData(Message message) {
        try {
            Long id = Long.parseLong(message.getIdLancamento());
            Launch launch = launchRepository.findById(id).orElse(null);
            if (launch == null) {
                logger.error("Lancamento nao encontrado: " + id);
                return;
            }

            // Processa os alertas
            List<Alert> savedAlerts = alertProcessor.processAlerts(message, launch);
            if (!savedAlerts.isEmpty()) {
                logger.info("Alertas salvos e notificados: {}", savedAlerts.size());
            }

            // Salvar dados no InfluxDB
            influxDBService.saveDataToInfluxDB(message);
        } catch (Exception e) {
            logger.error("Erro ao processar alertas ou salvar dados no InfluxDB: ", e.getMessage(), e);
        }
    }

}
