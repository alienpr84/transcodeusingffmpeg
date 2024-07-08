import express from "express";
import controller from "./controller";
import middlewares from "./middlewares";
import { Multer } from "multer";
import VideoQueueManager from "./utils/videoManager";

const app = express();
const port = 8081;
const { storageVideo } = middlewares;

const upload = storageVideo() as Multer;

VideoQueueManager.getInstance();

app.post("/uploadvideo"/*, upload.single('video')*/, controller.convert);

app.listen(port, () => console.log(`Server listen on port: ${port}`));

