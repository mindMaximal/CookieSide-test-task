function elementClick(e) {

    var text = e.target.textContent;
    
    document.querySelector('.select__input').value = text;

    if (document.querySelector('.select__item--background')) {
        document.querySelector('.select__item--background').classList.remove('select__item--background');
    }

    if (document.querySelector('.select__item--toched')) {
        document.querySelector('.select__item--toched').classList.remove('select__item--toched');
    }
    
    e.target.classList.add('select__item--background');
}

var requestURL = 'https://mindmaximal.github.io/select/document.json';
var request = new XMLHttpRequest();

request.open('GET', requestURL);
request.send();
request.onload = function() {

    var requestRes = JSON.parse(request.response);
    var result = requestRes['list'];
    
    var input = document.querySelector('.select__input');
    var select = document.querySelector('.select');
    
    for (var i = 0; i < result.length; i++) {
        var elem = document.createElement('li');
        elem.className = 'select__item';
        elem.innerHTML = result[i];    

        if (result[i] == input.getAttribute('placeholder')) {
            elem.className += ' select__item--background';
        }
        
        document.querySelector('.select__list').appendChild(elem);
    }
    
    for (var i = 1; i <= document.querySelectorAll('.select__item').length; i++) {

        var elem = document.querySelector('.select__item:nth-of-type(' + i + ')');
        elem.addEventListener('click', elementClick);
    }


    var keyIndex = 0;
    var keyIndexMax = document.getElementsByClassName('select__item').length - 1;
   
    window.addEventListener('keydown', function(e) {
        
        if (e.key == 'ArrowUp') {
            keyIndex--;           
        } else if (e.key == 'ArrowDown') {
            keyIndex++; 
        } else if (e.key == 'Enter') {            

            var text =  document.querySelector('.select__item:nth-of-type(' + (keyIndex + 1) + ')').textContent;

            if (document.querySelector('.select__item--background')) {
                document.querySelector('.select__item--background').classList.remove('select__item--background');
            }
        
            if (document.querySelector('.select__item--toched')) {
                document.querySelector('.select__item--toched').classList.remove('select__item--toched');
            }
            document.querySelector('.select__item:nth-of-type(' + (keyIndex + 1) + ')').classList.add('select__item--background');
            document.querySelector('.select__input').value = text;

            return;
        }

        if (keyIndex < 0) {
            keyIndex = keyIndexMax;
        } else if (keyIndex > keyIndexMax) {
            keyIndex = 0;
        }

        if (document.querySelector('.select__item--toched')) {
            document.querySelector('.select__item--toched').classList.remove('select__item--toched');
        }
        
        document.querySelector('.select__item:nth-of-type(' + (keyIndex + 1) + ')').classList.add('select__item--toched');

    });

    select.onmouseout = function() {
        if (document.querySelector('.select__item--toched')) {
            document.querySelector('.select__item--toched').classList.remove('select__item--toched');
        }
    };

    input.oninput = function(elem) {

        var wrapper = document.createElement('ul');   
        wrapper.className = 'select__list';   

        for (var i = 0; i < result.length; i++) {

            if (result[i].match(input.value)) {
                var elem = document.createElement('li');
                var search = result[i].match(input.value);

            
                elem.className = 'select__item';
                elem.innerHTML = result[i].replace(search, '<strong>' + search + '</strong>');  
                elem.addEventListener('click', elementClick);
                
                wrapper.appendChild(elem);                
            }

        }  

        document.querySelector('.select__list').replaceWith(wrapper);

        keyIndex = 0;
        keyIndexMax = document.getElementsByClassName('select__item').length - 1;

    };
    
}