function fill_projects(projects){
    let projectsModel = document.querySelector("#projectsModel");
    for (let i=0;i<projects.length;i++){
        if (projects[i].disabled) continue;
        let project = createTag("div","projectModel");
        let pictureProject = createTag("img","pictureProjectModel");
        let nameProject = createTag("div","nameProjectModel");
        pictureProject.setAttribute('src',projects[i].pictures[0]);
        pictureProject.setAttribute("onclick","goPageProjectById("+projects[i].id+")"); 
        nameProject.innerHTML = projects[i].name;
        nameProject.setAttribute("onclick","goPageProjectById("+projects[i].id+")"); 
        project.appendChild(nameProject);
        project.appendChild(pictureProject);
        projectsModel.appendChild(project);
    }   
}

function createTag(Type,Class=""){
    newTag = document.createElement(Type);
    newTag.classList=Class;
    return newTag;
}

function fisherYatesShuffle(arr){
    for(var i =arr.length-1 ; i>0 ;i--){
        var j = Math.floor( Math.random() * (i + 1) ); //random index
        [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
    }
}
