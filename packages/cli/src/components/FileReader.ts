import * as fs from "fs";

export class SafeFileSystem {
    readSync(path: string) {
        let fd;
        try {
            fd = fs.readFileSync(path, "utf8");
        } finally {
            // fs.close();
        }
    }
}
