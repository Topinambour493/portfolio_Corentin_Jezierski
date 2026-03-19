function startWebsite(){
    pageMain()
    var state={
        "idProject":0,
        "page":actual_page
    }
    window.history.replaceState(state,null,null);
}

let projects = null;
async function loadProjects() {
    if (!projects) { // si pas encore chargé
        const response = await fetch("projects.json");
        projects = await response.json();
    }
    return projects;
}

const templateCache = {};
async function loadFile(path, element) {

    // Si déjà chargé → on réutilise
    if (templateCache[path]) {
        element.innerHTML = templateCache[path];
        return;
    }

    // Sinon → fetch et on stocke
    const response = await fetch(path);
    const html = await response.text();

    templateCache[path] = html; // sauvegarde en mémoire
    if (element != null) {
        element.innerHTML = html;
    }
}

loadFile('./html/header.html', null);
loadFile('./html/project.html', null);
startWebsite()