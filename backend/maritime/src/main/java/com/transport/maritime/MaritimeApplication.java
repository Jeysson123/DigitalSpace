package com.transport.maritime;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"com.transport.common","com.transport.maritime" })
public class MaritimeApplication {

	public static void main(String[] args) {
		SpringApplication.run(MaritimeApplication.class, args);
	}

}
