package com.transport.land.controllers;
import com.transport.common.components.CommonComponent;
import com.transport.common.dtos.CustomException;
import com.transport.common.entitys.Land;
import com.transport.common.services.CommonService;
import com.transport.common.utils.ValidationsUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/transport/land")
public class LandController {
    @Autowired
    private CommonComponent landComponent;
    @Autowired
    private CommonService<Land> landService;
    @Autowired
    private ValidationsUtils validationUtils;
    private final String entityType;
    public LandController( @Value("${entity.type}") String entityType) {

        this.entityType = entityType;
    }
    @GetMapping("/get")
    public List<Land> ListShipments() {

        try{

            return landService.List();
        }

        catch (java.lang.Exception e){

            throw new CustomException(String.format(landComponent.ApiProblem, e.getMessage()));
        }
    }

    @GetMapping("/find")
    public Land GetShipments(@RequestParam Long id) {

        try{

            return landService.Get(id);
        }

        catch (java.lang.Exception e){

            throw new CustomException(String.format(landComponent.ApiProblem, e.getMessage()));
        }
    }

    @PostMapping("/insert")
    public String InsertShipment(@Valid @RequestBody Land land, BindingResult bindingResult) {

        try{

            if(!validationUtils.ValidData("[A-Za-z]{3}\\d{3}", land.getPlacaVehiculo())){
                return landComponent.InvalidData.replace("{0}", "Placa Vehiculo")
                        .replace("{1}", "#AAA111#");
            }

            if(!validationUtils.ValidData("\\d{10}", land.getNumeroGuia())){
                return landComponent.InvalidData.replace("{0}", "Numero de Guia")
                        .replace("{1}", "#1234567890#");
            }

            land.setDescuento(land.getCantidadProducto() > 10 ? land.getPrecioEnvio() * 0.05 : 0);

            return validationUtils.HasErrors(bindingResult).isEmpty() ? landService.Add(land)
                    ?  landComponent.SuccessRegister : landComponent.ErrorRegister
                    : validationUtils.HasErrors(bindingResult);
        }

        catch (java.lang.Exception e){

            throw new CustomException(String.format(landComponent.ApiProblem, e.getMessage()));
        }
    }

    @PutMapping("/update/{id}")
    public String UpdateShipment(@PathVariable Long id, @RequestBody @Valid Land land, BindingResult bindingResult) {

        try{

            if(!validationUtils.ValidData("[A-Za-z]{3}\\d{3}", land.getPlacaVehiculo())){
                return landComponent.InvalidData.replace("{0}", "Placa Vehiculo")
                        .replace("{1}", "#AAA111#");
            }

            if(!validationUtils.ValidData("\\d{10}", land.getNumeroGuia())){
                return landComponent.InvalidData.replace("{0}", "Numero de Guia")
                        .replace("{1}", "#1234567890#");
            }

            land.setDescuento(land.getCantidadProducto() > 10 ? land.getPrecioEnvio() * 0.05 : 0);

            return validationUtils.HasErrors(bindingResult).isEmpty() ? landService.Update(id, land)
                    ? landComponent.Updated.replace("{0}", "Envio terrestre, ")
                    .replace("{1}", "actualizado ").replace("{2}", "exitosamente. ")
                    : landComponent.Updated.replace("{0}", "Error, ")
                    .replace("{1}", "actualizando ").replace("{2}", "envio terrestre. ")
                    : validationUtils.HasErrors(bindingResult);
        }

        catch (java.lang.Exception e){

            throw new CustomException(String.format(landComponent.ApiProblem, e.getMessage()));
        }
    }

    @DeleteMapping("/remove/{id}")
    public String RemoveShipment(@PathVariable Long id) {

        try{

            return landService.Remove(id) ?  landComponent.Updated.replace("{0}", "Envio terrestre, ")
                    .replace("{1}", "eliminado ").replace("{2}", "exitosamente. ")
                    : landComponent.Updated.replace("{0}", "Error, ")
                    .replace("{1}", "eliminando ").replace("{2}", "envio terrestre. ");
        }

        catch (java.lang.Exception e){

            throw new CustomException(String.format(landComponent.ApiProblem, e.getMessage()));
        }
    }

}
