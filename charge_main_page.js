var mar;

async function getAllProjects(){
    var projects =  await fetch("projects.json")  
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            return data
        })
    fisherYatesShuffle(projects)
    fill_projects(projects)

}

function page_main(){
    document.querySelector("main").innerHTML=' \
        <div id="chooseIdProject"> \
            <input type="number" id="quantity" name="quantity" min="1" max="5"> \
            <button>click</button> \
        </div> \
    '
}

function fill_projects(projects){
    let projectsModel = document.querySelector("#projectsModel");
    for (let i=0;i<projects.length;i++){
        let project = createTag("div","projectModel");
        let pictureProject = createTag("img","pictureProjectModel");
        let nameProject = createTag("div","nameProjectModel");
        pictureProject.setAttribute('src',projects[i].pictures[0]);
        pictureProject.setAttribute("onclick","goPageProjectById("+projects[i].id+")"); 
        nameProject.innerHTML = projects[i].name;
        nameProject.setAttribute("onclick","goPageProjectById("+projects[i].id+")"); 
        project.appendChild(pictureProject);
        project.appendChild(nameProject);
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

window.onpopstate = function(e){
    ActualPageStack-=1
    document.querySelector("main").innerHTML=stacks[0]
}



getAllProjects()