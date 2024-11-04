package world.moducare.domain.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
@AllArgsConstructor
public class ChatGPTRequestDTO {
    private String model;
    private List<MessageDTO> messages;
    public ChatGPTRequestDTO(String model, String prompt) {
        this.model = model;
        this.messages = Arrays.asList(new MessageDTO("user", prompt));
    }
}