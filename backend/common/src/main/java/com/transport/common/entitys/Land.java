package com.transport.common.entitys;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Land")
public class Land {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tipo_producto")
    private String TipoProducto;

    @Column(name = "cantidad_producto")
    private int CantidadProducto;

    @Column(name = "fecha_registro")
    private LocalDate FechaRegistro;

    @Column(name = "fecha_entrega")
    private LocalDate FechaEntrega;

    @Column(name = "bodega_entrega")
    private String BodegaEntrega;

    @Column(name = "precio_envio")
    private double PrecioEnvio;

    @Column(name = "placa_vehiculo")
    private String PlacaVehiculo;

    @Column(name = "numero_guia")
    private String NumeroGuia;

    @Column(name = "descuento")
    private double descuento;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    @JoinColumn(name = "client_id")
    private Client Client;
}
