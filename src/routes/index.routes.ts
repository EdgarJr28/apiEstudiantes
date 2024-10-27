import { Router } from 'express';
import estudiantesRouter from './estudiantes/estudiantes.routes';
import notasRouter from './notas/notas.routes';
import authRouter from './auth/auth.routes';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Index
 *     description: index routes
 * 
 * /test:
 *   get:
 *     summary: Devuelve un saludo
 *     description: Retorna un mensaje de saludo al usuario.
 *     tags:
 *      - Index
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Hi, I'm alive!"
 */

// Test Route
router.get('/test', (req, res) => {
    res.json('Hi, I\'m alive!');
});

// estudiantes routes
router.use('/estudiantes', estudiantesRouter);

// notas routes
router.use('/nota', notasRouter);
// another routes
router.use('/auth', authRouter);

export default router;
