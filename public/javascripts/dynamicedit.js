function removeSkill(num) {
    let getSkill = document.getElementById(`Skill${num}`)
    getSkill.remove()
}
function addSkill(skillPassed) {

    var skill = document.createElement("INPUT");
    skill.setAttribute("type", "text");
    skill.setAttribute("class", "form-control mb-2")
    skill.setAttribute("name", "skills")
    if(skillPassed)
    {skill.setAttribute("value",skillPassed)}
    document.getElementById(`Skill${skillCount}`).appendChild(skill);

    const Delete = document.createElement("button")
    Delete.innerHTML = "Delete Skill"
    Delete.setAttribute("onclick", `removeSkill(${skillCount})`)
    Delete.setAttribute("class", "mb-4 btn btn-danger")
    document.getElementById(`Skill${skillCount}`).appendChild(Delete)

    skillCount++;


    var newDiv = document.createElement("div")
    newDiv.setAttribute("id", `Skill${skillCount}`)
    document.getElementById("Skill").appendChild(newDiv)

}
for(let skill of renderedSkills)
{addSkill(skill)
}

function removeProject(num) {
    let getProject = document.getElementById(`Project${num}`)
    getProject.remove()
}
function addProject(titlePassed,stackPassed,descPassed) {

    const titleLabel = document.createElement("label")
    titleLabel.innerHTML = "Title"
    titleLabel.setAttribute("for", "Title")
    titleLabel.setAttribute("class", "form-label")
    document.getElementById(`Project${projectCount}`).appendChild(titleLabel)
  
  
    var titleField = document.createElement("INPUT");
    titleField.setAttribute("id", "Title")
    titleField.setAttribute("type", "text");
    if(titlePassed)
    {titleField.setAttribute("value",titlePassed)}
    titleField.setAttribute("class", "form-control")
    titleField.setAttribute("name", `projects[${projectCount}][title]`)
    document.getElementById(`Project${projectCount}`).appendChild(titleField);
  
  
    const lineBreak2 = document.createElement("br")
    document.getElementById(`Project${projectCount}`).appendChild(lineBreak2)
  
  
    const stackUsedLabel = document.createElement("label")
    stackUsedLabel.innerHTML = "Stack Used"
    stackUsedLabel.setAttribute("for", "Stack")
    document.getElementById(`Project${projectCount}`).appendChild(stackUsedLabel)
  
  
    var StackField = document.createElement("INPUT");
    StackField.setAttribute("id", "Stack")
    StackField.setAttribute("type", "text");
    StackField.setAttribute("class", "form-control")
    if(stackPassed)
    {StackField.setAttribute("value",stackPassed)}
    StackField.setAttribute("name", `projects[${projectCount}][stack]`)
    document.getElementById(`Project${projectCount}`).appendChild(StackField);
  
  
    const lineBreak3 = document.createElement("br")
    document.getElementById(`Project${projectCount}`).appendChild(lineBreak3)
  
  
    const descLabel = document.createElement("label")
    descLabel.innerHTML = "Description"
    descLabel.setAttribute("for", "Description")
    descLabel.setAttribute("class", "form-label")
    document.getElementById(`Project${projectCount}`).appendChild(descLabel)
  
  
    var DescField = document.createElement("Textarea");
    DescField.setAttribute("id", "Description")
    DescField.setAttribute("class", "form-control mb-4")
    if(descPassed)
    {DescField.value=descPassed}
    DescField.setAttribute("name", `projects[${projectCount}][description]`)
    document.getElementById(`Project${projectCount}`).appendChild(DescField);
  
  
    const Delete = document.createElement("button")
    Delete.innerHTML = "Delete Project"
    Delete.setAttribute("onclick", `removeProject(${projectCount})`)
    Delete.setAttribute("class", "mb-4 btn btn-danger")
    document.getElementById(`Project${projectCount}`).appendChild(Delete)
  
    projectCount++;
  
    var newDiv = document.createElement("div")
    newDiv.setAttribute("id", `Project${projectCount}`)
    document.getElementById("Project").appendChild(newDiv)
  
}
for(let project of renderedProjects)
{
addProject(project.title,project.stack,project.description)    
}


function removeAchive(num) {
    let getAchive = document.getElementById(`Achive${num}`)
    getAchive.remove()
}
function addAchieve(titlePassed,descPassed) {

    const titleLabel = document.createElement("label")
    titleLabel.innerHTML = "Title"
    titleLabel.setAttribute("for", "Title")
    titleLabel.setAttribute("class", "form-label")
    document.getElementById(`Achive${achiveCount}`).appendChild(titleLabel)
  
  
    var titleField = document.createElement("INPUT");
    titleField.setAttribute("id", "Title")
    titleField.setAttribute("type", "text");
    if(titlePassed)
    {titleField.setAttribute("value",titlePassed)}
    titleField.setAttribute("name", `achievements[${achiveCount}][title]`)
    titleField.setAttribute("class", "form-control")
    document.getElementById(`Achive${achiveCount}`).appendChild(titleField);
  
  
    const lineBreak2 = document.createElement("br")
    document.getElementById(`Achive${achiveCount}`).appendChild(lineBreak2)
  
  
    const descLabel = document.createElement("label")
    descLabel.innerHTML = "Description"
    descLabel.setAttribute("for", "Description")
    descLabel.setAttribute("class", "form-label")
    document.getElementById(`Achive${achiveCount}`).appendChild(descLabel)
  
  
    var DescField = document.createElement("Textarea");
    DescField.setAttribute("id", "Description")
    DescField.setAttribute("class", "form-control mb-4")
    if(descPassed)
    {DescField.value=descPassed}
    DescField.setAttribute("name", `achievements[${achiveCount}][description]`)
    document.getElementById(`Achive${achiveCount}`).appendChild(DescField);
  
  
    const Delete = document.createElement("button")
    Delete.innerHTML = "Delete Achivement"
    Delete.setAttribute("onclick", `removeAchive(${achiveCount})`)
    Delete.setAttribute("class", "mb-4 btn btn-danger")
    document.getElementById(`Achive${achiveCount}`).appendChild(Delete)
  
    achiveCount++;
  
    var newDiv = document.createElement("div")
    newDiv.setAttribute("id", `Achive${achiveCount}`)
    document.getElementById("Achive").appendChild(newDiv) 
}
for(let Achivement of renderedAchievements)
{
addAchieve(Achivement.title,Achivement.description)
}