import createError from 'http-errors';

export class NotasService {


    async registrarNota() {
        try {
            return "/nota/registrar"

        } catch (e: any) {
            throw createError(500, e.message);
        }
    }

}
