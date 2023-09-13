const http = require("http");
const { exec } = require("child_process");

const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/crearContenedor") {
        // Comando para crear un contenedor
        const dockerRunCommand = 'docker run -d --name mi_contenedor -p 8080:80 nginx';

        exec(dockerRunCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al crear el contenedor: ${error}`);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error al crear el contenedor");
                return;
            }

            console.log(`Contenedor creado con éxito. ID del contenedor: ${stdout}`);
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Contenedor creado con éxito");
        });
    } else if (req.method === "DELETE" && req.url === "/eliminarContenedor") {
        // Comando para eliminar un contenedor
        const dockerRmCommand = 'docker rm mi_contenedor';

        exec(dockerRmCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al eliminar el contenedor: ${error}`);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error al eliminar el contenedor");
                return;
            }

            console.log(`Contenedor eliminado con éxito. Salida: ${stdout}`);
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Contenedor eliminado con éxito");
        });
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Ruta no encontrada");
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
