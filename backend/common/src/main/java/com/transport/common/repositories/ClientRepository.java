package com.transport.common.repositories;
import com.transport.common.entitys.Client;
import com.transport.common.entitys.Land;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> { }
