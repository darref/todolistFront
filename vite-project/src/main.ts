
//creation de la div principale
let mainDiv = document.createElement("div");
mainDiv.style.width = "50%";
mainDiv.style.height = "70%";
mainDiv.style.textAlign = "center";
//ajout du titre
let title = document.createElement("h1");
title.innerText = "My todos";
title.style.fontSize = "100px";
document.body.appendChild(title);

document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.flexDirection = "row";
//creation et ajout de la barre de text input
let inputBox = document.createElement("input");
inputBox.style.width = "80%";
//ajout de la div input conteneur
let divInputConteneur = document.createElement("div");
divInputConteneur.appendChild(inputBox);
let saveButton = document.createElement("button");
saveButton.innerText = "Save";
divInputConteneur.appendChild(saveButton);
//ajout de la UL des taches
let ulTasks = document.createElement("ul");
//event listener du bouton save
saveButton.addEventListener( "click"  , () => 
{
  if(inputBox.value.length > 3)
  {
    let newTask = document.createElement("div");
    let taskText = inputBox.value;
    inputBox.value = "";
    //
    newTask.style.width = "100%";
    newTask.style.border = "2px solid black";
    //
    let newLI = document.createElement("li");
    //
    let newLIText = document.createElement("p");
    newLIText.innerText = taskText;
    newLIText.style.paddingLeft = "50px";
    newLIText.style.paddingRight = "50px";
    // Effectuer la requête GET
    
    //
    newLI.style.border = "1px gray solid"
    newLI.style.margin = "20px"
    //ajout de la checkbox a la nouvelle li
    let newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newLI.append(newCheckbox);
    ulTasks.append(newLI);
    //
    newLI.append(newLIText);
    //ajout du bouton remove a la new li
    let boutonRemove = document.createElement("button");
    boutonRemove.innerText = "Remove Task";
    //

    fetch(`http://localhost:3030/addSentenceToBDD/${taskText}/${newCheckbox.value}`)
    .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Traitez la réponse ici si nécessaire.
    })
    //
    boutonRemove.addEventListener("click" , ()=>
    {
      newLI.remove();
    });

    newLI.append(boutonRemove);
    boutonRemove.style.textAlign = "right";
    //
    newLI.style.textAlign = "justify";
    newLI.style.padding = "20px";
    //
    newLI.style.display = "flex";
    newLI.style.flexDirection = "columns";
    // 
    newCheckbox.addEventListener("change" , ()=>{
      fetch(`http://localhost:3030/updateSentence/${taskText}/${newCheckbox.checked}`)
      console.log(newCheckbox.checked)
    })
  }
  
});
//ajout final

//
let boutonRemoveAll = document.createElement("button");
boutonRemoveAll.innerText = "Remove All";
boutonRemoveAll.addEventListener("click" , ()=>{
  fetch(`http://localhost:3030/removeAll`)
  .then(message =>{
    if(message.status === 200)
    {
      document.querySelectorAll("li").forEach((e)=>{
        e.remove()
      })
    }
  })
})
//
mainDiv.appendChild(title);
mainDiv.appendChild(divInputConteneur);
mainDiv.appendChild(ulTasks);
mainDiv.appendChild(boutonRemoveAll);
document.body.appendChild(mainDiv);



async function loadFromBDD()
{
    let resultat = null;
    resultat = await fetch("http://localhost:3030/getAll", {method : "GET"})
    let res = await resultat.text()
    console.log(resultat)
    const tableauDObjets: Array<{ id: number; value: string ; status : string}> = JSON.parse(res);
    //
    if(tableauDObjets.length > 0)
    {
      for (let i=0 ; i< tableauDObjets.length ; i++)

      {
        let newTask = document.createElement("div");
        let taskText = tableauDObjets[i].value;
        //
        newTask.style.width = "100%";
        newTask.style.border = "2px solid black";
        //
        let newLI = document.createElement("li");
        //
        let newLIText = document.createElement("p");
        newLIText.innerText = taskText;
        newLIText.style.paddingLeft = "50px";
        newLIText.style.paddingRight = "50px";
        // Effectuer la requête GET
        
        //
        newLI.style.border = "1px gray solid"
        newLI.style.margin = "20px"
        //ajout de la checkbox a la nouvelle li
        let newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        newCheckbox.checked = tableauDObjets[i].status === "true";
        newLI.append(newCheckbox);
        ulTasks.append(newLI);
        //
        newLI.append(newLIText);
        //ajout du bouton remove a la new li
        let boutonRemove = document.createElement("button");
        boutonRemove.innerText = "Remove Task";
        boutonRemove.addEventListener("click" , ()=>
        {
          fetch(`http://localhost:3030/remove/${newLIText.innerText}`)
          newLI.remove();
          
        });
        newLI.append(boutonRemove)
        //
        newLI.style.textAlign = "justify";
        newLI.style.padding = "20px";
        //
        newLI.style.display = "flex";
        newLI.style.flexDirection = "columns";
        // 
        newCheckbox.addEventListener("change" , ()=>{
          fetch(`http://localhost:3030/updateSentence/${taskText}/${newCheckbox.checked}`)
          console.log(newCheckbox.checked)
        }); 
      
    }
  }
}


loadFromBDD();