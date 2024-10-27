import { Router } from 'express';
import { AuthController } from '../../controllers/auth/auth.controller';


const authRouter = Router();
const authController = new AuthController();

/**
 * @swagger
 * tags:
 *   - name: Autenticación
 *     description: Operaciones relacionadas con la autenticación de usuarios
 *
 * /auth/registrar:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Crea una cuenta para un nuevo usuario.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               correo:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *               contraseña:
 *                 type: string
 *                 example: "contraseña123"
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "61234abcde"
 *                     nombre:
 *                       type: string
 *                       example: "Juan Pérez"
 *                     correo:
 *                       type: string
 *                       example: "juan.perez@example.com"
 *
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autentica a un usuario y devuelve los datos del usuario autenticado.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *               contraseña:
 *                 type: string
 *                 example: "contraseña123"
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "61234abcde"
 *                     nombre:
 *                       type: string
 *                       example: "Juan Pérez"
 *                     correo:
 *                       type: string
 *                       example: "juan.perez@example.com"
 */

authRouter.get('/', (req, res) => {
    res.send('Estudiantes Routes');
});

authRouter.post('/login', (req, res, next) => authController.login(req, res, next));
authRouter.post('/registrar', (req, res, next) => authController.registrar(req, res, next));



export default authRouter;
