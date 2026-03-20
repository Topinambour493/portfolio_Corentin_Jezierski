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
    window.scrollTo(1, 0);
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
    document.getElementsByTagName("html")[0].style.overflowY="scroll";
    document.querySelector("main").style.height='auto';
    document.querySelector("header").innerHTML='<div id="centerHeader"></div>';
    document.querySelector("main").innerHTML='    ' +
        '<div class="center" id="mainHome">\n' +
        '        <div id="leftHeader" onclick="goPageMain()">\n' +
        '            <div class="nameWebsite">Portfolio</div>\n' +
        '            <div class="nameLastname"">Corentin Jezierski</div>\n' +
        '        </div>\n' +
        '        <div id="rightHeader">\n' +
        '            <img alt="moi">\n' +
        '        </div>\n' +
        '</div>\n' +
        '<div class="center" id="aboutMe">Développeur Full-Stack spécialisé Back-End<br/><br/> \n'+
        'Je conçois des applications robustes, performantes et maintenables.<br/><br/>  \n' +
        '<a href="CV Developpeur Fullstack Corentin JEZIERSKI.pdf" target="_blank"><button id="seeResume" class="scroll">Voir mon CV</button></a> \n' +
        '</div> \n' +
        '<div class="cta-projects center" onClick="scrollToProjects()">Voir mes projets ↓</div> \n' +
        '<div id="projects"></div>'
    fill_projects(await loadProjects())
    if (block){
        initFLIP()
    }
    window.scrollTo(1, 0);
    updateAnimation()
}

function pageProject(){
    document.querySelector("html").style.overflowY="hidden";
    document.querySelector("main").style.height='70vh';
    loadFile('./html/header.html', document.querySelector("header"));
    loadFile('./html/project.html', document.querySelector("main"));
    window.scrollTo(0, 0);
}
