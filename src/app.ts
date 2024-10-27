import express, { Application, Request, Response } from "express";
import cors from 'cors';
import morgan from "morgan";
import routes from './routes/index.routes';
import http from 'http';
import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import conectarDB from "./config/database";
import dotenv from 'dotenv';
import configurarSocket from "./config/socket";




const app: Application = express();
const server = http.createServer(app); // Crear el servidor HTTP
const io = configurarSocket(server); // Guarda la instancia de Socket.IO

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const SERVER_PORT: number = 3000;


// middlewares
app.use(express.json()); // la instancia app usa el modulo de express JSON
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // esta instancia usa el modulo de politica de privacidad Cors
app.set('view engine', 'ejs'); // Configuramos EJS como el mo tor de plantillas
app.set('views', path.join(__dirname, 'views'));

//swagger docs
const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Studens Management API',
            version: '1.0.0',
            description: 'Documentación de la API creada con Express y Swagger',
        },
        servers: [
            {
                url: `http://localhost:${SERVER_PORT}`,
            },

        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Indica que es un JWT
                },
            },
        },
        security: [
            {
                bearerAuth: [], // Define bearerAuth como método de seguridad por defecto
            },
        ],
    },
    apis: ['./src/routes/**/*.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// dev 
app.use(morgan('dev')); // esta instacia usa el modulo morgan para el registro de peticiones requeridas a la API


// Conectar a MongoDB
conectarDB()

//router
app.get('/', (req: Request, res: Response) => {
    res.render('index', { title: 'API', name: "Ed", port: SERVER_PORT });
});

app.use('/', routes);

server.listen(SERVER_PORT, () => {
    console.log("|------- ", Date(), " -------|");
    console.log(`Server Listening on port: ${SERVER_PORT}`);
    console.log(`Socket Ready on port: ${SERVER_PORT}`);
});