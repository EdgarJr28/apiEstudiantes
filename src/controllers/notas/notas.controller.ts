import { Request, Response, NextFunction } from "express";
import { NotasService } from "../../services/notas/notas.service";


export class NotasController {
    private notasService: NotasService;

    constructor() {
        // Instanciamos el servicio en el constructor
        this.notasService = new NotasService();
    }


    async registrarNota(req: Request, res: Response, next: NextFunction) {
        try {
            // Llamamos al servicio para registrar una nota
            const estudiante = await this.notasService.registrarNota();

            // Envía la respuesta exitosa
            res.status(200).json({ estudiante });
        } catch (error) {
            // Si hay un error, pasa al siguiente middleware de error
            next(error);
        }
    }

}
