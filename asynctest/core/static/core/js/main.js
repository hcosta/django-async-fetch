/**
 * Disable all anchors with async class, then creates the request with async fetch and push response in data-target element
 * History back and forward support added overriding it with classic location.href redirection
 * @author Héctor Costa <hola@hektorprofe.net>
 * @version 1.1
 */

for (var i = 0; i < document.getElementsByClassName("async").length; i++) {
    document.getElementsByClassName("async")[i].addEventListener('click', function (event) {
        event.preventDefault();
        if (this.href != document.URL){
            var target = document.getElementById(this.dataset.target);
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

window.addEventListener('popstate', function(event) {
    document.location.href = window.location.pathname;
}, false);