var index_slide = 0

function desactiveSlide(){
    var items = document.querySelectorAll(".pictureProject");
    items[index_slide].classList.remove('active');
}

function activeSlide(){
    var items = document.querySelectorAll(".pictureProject");
    items[index_slide].classList.add('active');
}

function changeSlide(n){
    var items = document.querySelectorAll(".pictureProject");
    var nbItems = items.length;
    desactiveSlide(index_slide);
    index_slide= (index_slide+n+nbItems)%nbItems;
    activeSlide(index_slide);
}

function followingSlide(){
    changeSlide(1);    
}

function previousSlide(){
    changeSlide(-1);
}

