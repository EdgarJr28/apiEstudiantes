// config/socket.ts
import { Server } from 'socket.io';
import http from 'http';
import { getDate } from '../utils/getDate';

const configurarSocket = (server: http.Server) => {

    // Configuracion Socket.io
    const io = new Server(server, {
        cors: {
            origin: '*', // Permitir todas las conexiones
            methods: ['GET', 'POST'],
            allowedHeaders: ['my-custom-header'],
            credentials: true
        }
    });

    io.on('connection', (socket: any) => {
        console.log(`[${getDate()}] - Nuevo cliente conectado: ${socket.id}`);

        // Escuchar mensajes de los clientes
        socket.on('message', (msg: any) => {
            let messageView = {
                user: msg.user,
                message: msg.message,
                socketId: socket.id,
                date: getDate()
            }
            console.log(messageView);
            // Emitir el mensaje a todos los clientes
            io.emit('message', msg);
        });

        io.on('join', (username: any) => {
            if (typeof username === 'string' && username.trim() !== '') {
                socket.username = username;
                socket.emit('message', { user: 'System', message: `${username} has joined the chat` });
                // Notificar a todos los usuarios sobre la nueva conexión
                socket.broadcast.emit('message', { user: 'System', message: `${username} has joined the chat` });
            } else {
                // Enviar un error si el nombre de usuario es inválido
                socket.emit('message', { user: 'System', message: 'Invalid username' });
            }
        });

        // Desconectar cliente
        socket.on('disconnect', () => {
            console.log(`[${getDate()}] - Cliente desconectado: ${socket.id}`);
        });
    });

    return io;
};

export default configurarSocket;
