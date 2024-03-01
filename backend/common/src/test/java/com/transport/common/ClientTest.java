package com.transport.common;

import com.transport.common.entitys.Client;
import com.transport.common.entitys.Land;
import com.transport.common.entitys.Maritime;
import com.transport.common.services.CommonService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ClientTest {
    @Autowired
    private CommonService<Client> CommonService;
    @Autowired
    private CommonService<Land> CommonServiceLand;
    @Autowired
    private CommonService<Maritime> CommonServiceMaritime;

    @Test
    public void ListTest() throws Exception {
        assertNotNull(CommonService.List());
        assertEquals(1, CommonService.List().size());
    }

    @Test
    public void GetTest() throws Exception {
        assertNotNull(CommonService.Get(1L));
        assertEquals("Jeysson", CommonService.Get(1L).getNombreCliente());
    }

    @Test
    public void InsertTest() throws Exception {
        assertTrue(CommonService.Add(Client.builder()
                .NombreCliente("Jeysson").CorreoCliente("spacedigitalsdummy@gmail.com")
                .ClaveCliente("password").build()));
    }

    @Test
    public void InsertShipmentsTest() throws Exception {
        assertTrue(CommonServiceLand.Add(Land.builder()
                .TipoProducto("A1")
                .CantidadProducto(1)
                .FechaRegistro(LocalDate.now())
                .FechaEntrega(LocalDate.now())
                .BodegaEntrega("Dominicana")
                .PrecioEnvio(2000.00)
                .PlacaVehiculo("111ABC")
                .NumeroGuia("1010101010")
                .Client(CommonService.Get(32L)) // <-- Relationship Here
                .build()));

        assertTrue(CommonServiceMaritime.Add(Maritime.builder()
                .TipoProducto("A1")
                .CantidadProducto(1)
                .FechaRegistro(LocalDate.now())
                .FechaEntrega(LocalDate.now())
                .BodegaEntrega("Dominicana")
                .PrecioEnvio(2000.00)
                .NumeroFlota("111ABC")
                .NumeroGuia("1010101010")
                .Client(CommonService.Get(32L)) // <-- Relationship Here
                .build()));
    }

    @Test
    public void UpdateTest() throws Exception {
        assertNotNull(CommonService.Get(1L));
        assertTrue(CommonService.Update(1L, Client.builder()
                .NombreCliente("TheJey")
                .CorreoCliente("spacedigitalsdummy@gmail.com")
                .ClaveCliente("password")
                .build()));
    }

    @Test
    public void DeleteTest() throws Exception {
        assertNotNull(CommonService.Get(1L));
        assertTrue(CommonService.Remove(1L));
    }
}
