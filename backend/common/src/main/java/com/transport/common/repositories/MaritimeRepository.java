package com.transport.common.repositories;
import com.transport.common.entitys.Client;
import com.transport.common.entitys.Maritime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaritimeRepository extends JpaRepository<Maritime, Long> { }
