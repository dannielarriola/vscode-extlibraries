// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var fs = require('fs');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "extlibraries" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    var disposable = vscode.commands.registerCommand('extension.addExtLibrary', function () {
        // The code you place here will be executed every time your command is executed
        var options = {
            "prompt": "External library, directory or file path"
        }
        vscode.window.showInputBox(options).then((input) => {
            if (input != '' && input != undefined) {
                fs.stat(input, (err, stat) => {
                    if (stat && (stat.isFile() || stat.isDirectory())) {
                        vscode.window.showInputBox({ "prompt": "Name" }).then((name) => {
                            fs.symlink(input, vscode.workspace.rootPath + "/" + name,  () => {
                                vscode.window.showInformationMessage('symlink created in ' + vscode.workspace.rootPath + "/" + name);
                            });
                        });
                    }else{
                        vscode.window.showErrorMessage('You must provide a valid file or directory path');
                    }
                });
            } else {
                vscode.window.showErrorMessage('You must provide a valid file or directory path');
            }

        });
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;