package com.nnpia.semPrace.Security;

import lombok.Getter;

@Getter
public class JwtResponse {
    private final String token;
    public JwtResponse(String token) {
        this.token = token;
    }
}
