var actual_page=0;

window.addEventListener("popstate", e =>{
    console.log("pageAcuel",actual_page)
    console.log(e.state)
    if (actual_page>e.state.page){
        actual_page-=1
    } else {
        actual_page+=1
    }
    if (e.state.idProject==0){
        getAllProjects()
    } else if (e.state.idProject == -1){
        pageCredits()
    } else {
        loadProjectById(e.state.idProject)
    }
});


function startWebsite(){
    getAllProjects()
    var state={
        "idProject":0,
        "page":actual_page
    }
    window.history.replaceState(state,null,null);
}

startWebsite()

function goPageCredits(){
    pageCredits()
    actual_page+=1
    var state={
        "idProject":-1,
        "page":actual_page
    }
    window.history.pushState(state,null,null);
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
            <div> \
                <a href="https://www.flaticon.com/fr/icones-gratuites/linkedin" target="_blank" class="linkProject" id="linkWebsiteProject"><img class="iconProject" alt="Icone linkedIn" src="pictures/icons/Linkedin.png"></a> \
                <a href="https://www.flaticon.com/fr/icones-gratuites/linkedin" title="linkedin icônes" target="_blank">riajulislam - Flaticon</a> \
            </div> \
        </div> \
    '
}