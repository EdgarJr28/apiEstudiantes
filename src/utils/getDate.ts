export const getDate = (): string => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Cambia a true si prefieres formato 12 horas
    };

    const date = now.toLocaleDateString('es-ES', options); // Formato de fecha


    return date
};