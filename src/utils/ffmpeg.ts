import fluentFfmpeg, { FfmpegCommand, FfprobeData, Formats } from "fluent-ffmpeg";

class Ffmpeg {
  getMetadata(ffmpeg: FfmpegCommand): Promise<FfprobeData> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe((error, metadata) => {
        if (error) {
          reject(error);
        }

        resolve(metadata);
      });
    });
  }

  async getFormat(ffmpeg: FfmpegCommand): Promise<string> {
    const data = await this.getMetadata(ffmpeg);
    return data.format.format_name as string;
  }

  async getAvailableFormats()/*: Promise<string[]>*/ {
    const getFormats = () => new Promise((resolve, rejects) => {
      const ffmpeg = fluentFfmpeg();
      ffmpeg.getAvailableFormats((error, formats) => {
        if(error) {
          rejects(error);
        }

        resolve(formats);
      })
    })

    const formats = await getFormats() as Formats;
    return formats;
  }
}

export default new Ffmpeg();
