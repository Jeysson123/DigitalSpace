package com.transport.common.components;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class CommonComponent {
    @Value("${inserted}")
    public String SuccessRegister;
    @Value("${notInserted}")
    public String ErrorRegister;
    @Value("${loggedIn}")
    public String LoggedIn;
    @Value("${notFound}")
    public String NotFound;
    @Value("${updated}")
    public String Updated;
    @Value("${entity.type}")
    public String EntityType;
    @Value("${jwt.username}")
    public String JwtUsername;
    @Value("${jwt.password}")
    public String JwtPassword;
    @Value("${invalid.data}")
    public String InvalidData;
    @Value("${apiProblem}")
    public String ApiProblem;
}
