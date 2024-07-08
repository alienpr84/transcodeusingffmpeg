import { resolve } from "path";

class Utils {
  getAbsulutePathForProject() {
    return resolve(__dirname).split("src")[0];
  }
}

export default new Utils();