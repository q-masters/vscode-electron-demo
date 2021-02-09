import "reflect-metadata";
import * as vscode from "vscode";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
    let disposables = [
        /**
         * run electron
         *
         */
        vscode.commands.registerCommand('qmasters:electron.demo', () => {
            const electron_app = path.resolve(__dirname, `electron-main.js`);
            vscode.commands.executeCommand('qmasters:electron.run', electron_app);
        })
    ]
    context.subscriptions.push(...disposables);
}

/**
 * extension gets deactivated
 *
 */
export function deactivate() {
}
