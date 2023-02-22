// This file is used to expose the electron API to the renderer process
const {ipcRenderer, contextBridge} = require('electron');

// Expose protected methods that allow the renderer process to use
contextBridge.exposeInMainWorld("electron", {
    // Expose the notification API
    notificationApi: {
        // Expose the receiveSQL API to the renderer process 
        async receiveSQL(message) {
            // Send the sql query to the main process and wait for the response then return the result
            result = await ipcRenderer.invoke("notify", message)
            return result;
        },
        // Expose the sendSQL API to the renderer process
        async sendSQL(message) {
            // Send the sql query to the main process
            await ipcRenderer.invoke("notify", message)
        },
        // Expose the sendError API to the renderer process
        async sendError(message) {
            // Send the error message to the main process to display a notification
            ipcRenderer.send("error", message)
        },
        // Expose the sendSuccess API to the renderer process
        async sendSuccess(message) {
            // Send the success message to the main process to display a notification
            ipcRenderer.send("success", message)
        }
    }
    ,
    // Expose the quit API
    quitApp: {
        quit() {
            // Send the quit message to the main process to quit the application
            ipcRenderer.send("quit");
        }
    }
});