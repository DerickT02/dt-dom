import { createVApp } from "./main";
import mount from "../vdom/mount";
import render from "../vdom/render";
import diff from "../vdom/diff";

let count = 0
var vApp = createVApp(count)
const $app = render(vApp)

let $elRoot = mount(document.getElementById("app"), $app)
setInterval(() => {
    count++
   
    const newVApp = createVApp(count)
    
    const patch = diff(vApp, vApp)

    console.log("patch", patch)
    $elRoot = patch($elRoot)
   
    vApp = newVApp
    console.log("vApp", vApp)
    console.log("newVApp", newVApp)

   
}, 10000)