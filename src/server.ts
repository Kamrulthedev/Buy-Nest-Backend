import { Server } from "http";
import app from "./app";
import config from "./app/config";


async function main() {
    const server : Server = app.listen(config.PROT, () => {
        console.log("Server is running on port", config.PROT)
    })
};

main()


