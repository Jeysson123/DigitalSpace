class RegexUtils {
    static ExtractValue(pattern, input) {
        const match = input.match(pattern);
        let value = '';
        if (match) {
            value = match[1];
        } 
        return value;
    }
}

export default RegexUtils;
