var actual_page=0;

window.addEventListener("popstate", e =>{
    if (actual_page>e.state.page){
        actual_page-=1
    } else {
        actual_page+=1
    }
    if (e.state.idProject==0){
        pageMain()
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
    document.querySelector("header").innerHTML='<div id="centerHeader"></div>'
    document.querySelector("main").innerHTML='    ' +
        '<div class="center" id="mainHome">\n' +
        '        <div id="leftHeader" onclick="goPageMain()">\n' +
        '            <div class="nameWebsite">Portfolio</div>\n' +
        '            <div class="nameLastname"">Corentin Jezierski</div>\n' +
        '        </div>\n' +
        '        <div id="rightHeader">\n' +
        '            <img alt="moi">\n' +
        '        </div>\n' +
        '</div>' +
        '<div id="projectsModel" class="scroll"></div>'
    var projects =  await fetch("projects.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            return data
        })
    fill_projects(projects)
}

function pageProject(){
    loadFile('./html/project.html', document.querySelector("main"));
    loadFile('./html/header.html', document.querySelector("header"));
}
