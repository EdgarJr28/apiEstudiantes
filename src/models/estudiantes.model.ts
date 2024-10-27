import mongoose, { Document, Schema } from 'mongoose';

interface IEstudiante extends Document {
    nombre: string;
    correo: string;
    edad: number;
    matriculado: boolean;
}

const estudianteSchema: Schema<IEstudiante> = new Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    edad: { type: Number, required: true },
    matriculado: { type: Boolean, default: true },
});

const Estudiante = mongoose.model<IEstudiante>('Estudiante', estudianteSchema);

export default Estudiante;
export { IEstudiante };
