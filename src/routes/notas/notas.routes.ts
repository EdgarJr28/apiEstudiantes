import { Router } from 'express';
import { NotasController } from '../../controllers/notas/notas.controller';

const notasRouter = Router();
const notasController = new NotasController();

/**
 * @swagger
 * tags:
 *   - name: Notas
 *     description: Operaciones relacionadas con las Notas
 *
 * /nota/registrar:
 *   post:
 *     summary: Registra una notas
 *     description: Retorna la ruta.
 *     tags:
 *       - Notas
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 * 
 */

notasRouter.get('/', (req, res) => {
    res.send('Estudiantes Routes');
});

notasRouter.post('/registrar', (req, res, next) => notasController.registrarNota(req, res, next));


export default notasRouter;
