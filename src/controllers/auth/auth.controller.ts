import { Request, Response, NextFunction } from "express";
import createError from 'http-errors';
import { AuthService } from "../../services/auth/auth.service";


export class AuthController {
    private authService: AuthService;


    constructor() {
        // Instanciamos el servicio en el constructor
        this.authService = new AuthService();
    }


    async registrar(req: Request, res: Response, next: NextFunction) {
        try {
            const { nombre, correo, contraseña } = req.body;
            // Llamamos al servicio para obtener el estudiante
            const user = await this.authService.registrarUsuario(nombre, correo, contraseña);

            // Envía la respuesta exitosa
            res.status(200).json({ user });
        } catch (e: any) {
            throw createError(500, e.message);
        }
    }


    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { correo, contraseña } = req.body;
            const response = await this.authService.loginUsuario(correo, contraseña);

            if (response?.mensaje !== 'Autenticación exitosa') {
                // Si el mensaje no es de autenticación exitosa, envía un código de error
                return res.status(401).json({ mensaje: response?.mensaje || 'Usuario o contraseña incorrecta.' });
            }

            // Enviar respuesta con éxito
            return res.status(200).json(response);
        } catch (e: any) {
            return next(createError(500, e.message));
        }
    }


}
