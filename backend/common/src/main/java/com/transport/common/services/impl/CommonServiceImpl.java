package com.transport.common.services.impl;
import com.transport.common.entitys.Client;
import com.transport.common.entitys.Land;
import com.transport.common.entitys.Maritime;
import com.transport.common.enums.CommonEnum;
import com.transport.common.repositories.ClientRepository;
import com.transport.common.repositories.LandRepository;
import com.transport.common.repositories.MaritimeRepository;
import com.transport.common.services.CommonService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class CommonServiceImpl<T> implements CommonService<T> {
    private final ClientRepository clientRepository;
    private final LandRepository landRepository;
    private final MaritimeRepository maritimeRepository;
    private JpaRepository<T, Long> commonRepository;
    private String entityType;
    public CommonServiceImpl(ClientRepository clientRepository, LandRepository landRepository,
                             MaritimeRepository maritimeRepository, @Value("${entity.type}") String entityType) throws Exception {
        this.clientRepository = clientRepository;
        this.landRepository = landRepository;
        this.maritimeRepository = maritimeRepository;
        this.entityType = entityType;
        ValidateContext(this.entityType);
    }

    @Override
    public void ValidateContext(String eT) throws Exception {
        this.commonRepository = null;
        if (CommonEnum.Client.getContext().equals(eT)) {
            this.commonRepository = (JpaRepository<T, Long>) clientRepository;
        } else if (CommonEnum.Land.getContext().equals(eT)) {
            this.commonRepository = (JpaRepository<T, Long>) landRepository;
        } else if (CommonEnum.Maritime.getContext().equals(eT)) {
            this.commonRepository = (JpaRepository<T, Long>) maritimeRepository;
        } else {
            throw new IllegalArgumentException("Unsupported entity type");
        }
    }

    @Override
    public List<T> List() throws Exception {

        return commonRepository.findAll();
    }

    @Override
    public T Get(Long id) throws Exception {
        return (T) commonRepository.findById(id).get();
    }

    @Override
    public boolean Add(T entity) throws Exception {
        return commonRepository.save(entity) != null;
    }

    @Override
    public boolean Update(Long id, T updatedEntity) throws Exception {
        boolean updated = false;
        Client clientObject;
        Land landObject;
        Maritime maritimeObject;
        Optional<T> rowExist = commonRepository.findById(id);

        if (rowExist.isPresent()) {
            if (updatedEntity instanceof Land) {
                landObject = (Land) updatedEntity;
                landObject.setId(id);
                commonRepository.save((T) landObject);
            } else if (updatedEntity instanceof Maritime) {
                maritimeObject = (Maritime) updatedEntity;
                maritimeObject.setId(id);
                commonRepository.save((T) maritimeObject);
            } else {
                clientObject = (Client) updatedEntity;
                clientObject.setId(id);
                commonRepository.save((T) clientObject);
            }
            updated = true;
        }
        return updated;
    }

    @Override
    public boolean Remove(Long id) throws Exception {
        if (commonRepository.existsById(id)) {
            commonRepository.deleteById(id);
            return !commonRepository.existsById(id);
        }
        return false;
    }
}
