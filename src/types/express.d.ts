// types/express.d.ts
import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        user?: string | JwtPayload; // O ajusta según los datos en tu token
    }
}
