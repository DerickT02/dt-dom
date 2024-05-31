const renderElem = ({tagName, attrs, children}) => {
    //Create an element based on the tagName (div, h1, video, etc...)
    const $el = document.createElement(tagName);
    
    //set that elements attributes (id, className, src, etc...)
    for(const [k, v] of Object.entries(attrs)){
        $el.setAttribute(k, v)
    }
    //render out the children of the current element
    for(const child of children){
        $el.appendChild(render(child))
    }

    return $el
}

const render = (vNode) => {
    //check if we only have a string, if we do, just create a TextNode for it
    if(typeof vNode == "string"){
        return document.createTextNode(vNode)
    }
    //else, render out the elements, starting from the parent
    return renderElem(vNode)
}

export default render;