import express from 'express';
import {LRCParser} from "./parser";
import multer, {Multer, StorageEngine} from "multer";
import * as fs from 'fs';

const app: express.Express = express();
const storage: StorageEngine = multer.diskStorage({
    destination: (
        req: express.Request,
        res: Express.Multer.File,
        callback: (err: Error | null, filename: string) => void
    ) => {
        callback(null, "./tmp");
    },
    filename: (req: express.Request,
               file: Express.Multer.File,
               callback: (error: (Error | null), filename: string) => void
    ) => {
        callback(null, file.originalname);
    }
})
const upload: Multer = multer({
    storage: storage
});

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    // local環境で動かすので全て許可する。
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.get("/", (req: express.Request, res: express.Response) => {
    res.send({"status": "ok"});
});
app.post("/lrc", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(500).send({"message": "file not found"})
    }

    const filename: string = req.file.originalname;
    const parser: LRCParser = new LRCParser(`./tmp/${filename}`);

    parser.parse().then(() => {
        return res.status(200).send(JSON.stringify(parser.getLRC()));
    }).catch(() => {
        return res.status(503).send({
            "message": "Error"
        });
    });
});

app.listen(8080, () => {
    if (!fs.existsSync("./tmp")) fs.mkdirSync("./tmp");

    console.log("Listening port 8080");
});
