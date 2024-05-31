import render from "./render";

const zip = (xs, ys) => {
    const zipped = [];
    for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
      zipped.push([xs[i], ys[i]]);
    }
    return zipped;
  };

//change the attributes if they are different
const diffAttrs = (oldAttrs, newAttrs) => {
    const patches = [];
  //loop over the newAttributes and push a function that will set that attribute
    for(const [k, v] of Object.entries(newAttrs)){
        patches.push($node => {
            $node.setAttribute(k, v)
            return $node
        })
    }
  //loop over the old attributes and remove the ones that are not in the new attributes
    for(const k in oldAttrs){
        if(!(k in newAttrs)){
            patches.push($node => {
                $node.removeAttribute(k)
                return $node
            })
        }
    }
  //return a function that takes in a parameter $node and applies the changes in the patches to that node, and then return that node
    return $node => {
        
        for (const patch of patches){
            patch($node)
        }
        return $node
    }
  };
  
  const diffChildren = (oldVChildren, newVChildren) => {
    const childPatches = [];
    oldVChildren.forEach((oldVChild, i) => {
        childPatches.push(diff(oldVChild, newVChildren[i]));
    })

    const additionalPatches = [];
    for(const additionalVChild of newVChildren.slice(oldVChildren.length)){
        additionalPatches.push($node => {
            $node.appendChild(render(additionalVChild))
            return $node
        })
    }
    return $parent => {
        // since childPatches are expecting the $child, not $parent,
        // we cannot just loop through them and call patch($parent)
        for (const [patch, $child] of zip(childPatches, $parent.childNodes)) {
          patch($child);
        }
    
        for (const patch of additionalPatches) {
          patch($parent);
        }
        return $parent;
      };
  };
  


//function that checks the changes between two different element trees
//
const diff = (oldTree, newTree) => {
    //check if there are no changes (since newTree is null)

    if(newTree === undefined){
        console.log("Situation 1")
        return $node => {
            $node.remove()
            return undefined
        }
    }
    //check if either the old tree or the new tree is a string
    
    if(typeof oldTree === 'string' || typeof newTree === 'string'){
        //if oldtree is not equal to newtree, return a function that will replace the old node with newNode and return the new node
        console.log("Situation 2")
        if(oldTree !== newTree){
            return $node => {
                const $newNode = render(newTree)
                $node.replaceWith($newNode)
                return $newNode
            }
        } else {
            return $node => $node
        }
    }
  //check if any of the types change (ex from <p> to <h1>)
    if(oldTree.tagName !== newTree.tagName){
        console.log("Stituation 3")
        return $node => {
            const $newNode = render(newTree)
            $node.replaceWith($newNode)
            return $newNode
        }

    } 
/*
If the code reaches here, it implies the following:

oldVTree and newVTree are both virtual elements.
They have the same tagName.
They might have different attrs and children.

*/

console.log("Change attributes")
//change the attributes and the children from old to new
    const patchAttrs = diffAttrs(oldTree.attrs, newTree.attrs)
    const patchChildren = diffChildren(oldTree.children, newTree.children)
//return a function that will apply the attribtute and children changes
    return $node => {
        patchAttrs($node)   
        patchChildren($node)
        return $node
    };
};

export default diff
