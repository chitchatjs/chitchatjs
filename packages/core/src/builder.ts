import { GallanBuilder } from "./GallanBuilder";
import { Talk } from "./Talk";
import gallanOptions from "./cjs.json"
console.log(`Building chatbot package using options: ${JSON.stringify(gallanOptions, null, 2)}`)

const run = async () => {
    console.log(__dirname)
    const chatbot = await import(gallanOptions.src)

    let gallanBuilder = new GallanBuilder()
    gallanBuilder.build(chatbot.talk, gallanOptions)
}

run()