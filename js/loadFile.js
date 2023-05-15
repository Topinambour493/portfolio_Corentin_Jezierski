function loadFile(file_path, parentElement) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', file_path);

    xhr.addEventListener('readystatechange', function() { // load the page asynchronously
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // if the file is correctly loaded

            parentElement.innerHTML = xhr.responseText; 

        }

    });

    xhr.send(null); 
}