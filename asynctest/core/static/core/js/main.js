/**
 * @author Héctor Costa <hola@hektorprofe.net>
 * @description First disable all anchors with async class, then creates the request with async fetch and push response in data-target element
 * @version 1.0
 */

for (var i = 0; i < document.getElementsByClassName("async").length; i++) {
    document.getElementsByClassName("async")[i].addEventListener('click', function (event) {
        event.preventDefault();
        var this_ = this;
        if (this.href != document.URL){
            history.pushState(null, '',this.href.replace(/^.*\/\/[^\/]+/, ''));
            fetch(this.href+"?async=true", {'credentials':'include'}).then(response => response.text()).then(function(data){
                document.getElementById(this_.dataset.target).innerHTML = data;
            });        
        }
        return false;
    });
}