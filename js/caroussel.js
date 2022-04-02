var index_slide = 0

async function desactiveSlide(){
        var items = document.getElementsByClassName('active');
        while(elements.length > 0){
            elements[0].classList.remove('active');
        }

}

function activeSlide(){
    var items = document.querySelectorAll(".pictureProject");
    items[index_slide].classList.add('active');
}

async function changeSlide(n){
    var items = document.querySelectorAll(".pictureProject");
    var nbItems = items.length;
    var response = await desactiveSlide(index_slide);
    index_slide= (index_slide+n+nbItems)%nbItems;
    activeSlide(index_slide);
}

function followingSlide(){
    changeSlide(1);    
}

function previousSlide(){
    changeSlide(-1);
}

