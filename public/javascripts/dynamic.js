let skillCount=1
let achiveCount=1
let projectCount=1
function removeSkill(num)
    {
    let getSkill=document.getElementById(`Skill${num}`)
    getSkill.remove()
    }
function removeProject(num)
    {
    let getProject=document.getElementById(`Project${num}`)
    getProject.remove()
    }
function removeAchive(num)
    {
    let getAchive=document.getElementById(`Achive${num}`)
    getAchive.remove()
    }
function addSkill() {
    var skill = document.createElement("INPUT");
    skill.setAttribute("type", "text");
    skill.setAttribute("class","form-control mb-2")
    skill.setAttribute("name","resume[skills]")
    document.getElementById(`Skill${skillCount}`).appendChild(skill);

  const Delete=document.createElement("button")
  Delete.innerHTML="Delete Skill"
  Delete.setAttribute("onclick",`removeSkill(${skillCount})`)
  Delete.setAttribute("class","mb-4 btn btn-danger")
  document.getElementById(`Skill${skillCount}`).appendChild(Delete)

  skillCount++;


    var newDiv=document.createElement("div")
    newDiv.setAttribute("id",`Skill${skillCount}`)
    document.getElementById("Skill").appendChild(newDiv)

}
function addAchive() {

    const titleLabel = document.createElement("label")
    titleLabel.innerHTML = "Title"
    titleLabel.setAttribute("for", "Title")
    titleLabel.setAttribute("class","form-label")
    document.getElementById(`Achive${achiveCount}`).appendChild(titleLabel)
    
    
    var titleField = document.createElement("INPUT");
    titleField.setAttribute("id", "Title")
    titleField.setAttribute("type", "text");
    titleField.setAttribute("class","form-control")
    document.getElementById(`Achive${achiveCount}`).appendChild(titleField);
    
    
    const lineBreak2=document.createElement("br")
    document.getElementById(`Achive${achiveCount}`).appendChild(lineBreak2)
    
    
    const descLabel = document.createElement("label")
    descLabel.innerHTML = "Description"
    descLabel.setAttribute("for", "Description")
 descLabel.setAttribute("class","form-label")  
    document.getElementById(`Achive${achiveCount}`).appendChild(descLabel)
    
    
    var DescField = document.createElement("Textarea");
    DescField.setAttribute("id", "Description")
    DescField.setAttribute("class","form-control mb-4")
    document.getElementById(`Achive${achiveCount}`).appendChild(DescField);


    const Delete=document.createElement("button")
  Delete.innerHTML="Delete Achivement"
  Delete.setAttribute("onclick",`removeAchive(${achiveCount})`)
  Delete.setAttribute("class","mb-4 btn btn-danger")
  document.getElementById(`Achive${achiveCount}`).appendChild(Delete)

    achiveCount++;

    var newDiv=document.createElement("div")
    newDiv.setAttribute("id",`Achive${achiveCount}`)
    document.getElementById("Achive").appendChild(newDiv)

}
function addProject() {

    const titleLabel = document.createElement("label")
    titleLabel.innerHTML = "Title"
    titleLabel.setAttribute("for", "Title")
    titleLabel.setAttribute("class","form-label")
    document.getElementById(`Project${projectCount}`).appendChild(titleLabel)
    
    
    var titleField = document.createElement("INPUT");
    titleField.setAttribute("id", "Title")
    titleField.setAttribute("type", "text");
    titleField.setAttribute("class","form-control")
    document.getElementById(`Project${projectCount}`).appendChild(titleField);
    
    
    const lineBreak2=document.createElement("br")
    document.getElementById(`Project${projectCount}`).appendChild(lineBreak2)
    
    
    const stackUsedLabel = document.createElement("label")
    stackUsedLabel.innerHTML = "Stack Used"
    stackUsedLabel.setAttribute("for", "Stack")
    document.getElementById(`Project${projectCount}`).appendChild(stackUsedLabel)


    var StackField = document.createElement("INPUT");
    StackField.setAttribute("id", "Satck")
    StackField.setAttribute("type", "text");
    StackField.setAttribute("class","form-control")
    document.getElementById(`Project${projectCount}`).appendChild(StackField);


    const lineBreak3=document.createElement("br")
    document.getElementById(`Project${projectCount}`).appendChild(lineBreak3)


    const descLabel = document.createElement("label")
    descLabel.innerHTML = "Description"
    descLabel.setAttribute("for", "Description")
 descLabel.setAttribute("class","form-label")  
    document.getElementById(`Project${projectCount}`).appendChild(descLabel)
    
    
    var DescField = document.createElement("Textarea");
    DescField.setAttribute("id", "Description")
    DescField.setAttribute("class","form-control mb-4")
    document.getElementById(`Project${projectCount}`).appendChild(DescField);


    const Delete=document.createElement("button")
  Delete.innerHTML="Delete Project"
  Delete.setAttribute("onclick",`removeProject(${projectCount})`)
  Delete.setAttribute("class","mb-4 btn btn-danger")
  document.getElementById(`Project${projectCount}`).appendChild(Delete)
    
    projectCount++;

    var newDiv=document.createElement("div")
    newDiv.setAttribute("id",`Project${projectCount}`)
    document.getElementById("Project").appendChild(newDiv)
}