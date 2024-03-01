package com.transport.client.controllers;
import com.transport.common.components.CommonComponent;
import com.transport.common.dtos.CustomException;
import com.transport.common.entitys.Client;
import com.transport.common.services.CommonService;
import com.transport.common.utils.ValidationsUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/transport/client")
public class ClientController {
    @Autowired
    private CommonComponent clientComponent;
    @Autowired
    private CommonService<Client> clientService;
    @Autowired
    private ValidationsUtils validationUtils;
    private final String entityType;
    public ClientController(@Value("${entity.type}") String entityType) {

        this.entityType = entityType;
    }

    @GetMapping("/get")
    public List<Client> ListClients() {

        try{

            return clientService.List();
        }

        catch (Exception e){

            throw new CustomException(String.format(clientComponent.ApiProblem, e.getMessage()));
        }
    }

    @GetMapping("/find")
    public Client GetClient(@RequestParam Long id) {

        try{

            return clientService.Get(id);
        }

        catch (Exception e){

            throw new CustomException(String.format(clientComponent.ApiProblem, e.getMessage()));
        }
    }

    @PostMapping("/login")
    public Client SiginClient(@RequestBody Client client) {

        try{

            return clientService.List().stream().filter(cl -> cl.getCorreoCliente().trim().equals(client.getCorreoCliente().trim())
                    && cl.getClaveCliente().trim().equals(client.getClaveCliente().trim())).findFirst().orElse(null);
        }

        catch (Exception e){

            throw new CustomException(String.format(clientComponent.ApiProblem, e.getMessage()));
        }
    }

    @PostMapping("/insert")
    public String InsertClient(@RequestBody @Valid Client Client, BindingResult bindingResult) {

        try{

            return validationUtils.HasErrors(bindingResult).isEmpty() ? clientService.Add(Client)
                    ?  clientComponent.SuccessRegister : clientComponent.ErrorRegister
                    : validationUtils.HasErrors(bindingResult);
        }

        catch (Exception e){

            throw new CustomException(String.format(clientComponent.ApiProblem, e.getMessage()));
        }
    }

    @PutMapping("/update/{id}")
    public String UpdateClient(@PathVariable Long id, @RequestBody @Valid Client Client, BindingResult bindingResult) {

        try{

            return validationUtils.HasErrors(bindingResult).isEmpty() ? clientService.Update(id, Client) ? clientComponent.Updated.replace("{0}", "Cliente, ")
                    .replace("{1}", "actualizado ").replace("{2}", "exitosamente. ")
                    : clientComponent.Updated.replace("{0}", "Error, ")
                    .replace("{1}", "actualizando ").replace("{2}", "cliente. ")
                    : validationUtils.HasErrors(bindingResult);
        }

        catch (Exception e){

            throw new CustomException(String.format(clientComponent.ApiProblem, e.getMessage()));
        }
    }

    @DeleteMapping("/remove/{id}")
    public String RemoveClient(@PathVariable Long id) {

        try{

            return clientService.Remove(id) ?  clientComponent.Updated.replace("{0}", "Envio maritimo, ")
                    .replace("{1}", "eliminado ").replace("{2}", "exitosamente. ")
                    : clientComponent.Updated.replace("{0}", "Error, ")
                    .replace("{1}", "eliminando ").replace("{2}", "envio maritimo. ");
        }

        catch (Exception e){

            throw new CustomException(String.format(clientComponent.ApiProblem, e.getMessage()));
        }
    }

}
