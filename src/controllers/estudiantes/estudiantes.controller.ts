import { Request, Response, NextFunction } from 'express';
import { EstudianteService } from '../../services/estudiantes/estudiantes.service';
import createHttpError from 'http-errors';


export class EstudiantesController {
    private estudianteService: EstudianteService;

    constructor() {
        this.estudianteService = new EstudianteService();
    }

    async crear(req: Request, res: Response, next: NextFunction) {
        try {
            const { nombre, correo, edad, matriculado } = req.body;
            const estudiante = await this.estudianteService.crearEstudiante(nombre, correo, edad, matriculado);
            res.status(201).json(estudiante);
        } catch (error) {
            next(createHttpError(500, (error as Error).message));
        }
    }

    async obtenerTodos(req: Request, res: Response, next: NextFunction) {
        try {
            const estudiantes = await this.estudianteService.obtenerEstudiantes();
            res.status(200).json(estudiantes);
        } catch (error) {
            next(createHttpError(500, (error as Error).message));
        }
    }

    async obtenerPorId(req: Request, res: Response, next: NextFunction) {
        try {
            const estudiante = await this.estudianteService.obtenerEstudiantePorId(req.params.id);
            if (!estudiante) {
                return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
            }
            res.status(200).json(estudiante);
        } catch (error) {
            next(createHttpError(500, (error as Error).message));
        }
    }

    async actualizar(req: Request, res: Response, next: NextFunction) {
        try {
            const estudiante = await this.estudianteService.actualizarEstudiante(req.params.id, req.body);
            if (!estudiante) {
                return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
            }
            res.status(200).json(estudiante);
        } catch (error) {
            next(createHttpError(500, (error as Error).message));
        }
    }

    async eliminar(req: Request, res: Response, next: NextFunction) {
        try {
            const estudiante = await this.estudianteService.eliminarEstudiante(req.params.id);
            if (!estudiante) {
                return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
            }
            res.status(200).json({ mensaje: 'Estudiante eliminado' });
        } catch (error) {
            next(createHttpError(500, (error as Error).message));
        }
    }
}
