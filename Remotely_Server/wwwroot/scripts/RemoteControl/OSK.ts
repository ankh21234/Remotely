import { RemoteControl } from "./RemoteControl.js";
import * as UI from "./UI.js";

window.addEventListener("load", (ev)=>{
    document.querySelectorAll(".osk-key").forEach(key=>{
        key.addEventListener("click", (ev)=>{
            if (key.id == "shiftKey") {
                document.querySelectorAll('[alt-key]').forEach(dualKey=>{
                    var newVal = dualKey.getAttribute("alt-key");
                    var oldVal = dualKey.innerHTML;
                    dualKey.innerHTML = newVal;
                    dualKey.setAttribute("alt-key", oldVal);
                })
            }
            if (key.id == "shiftKey" || key.id == "ctrlKey" || key.id == "altKey"){
                key.classList.toggle("toggled");
                if (key.classList.contains("toggled")) {
                    RemoteControl.RCBrowserSockets.SendKeyDown(key.innerHTML);
                }
                else {
                    RemoteControl.RCBrowserSockets.SendKeyUp(key.innerHTML);
                }
            }
            else if (key.innerHTML == "Space") {
                RemoteControl.RCBrowserSockets.SendKeyPress(" ");
            }
            else {
                RemoteControl.RCBrowserSockets.SendKeyPress(key.innerHTML);
            }
        });
    })
    document.getElementById("closeOSKButton").addEventListener("click", () => {
        UI.OnScreenKeyboard.classList.toggle("open");
    })
});