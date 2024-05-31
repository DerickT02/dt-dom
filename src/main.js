import createElement from "../vdom/createElement";
import render from "../vdom/render";
import mount from "../vdom/mount";





export const createVApp = count => createElement('div', {
  attrs: {
    id: "app",
    dataCount: count
  },
  children: [
    String(count),
    createElement('h1', {
      attrs:{id: "main"},
      children:[
        "WSG Gorgeous",
        
      ]
    })
  ]
})

 const vApp = createElement('div', 
{
  attrs: {id: 'main'},
  children: [
    createElement('h1',{
      attrs:{
        id: "app-header"
      },
      children:[
        "WSG BEAUTIFUL"
      ]
    }
    )
    
  ]
  }
)


  
  
