import * as fs from "fs";
export class FileWriter {
    write(path: string, file: any) {
        fs.writeFileSync(path, JSON.stringify(file, null, 2));
    }

    existsSync(path: string) {
        return fs.existsSync(path);
    }

    // TODO fix me
    read(path: string): string {
        return fs.readFileSync(path, "utf8");
    }
}
