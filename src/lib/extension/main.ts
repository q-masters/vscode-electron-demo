import "reflect-metadata"
import * as vscode from "vscode"
import { openUriCommand } from "./commands/open-uri"

export function activate(context: vscode.ExtensionContext) {

    let disposables = [
        /**
         * run electron
         *
         */
        vscode.commands.registerCommand('qmasters:electron.demo', async () => {
            await vscode.commands.executeCommand(`qmasters:electron.install`, `v11.1.0`)
            vscode.commands.executeCommand(`qmasters:electron.openUri`)
        }),
        vscode.commands.registerCommand('qmasters:electron.openUri', openUriCommand)
    ]
    context.subscriptions.push(...disposables)
}

/**
 * extension gets deactivated
 *
 */
export function deactivate() {
}
