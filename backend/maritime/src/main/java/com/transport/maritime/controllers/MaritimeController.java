package com.transport.maritime.controllers;

import com.transport.common.components.CommonComponent;
import com.transport.common.dtos.CustomException;
import com.transport.common.entitys.Maritime;
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
@RequestMapping("/api/transport/maritime")
public class MaritimeController {
    @Autowired
    private CommonComponent maritimeComponent;
    @Autowired
    private CommonService<Maritime> maritimeService;
    @Autowired
    private ValidationsUtils validationUtils;
    private final String entityType;
    public MaritimeController(@Value("${entity.type}") String entityType) {

        this.entityType = entityType;
    }

    @GetMapping("/get")
    public List<Maritime> ListShipments() {

        try{

            return maritimeService.List();
        }

        catch (Exception e){

            throw new CustomException(String.format(maritimeComponent.ApiProblem, e.getMessage()));
        }
    }

    @GetMapping("/find")
    public Maritime GetShipments(@RequestParam Long id) {

        try{

            return maritimeService.Get(id);
        }

        catch (Exception e){

            throw new CustomException(String.format(maritimeComponent.ApiProblem, e.getMessage()));
        }
    }

    @PostMapping("/insert")
    public String InsertShipment(@RequestBody @Valid Maritime maritime, BindingResult bindingResult) {

        try{

            if(!validationUtils.ValidData("[A-Za-z]{3}\\d{3}[A-Za-z]{1}", maritime.getNumeroFlota())){
                return maritimeComponent.InvalidData.replace("{0}", "Numero Flota")
                        .replace("{1}", "#AAA111A#");
            }

            if(!validationUtils.ValidData("\\d{10}", maritime.getNumeroGuia())){
                return maritimeComponent.InvalidData.replace("{0}", "Numero de Guia")
                        .replace("{1}", "#1234567890#");
            }

            maritime.setDescuento(maritime.getCantidadProducto() > 10 ? maritime.getPrecioEnvio() * 0.03 : 0);

            return validationUtils.HasErrors(bindingResult).isEmpty() ? maritimeService.Add(maritime)
                    ?  maritimeComponent.SuccessRegister : maritimeComponent.ErrorRegister
                    : validationUtils.HasErrors(bindingResult);
        }

        catch (Exception e){

            throw new CustomException(String.format(maritimeComponent.ApiProblem, e.getMessage()));
        }
    }

    @PutMapping("/update/{id}")
    public String UpdateShipment(@PathVariable Long id, @RequestBody @Valid Maritime maritime, BindingResult bindingResult) {

        try{

            if(!validationUtils.ValidData("[A-Za-z]{3}\\d{3}[A-Za-z]{1}", maritime.getNumeroFlota())){
                return maritimeComponent.InvalidData.replace("{0}", "Numero Flota")
                        .replace("{1}", "#AAA111A#");
            }

            if(!validationUtils.ValidData("\\d{10}", maritime.getNumeroGuia())){
                return maritimeComponent.InvalidData.replace("{0}", "Numero de Guia")
                        .replace("{1}", "#1234567890#");
            }

            maritime.setDescuento(maritime.getCantidadProducto() > 10 ? maritime.getPrecioEnvio() * 0.03 : 0);

            return validationUtils.HasErrors(bindingResult).isEmpty() ? maritimeService.Update(id, maritime)
                    ? maritimeComponent.Updated.replace("{0}", "Envio maritimo, ")
                    .replace("{1}", "actualizado ").replace("{2}", "exitosamente. ")
                    : maritimeComponent.Updated.replace("{0}", "Error, ")
                    .replace("{1}", "actualizando ").replace("{2}", "envio maritimo. ")
                    : validationUtils.HasErrors(bindingResult);
        }

        catch (Exception e){

            throw new CustomException(String.format(maritimeComponent.ApiProblem, e.getMessage()));
        }
    }

    @DeleteMapping("/remove/{id}")
    public String RemoveShipment(@PathVariable Long id) {

        try{

            return maritimeService.Remove(id) ?  maritimeComponent.Updated.replace("{0}", "Envio maritimo, ")
                    .replace("{1}", "eliminado ").replace("{2}", "exitosamente. ")
                    : maritimeComponent.Updated.replace("{0}", "Error, ")
                    .replace("{1}", "eliminando ").replace("{2}", "envio maritimo. ");
        }

        catch (Exception e){

            throw new CustomException(String.format(maritimeComponent.ApiProblem, e.getMessage()));
        }
    }

}
