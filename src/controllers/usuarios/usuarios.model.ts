import mongoose, { Document, Schema } from 'mongoose';


interface IUsuario extends Document {
  nombre: string;
  correo: string;
  contraseña: string;
}

// Esquema del usuario
const usuarioSchema: Schema<IUsuario> = new Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
});

// Antes de guardar el usuario, hashea la contraseña
usuarioSchema.pre<IUsuario>('save', async function (next) {
  const bcrypt = require('bcrypt');
  if (!this.isModified('contraseña')) return next();

  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

const Usuario = mongoose.model<IUsuario>('Usuario', usuarioSchema);

export default Usuario;
export { IUsuario };
