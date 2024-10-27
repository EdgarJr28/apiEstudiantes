import createError from 'http-errors';
import Estudiante, { IEstudiante } from '../../models/estudiantes.model';


export class EstudianteService {
    async crearEstudiante(nombre: string, correo: string, edad: number, matriculado: boolean = true): Promise<IEstudiante> {
        const estudianteExistente = await Estudiante.findOne({ correo });
        if (estudianteExistente) {
            throw createError(400, 'El correo ya está registrado.');
        }

        const nuevoEstudiante = new Estudiante({ nombre, correo, edad, matriculado });
        return await nuevoEstudiante.save();
    }

    async obtenerEstudiantes(): Promise<IEstudiante[]> {
        return await Estudiante.find();
    }

    async obtenerEstudiantePorId(id: string): Promise<IEstudiante | null> {
        return await Estudiante.findById(id);
    }

    async actualizarEstudiante(id: string, data: Partial<IEstudiante>): Promise<IEstudiante | null> {
        return await Estudiante.findByIdAndUpdate(id, data, { new: true });
    }

    async eliminarEstudiante(id: string): Promise<IEstudiante | null> {
        return await Estudiante.findByIdAndDelete(id);
    }
}
