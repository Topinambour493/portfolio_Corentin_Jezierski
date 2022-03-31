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
    var nameProject = document.getElementById("nameProject")
    var descriptionProject = document.querySelector("#descriptionProject > .text")
    nameProject.innerHTML=project.name;
    addTechnologies(project.technologies);
    descriptionProject.innerHTML=project.description;
    addPartners(project.partners);
    addLinkGitHub(project.link_gitHub);
    addLinkWebsite(project.link_website);
    addPictures(project.pictures);
}

async function inflate_by_id(id){
    var project =  await fetch("projects.json")  
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == id){
                    return data[i]
                }
            }
        console.error("l'id n'est pas présent dans le fichier json")
    })

    addProject(project);
}


function page_project(){
    document.querySelector("main").innerHTML=' \
        <div id="headerProject"> \
                <div id="nameProject"></div> \
                <div id="containerLinksProjects"> \
                    <div id="linksProjects"> \
                        <a href="https://topinambour493.github.io/Quarto/" target="_blank" class="linkProject" id="linkWebsiteProject"><img class="iconProject" alt="lien Web" src="pictures/icons/Web.png"></a> \
                        <a href="https://github.com/Topinambour493/Quarto" target="_blank" class="linkProject" id="linkGitHubProject"><img class="iconProject" alt="lien GitHub" src="pictures/icons/GitHub.png"></a> \
                    </div> \
                </div> \
            </div> \
            <div id="mainProject"> \
                <div id="containerTextsProject"> \
                    <div id="textsProject" class="scroll"> \
                        <div id="technologiesProjet"> \
                            <div class="title">Technologies:</div> \
                            <div class="text"></div> \
                        </div> \
                        <div id="descriptionProject"> \
                            <div class="title">Description:</div> \
                            <div class="text"></div> \
                        </div> \
                        <div id="partnersProject"> \
                            <div class="title">Partenaires:</div> \
                            <div class="text"></div> \
                        </div> \
                    </div> \
                </div> \
                <div id="picturesProject"> \
                    <div class="left arrow"></div> \
                    <div class="right arrow"></div> \
                </div> \
            </div> \
        '
}


function  animationHeadMe(){
    document.querySelector("#rightHeader > img").style.animation="rotate 1s";
    setTimeout(function(){
        document.querySelector("#rightHeader > img").style.animation="";
    }, 1000);
}

async function goPageProjectById(projectId){
    page_project();
    inflate_by_id(projectId);
    actual_page+=1
    var state={
        "idProject":projectId,
        "page":actual_page
    }
    window.history.pushState(state,null,null);

    document.querySelector(".right").addEventListener("click",followingSlide)
    document.querySelector(".left").addEventListener("click",previousSlide)

    document.addEventListener('keydown', function (e) {
        //if is left arrow
        if ( e.altKey== 37 || e.code == 37 || e.which == 37 ) {
            previousSlide();
        // else if is right arrow
        } else if ( e.altKey== 39 || e.code == 39 || e.which == 39) {
            followingSlide();
        }
    });
}

async function loadProjectById(projectId){
    page_project();
    inflate_by_id(projectId);

    document.querySelector(".right").addEventListener("click",followingSlide)
    document.querySelector(".left").addEventListener("click",previousSlide)

    document.addEventListener('keydown', function (e) {
        //if is left arrow
        if ( e.altKey== 37 || e.code == 37 || e.which == 37 ) {
            previousSlide();
        // else if is right arrow
        } else if ( e.altKey== 39 || e.code == 39 || e.which == 39) {
            followingSlide();
        }
    });
}
