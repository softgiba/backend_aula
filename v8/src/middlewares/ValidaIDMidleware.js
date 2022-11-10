import usuarios from "../models/Usuario.js";

// valiidar se o id é válido
class ValidaIDMidleware {
    static checaId = (id) => {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            return id;
        }
        return false;
    }
}

export default ValidaIDMidleware;
