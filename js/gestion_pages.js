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

function goPageProjectById(projectId){
    pageProject();
    inflate_by_id(projectId);
    actual_page+=1
    var state={
        "idProject":projectId,
        "page":actual_page
    }
    window.history.pushState(state,null,null);

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
    loadFile('./html/project.html', document.querySelector("main"));
}

function pageCredits(){
    loadFile('./html/credits.html', document.querySelector("main"));
}

function pageAbout(){
    loadFile('./html/about.html', document.querySelector("main"));
}