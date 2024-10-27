import { Router } from 'express';
import { validarToken } from '../../middlewares/authMiddleware';
import { EstudiantesController } from '../../controllers/estudiantes/estudiantes.controller';



const router = Router();
const estudianteController = new EstudiantesController();

/**
 * @swagger
 * tags:
 *   name: Estudiantes
 *   description: API para la gestión de estudiantes
 */

/**
 * @swagger
 * /estudiantes:
 *   post:
 *     summary: Crear un nuevo estudiante
 *     tags: [Estudiantes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Perez"
 *               correo:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *               edad:
 *                 type: number
 *                 example: 20
 *               matriculado:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Estudiante creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', validarToken, (req, res, next) => estudianteController.crear(req, res, next));

/**
 * @swagger
 * /estudiantes:
 *   get:
 *     summary: Obtener todos los estudiantes
 *     tags: [Estudiantes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estudiantes
 */
router.get('/', validarToken, (req, res, next) => estudianteController.obtenerTodos(req, res, next));

/**
 * @swagger
 * /estudiantes/{id}:
 *   get:
 *     summary: Obtener un estudiante por ID
 *     tags: [Estudiantes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "613b1f2a3f0f2b1a3c1b4a5f"
 *     responses:
 *       200:
 *         description: Estudiante encontrado
 *       404:
 *         description: Estudiante no encontrado
 */
router.get('/:id', validarToken, (req, res, next) => estudianteController.obtenerPorId(req, res, next));

/**
 * @swagger
 * /estudiantes/{id}:
 *   put:
 *     summary: Actualizar un estudiante
 *     tags: [Estudiantes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "613b1f2a3f0f2b1a3c1b4a5f"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               edad:
 *                 type: number
 *               matriculado:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Estudiante actualizado
 *       404:
 *         description: Estudiante no encontrado
 */
router.put('/:id', validarToken, (req, res, next) => estudianteController.actualizar(req, res, next));

/**
 * @swagger
 * /estudiantes/{id}:
 *   delete:
 *     summary: Eliminar un estudiante
 *     tags: [Estudiantes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "613b1f2a3f0f2b1a3c1b4a5f"
 *     responses:
 *       200:
 *         description: Estudiante eliminado
 *       404:
 *         description: Estudiante no encontrado
 */
router.delete('/:id', validarToken, (req, res, next) => estudianteController.eliminar(req, res, next));

export default router;
