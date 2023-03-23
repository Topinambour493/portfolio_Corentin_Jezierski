var actual_page=0;

window.addEventListener("popstate", e =>{
    if (actual_page>e.state.page){
        actual_page-=1
    } else {
        actual_page+=1
    }
    if (e.state.idProject==0){
        pageMain()
    } else if (e.state.idProject == -1){
        pageCredits()
    } else if (e.state.idProject == -2){
        pageAbout()
    } else {
        loadProjectById(e.state.idProject)
    }
});

async function loadProjectById(projectId){
    pageProject();
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

function goPageMain(){
    pageMain()
    actual_page+=1
    var state={
        "idProject":0,
        "page":actual_page
    }
    history.pushState(state,null,null);
}

async function goPageProjectById(projectId){
    pageProject();
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

function goPageCredits(){
    pageCredits()
    actual_page+=1
    var state={
        "idProject":-1,
        "page":actual_page
    }
    window.history.pushState(state,null,null);
}


function goPageAbout(){
    pageAbout()
    actual_page+=1
    var state={
        "idProject":-2,
        "page":actual_page
    }
    window.history.pushState(state,null,null);
}


async function pageMain(){
    document.querySelector("main").innerHTML='<div id="projectsModel" class="scroll"></div>'
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

function pageProject(){
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
                    <div id="partnersProject"> \
                        <div class="title">Partenaires:</div> \
                        <div class="text"></div> \
                    </div> \
                    <div id="descriptionProject"> \
                        <div class="title">Description:</div> \
                        <div class="text"></div> \
                    </div> \
                    <div id="contextProject"> \
                        <div class="title">Pourquoi:</div> \
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

function pageCredits(){
    document.querySelector("main").innerHTML=' \
        <div id="iconsCredits" class="scroll"> \
            <div class="titleCredits">Crédits Icones</div>  \
            <div>  \
                <a href="https://www.flaticon.com/fr/icones-gratuites/chat" target="_blank" class="linkProject" id="linkGitHubProject"><img class="iconProject" alt="Icone GitHub" src="pictures/icons/GitHub.png"></a> \
                <a href="https://www.flaticon.com/fr/icones-gratuites/chat" title="chat icônes" target="_blank" class="linkProject">Dave Gandy - Flaticon</a> \
            </div> \
            <div> \
                <a href="https://www.flaticon.com/fr/icones-gratuites/lien" target="_blank" class="linkProject" id="linkWebsiteProject"><img class="iconProject" alt="Icone Web" src="pictures/icons/Web.png"></a>  \
                <a href="https://www.flaticon.com/fr/icones-gratuites/lien" title="lien icônes" target="_blank">Freepik - Flaticon</a> \
            </div> \
        </div> \
    '
}


function pageAbout(){
    document.querySelector("main").innerHTML=' \
        <div id="about"> \
            <div id="aboutHeader" class="center"> \
                <div id="nameAbout">A Propos</div> \
            </div> \
            <div id="aboutText" class="scroll"> \
                <div>Passionné par le développement depuis le lycée, je transforme mes idées en une réalité. Trouver des solutions est vraiment satisfaisant pour moi.</div> \
                <div>Actuellement étudiant à l\'ETNA (école d\'informatique en alternance), je recherche une alternance en tant que developpeur fullstack à Nantes.</div> \
            </div> \
            <div id="aboutFooter" class="center"> \
                <a href="CV Corentin JEZIERSKI Developpeur Fullstack.pdf" target="_blank"><button id="seeResume" class="scroll">Voir mon CV</button></a> \
            </div> \
        </div> \
    '
}