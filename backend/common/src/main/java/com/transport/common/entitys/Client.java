package com.transport.common.entitys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Client")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    @NotEmpty(message = "Nombre requerido.")
    @Size(min = 3, max = 15, message = "Este campo debe contener entre 3 y 15 caracteres.")
    private String NombreCliente;

    @NotEmpty(message = "Correo requerido.")
    @Size(min = 10, max = 20, message = "Este campo debe contener entre 10 y 20 caracteres.")
    @Column(name = "correo")
    private String CorreoCliente;

    @Column(name = "clave")
    @NotEmpty(message = "Clave requerido.")
    @Size(min = 5, max = 8, message = "Este campo debe contener entre 5 y 8 caracteres.")
    private String ClaveCliente;

    @OneToMany(mappedBy = "Client", cascade = CascadeType.ALL)
    private List<Land> GroundShipments = new ArrayList<>();

    @OneToMany(mappedBy = "Client", cascade = CascadeType.ALL)
    private List<Maritime> MaritimeShipments = new ArrayList<>();

}
