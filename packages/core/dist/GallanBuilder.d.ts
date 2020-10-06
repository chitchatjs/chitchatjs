import { Talk } from "./Talk";
interface GallanOptions {
    version: string;
    src: string;
    outDir: string;
}
declare class GallanBuilder {
    build(talk: Talk, options: GallanOptions): void;
    _buildInteractionModel(talk: Talk): {
        "languageModel": {
            "invocationName": string;
            "modelConfiguration": {
                "fallbackIntentSensitivity": {
                    "level": string;
                };
            };
            "intents": {
                "name": string;
                "samples": string[];
            }[];
            "types": never[];
        };
    };
    _setupProject(): void;
}
export { GallanBuilder };
