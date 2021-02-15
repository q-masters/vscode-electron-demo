import * as vscode from "vscode"
import * as path from "path"
import { ChildProcess } from "child_process"

export function openUriCommand(): void {

    vscode.window.showInputBox({
        value: "",
        placeHolder: "https://www.google.com",
        prompt: "insert website to load",
        validateInput: (value) => value ? "" : "Enter a valid uri"
    }).then(async (value) => {

        if (value) {
            const electron_app = path.resolve(__dirname, `electron-main.js`)

            const params = {
                version: 'v11.2.0',
                params: [ value ]
            }
            const process = await vscode.commands.executeCommand<ChildProcess>('qmasters:electron.run', electron_app, params)

            if (process) {
                process.on("message", (message) => console.log(message))
            } else {
                console.log("no process ...")
            }
        }
    })
}
