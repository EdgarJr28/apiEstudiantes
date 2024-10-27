import mongoose from 'mongoose';

const conectarDB = async (): Promise<void> => {
    try {
        const dbUri = process.env.MONGO_URI ;
        if (!dbUri) {
            throw new Error('Database connection string is not defined in environment variables');
        }
        await mongoose.connect(dbUri);
        console.log('Conexión a MongoDB exitosa');
    } catch (error: any) {
        console.log('Error al conectar a MongoDB:', error.message);
        process.exit(1); // Finaliza el proceso en caso de error de conexión
    }
};

export default conectarDB;
