package com.transport.common.utils;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class ValidationsUtils {
    public boolean ValidData(String pattern, String input) throws Exception {

        Pattern regex = Pattern.compile(pattern);

        Matcher matcher = regex.matcher(input);

        return matcher.matches();
    }

    public String HasErrors(BindingResult bindingResult) throws Exception {

        if (bindingResult.hasErrors()) {

            StringBuilder errors = new StringBuilder();
            bindingResult.getAllErrors().forEach(error -> errors.append(error.getDefaultMessage()).append("\n"));
            return errors.toString();
        }

        return "";
    }
}
