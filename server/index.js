import { createServer } from "node:http";
import { createReadStream } from "node:fs";

const PORT = 3000;
// curl -i -X OPTIONS -N localhost:3000
// curl -N localhost:3000
createServer(async (request, response) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
    }
    if (request.method === "OPTIONS") {
        response.writeHead(204, headers)
        response.end()
        return;
    }

    createReadStream("./animeflv.csv")
        .pipe(response)

    response.writeHead(200, headers)
    // response.end("ok")
})
    .listen(PORT)
    .on("listening", _ => console.log(`Server is running at ${PORT}`))