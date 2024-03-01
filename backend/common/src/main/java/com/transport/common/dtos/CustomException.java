package com.transport.common.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class CustomException extends RuntimeException {
    public CustomException(String message) {
        super(message);
    }
}

