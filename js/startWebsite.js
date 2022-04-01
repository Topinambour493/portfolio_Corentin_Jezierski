function startWebsite(){
    pageMain()
    var state={
        "idProject":0,
        "page":actual_page
    }
    window.history.replaceState(state,null,null);
}

startWebsite()