import { Request, Response } from "express";
import fluentffmpeg from "fluent-ffmpeg";
import utils from "./utils/ffmpeg";
import VideoQueueManager from "./utils/videoManager";


class Controller {
  convert(req: Request, res: Response) {
    const videoQueueManagerInstance = VideoQueueManager.getInstance();

    console.log(videoQueueManagerInstance.size())
  
    res.send(videoQueueManagerInstance.getList())
    // res.send(req.file);
  }
}

export default new Controller();

// export default {
//   convert: async (req: Request, res: Response) => {
//     const response = {} as any;
//     const ffmpeg = fluentffmpeg();
//     ffmpeg
//     .input(
//       "C:/Users/alien/OneDrive/Desktop/Laboratory/transcodeusingffmpeg/videos/input/2.3gp"
//     )

//     // TODO: determine if the file is a mp4 file so in that case not accion is required
//     // TODO: convert the file to mp4 if necessary.
//     // TODO: load the converted video to blob storage in azure

//   },
// };

// ffmpeg
//       .input('C:/Users/alien/OneDrive/Desktop/Laboratory/transcodeusingffmpeg/videos/input/2.3gp')
//       .toFormat("mp4")
//       .on("error", function (err) {
//         console.log("An error occurred: " + err.message);
//       })
//       .on("end", function () {
//         res.send('done')
//       })
//       .saveToFile("C:/Users/alien/OneDrive/Desktop/Laboratory/transcodeusingffmpeg/videos/output/output.mp4");
