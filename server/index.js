import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { Readable, Transform } from "node:stream";
import { WritableStream, TransformStream } from "node:stream/web";
import csvtojson from "csvtojson";

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

    let items = 0;
    Readable.toWeb(createReadStream("./animeflv.csv"))
        .pipeThrough(Transform.toWeb(csvtojson()))
        .pipeTo(new WritableStream({
            write(chunk) {
                items++
                response.write(chunk)
            },
            close() {
                response.end();
            }
        }))

    response.writeHead(200, headers)
    // response.end("ok")
})
    .listen(PORT)
    .on("listening", _ => console.log(`Server is running at ${PORT}`))