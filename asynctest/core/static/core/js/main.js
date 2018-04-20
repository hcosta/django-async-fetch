/**
 * @author Héctor Costa <hola@hektorprofe.net>
 * @description First disable all anchors with async class, then creates the request with async fetch and push response in data-target element
 * @version 1.0
 */

for (var i = 0; i < document.getElementsByClassName("async").length; i++) {
    document.getElementsByClassName("async")[i].addEventListener('click', function (event) {
        event.preventDefault();
        var target = document.getElementById(this.dataset.target);
        if (this.href != document.URL){
            target.classList.remove('animated', 'bounceIn');
            history.pushState(null, '', this.href.replace(/^.*\/\/[^\/]+/, ''));
            fetch(this.href+"?async=true", {'credentials':'include'}).then(response => response.text()).then(function(data){
                target.innerHTML = data;
                target.classList.add('animated', 'bounceIn');
            });        
        }
        return false;
    });
}