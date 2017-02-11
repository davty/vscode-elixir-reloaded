/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import * as path from 'path';
import { spawn, execFile, ChildProcess } from 'mz/child_process';
import * as vscode from 'vscode';
import * as semver from 'semver';
import * as net from 'net';
import * as url from 'url';

import { workspace, Disposable, ExtensionContext } from 'vscode';
import { LanguageClient, LanguageClientOptions, SettingMonitor, ServerOptions, StreamInfo, TransportKind } from 'vscode-languageclient';

export function activate(context: ExtensionContext) {

  const createServer = () => new Promise<ChildProcess | StreamInfo>((resolve, reject) => {
        //TODO: spawn language server

        // connect to language server
        var socket = new net.Socket();
        socket.connect(63213, '127.0.0.1', function () {
          resolve({
            reader: socket,
            writer: socket
          });
        });
    });
c

    let clientOptions: LanguageClientOptions = {
        // Register the server for plain text documents
        documentSelector: ['elixir'],
        synchronize: {
            configurationSection: 'elixir',
            // Notify the server about file changes to '.clientrc files contain in the workspace
            fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
        }
    }


    const client = new LanguageClient('elixir', 'Elixir Language Server', createServer, clientOptions, true);
    let disposable = client.start();

    // Push the disposable to the context's subscriptions so that the 
    // client can be deactivated on extension deactivation
    context.subscriptions.push(disposable);
}
