function getProjects(){
    fetch("projects.json")  
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var projects=[]
            for (let i = 0; i < data.length; i++) {
                projects.push(data[i])
            }
            return projects
        })
}

function addTechnologies(technologies){
    var technologiesProjet = document.querySelector("#technologiesProjet > .text")
    var textTechnologies=technologies[0]
    if (technologies.length == 1){
        technologiesProjet.parentNode.querySelector(".title").innerHTML="Technologie:"
    } else {
        for (let i = 1; i < technologies.length; i++) {
            textTechnologies+="/"+technologies[i]
        }
    }
    technologiesProjet.innerHTML=textTechnologies;
}

function addCollaborators(collaborators){
    if (collaborators == undefined){
        collaboratorsProject.parentNode.parentNode.removeChild(collaboratorsProject.parentNode);    
    } else {
        var textCollaborators=collaborators[0]
        for (let i = 1; i < collaborators.length; i++) {
            textCollaborators+="/"+collaborators[i]
        }
        collaboratorsProject.innerHTML=textCollaborators;
    }
}

function addContext(context){
    var contextProject = document.querySelector("#contextProject > .text");
    if (context == undefined){
        contextProject.parentNode.parentNode.removeChild(contextProject.parentNode);    
    } else {
        textContext=context;
        contextProject.innerHTML=textContext;
    }
}


function addLinkGitHub(linkGitHub){
    var linkGitHubProject = document.querySelector("#linkGitHubProject")
    if (linkGitHub == undefined){
        linkGitHubProject.parentNode.removeChild(linkGitHubProject);    
    } else {
        linkGitHubProject.setAttribute("href", linkGitHub);
    }
}

function addLinkWebsite(linkWebsite){
    var linkWebsiteProject = document.querySelector("#linkWebsiteProject")
    if (linkWebsite == undefined){
        linkWebsiteProject.parentNode.removeChild(linkWebsiteProject);    
    } else {
        linkWebsiteProject.setAttribute("href", linkWebsite);
    }
}

function addPictures(pictures){
    var picturesProject = document.querySelector("#picturesProject")
    for (let i = 0; i < pictures.length; i++) {
        var picture = document.createElement("img");
        picture.classList="pictureProject";
        picture.setAttribute("src",pictures[i]);
        picturesProject.insertBefore(picture,picturesProject.lastElementChild)
    }
    picturesProject.children[1].classList.add("active");
    if (pictures.length == 1){
        picturesProject.lastElementChild.style.display="none";
        picturesProject.firstElementChild.style.display="none";
    }
}


function addPartners(partners){
    var partnersProject = document.querySelector("#partnersProject > .text")
    if (partners == undefined){
        partnersProject.parentNode.parentNode.removeChild(partnersProject.parentNode);    
    } else {
        var textPartners=partners[0]
        if (partners.length == 1){
            partnersProject.parentNode.querySelector(".title").innerHTML="Partenaire:"
        } else {
            for (let i = 1; i < partners.length; i++) {
                textPartners+=", "+partners[i]
            }
        }
        partnersProject.innerHTML=textPartners;
    }
}


function addProject(project){
    setTimeout(function(){
        const nameProject = document.getElementById("nameProject")
        const descriptionProject = document.querySelector("#descriptionProject > .text")
        nameProject.innerHTML=project.name;
        addTechnologies(project.technologies);
        descriptionProject.innerHTML=project.description;
        addContext(project.context)
        addPartners(project.partners);
        addLinkGitHub(project.link_gitHub);
        addLinkWebsite(project.link_website);
        addPictures(project.pictures);
    }, 100)
    

}

const inflate_by_id = async(id) =>{
    const projects = await (await fetch("projects.json")).json()
    console.log(projects)
    const targetProject = projects.filter(pro => pro.id === id);

    if(!targetProject || !targetProject.length) throw new Error("The project wasn't found")
    console.log("Got data",targetProject)
    addProject(targetProject[0]);

}
