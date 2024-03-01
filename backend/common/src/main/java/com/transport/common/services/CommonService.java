package com.transport.common.services;
import java.util.List;

public interface CommonService<T> {
    void ValidateContext(String eT) throws Exception;
    List<T> List() throws Exception;
    T Get(Long id) throws Exception;
    boolean Add(T entity) throws Exception;
    boolean Update(Long id, T entity) throws Exception;
    boolean Remove(Long id) throws Exception;
}

