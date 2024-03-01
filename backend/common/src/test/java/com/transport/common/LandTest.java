package com.transport.common;

import com.transport.common.entitys.Land;
import com.transport.common.services.CommonService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class LandTest {
    @Autowired
    private CommonService<Land> commonService;

    @Test
    public void ListTest() throws Exception {
        assertNotNull(commonService.List());
        assertEquals(1, commonService.List().size());
    }

    @Test
    public void GetTest() throws Exception {
        assertNotNull(commonService.Get(1L));
        assertEquals("A1", commonService.Get(1L).getTipoProducto());
    }

    @Test
    public void InsertTest() throws Exception {
        assertTrue(commonService.Add(Land.builder()
                .TipoProducto("A1")
                .CantidadProducto(1)
                .FechaRegistro(LocalDate.now())
                .FechaEntrega(LocalDate.now())
                .BodegaEntrega("Dominicana")
                .PrecioEnvio(2000.00)
                .PlacaVehiculo("111ABC")
                .NumeroGuia("1010101010")
                .build()));
    }

    @Test
    public void UpdateTest() throws Exception {
        assertNotNull(commonService.Get(1L));
        assertTrue(commonService.Update(1L, Land.builder()
                .TipoProducto("A1")
                .CantidadProducto(1)
                .FechaRegistro(LocalDate.now())
                .FechaEntrega(LocalDate.now())
                .BodegaEntrega("HORMIGUERO")
                .PrecioEnvio(2000.00)
                .PlacaVehiculo("111ABC")
                .NumeroGuia("1010101010")
                .build()));
    }

    @Test
    public void DeleteTest() throws Exception {
        assertNotNull(commonService.Get(1L));
        assertTrue(commonService.Remove(1L));
    }
}
