import createError from 'http-errors';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../../controllers/usuarios/usuarios.model';




const SECRET_KEY = process.env.SECRET_KEY || 'CocaColaConPan&Salchichon@SancochoDeTienda';
export class AuthService {
    async registrarUsuario(nombre: string, correo: string, contraseña: string) {
        try {
            const usuarioExistente = await Usuario.findOne({ correo });
            if (usuarioExistente) {
                return { mensaje: 'El correo ya está registrado' };
            }

            const nuevoUsuario = new Usuario({ nombre, correo, contraseña });
            await nuevoUsuario.save();

            return { mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario };
        } catch (e: any) {
            throw createError(500, e.message);
        }
    }

    async loginUsuario(correo: string, contraseña: string) {
        try {
            const usuario = await Usuario.findOne({ correo });
            if (!usuario) {
                return
            }

            const esContraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
            if (!esContraseñaValida) {
                return { mensaje: 'Contraseña incorrecta' };
            }

            // Genera el token
            const token = jwt.sign({ id: usuario._id, username: usuario.nombre, correo: usuario.correo }, SECRET_KEY, { expiresIn: '1h' });
            return { mensaje: 'Autenticación exitosa', token, status: true };
        } catch (e: any) {
            throw createError(500, e.message);
        }

    }

}
