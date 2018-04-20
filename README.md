# async-selective-fetch-with-django-2
Simple test with javascript Fetch API and Django 2 with async templates.

This method doesn't affect to SEO because only works asynchronously on client side.

## Demo


## Backend

### Project Settings
Configure the base templates:

```python
TEMPLATE_BASE_SYNC_PATH = "core/base.html"
TEMPLATE_BASE_ASYNC_PATH = "core/base_async.html"
```

### App Views
Pass the TemplateBaseMixin in all CBV, also load *settings* from *django.conf*. This gonna **select** one of both templates after checking request.GET parameter *?async=true*.

```python
from django.views.generic.base import TemplateView
from django.shortcuts import render
from django.conf import settings


class TemplateBaseMixin(object):
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['template_base'] = settings.TEMPLATE_BASE_ASYNC_PATH if self.request.GET.get('async', None) == 'true' else settings.TEMPLATE_BASE_SYNC_PATH
        return context


class HomePageView(TemplateBaseMixin, TemplateView):
    template_name = "core/home.html"


class SamplePageView(TemplateBaseMixin, TemplateView):
    template_name = "core/sample.html"
```
## Frontend

### Sync Template
Set 'async' class in your anchors, also set the id of element to push async data with *data-target* attribute.

```html
    <a class="nav-link async" data-target="content" href="{% url 'home' %}">Home</a>
    <a class="nav-link async" data-target="content" href="{% url 'sample' %}">Sample</a>

    <div id="content">
        {% block content %}{% endblock %}
    </div>
```

### Async Template
The async template has just the content block.

```html
   {% block content %}{% endblock %}
```

### Extending Templates
This is where the magic happens, setting up the template dynamically.

```html
   {% extends template_base %}
```

### Javascript
Use the custom Javascript to capture click on anchors with async class and create the fetch request instead.

```javascript
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
            history.pushState(null, '', this.href.replace(/^.*\/\/[^\/]+/, ''));
            fetch(this.href+"?async=true", {'credentials':'include'})
            .then(response => response.text()).then(function(data){
                document.getElementById(this_.dataset.target).innerHTML = data;
            });        
        }
        return false;
    });
}
```

### Javascript with CSS Animations 
I have added css animations, the effect is really cool thanks to [Animate.css](https://daneden.github.io/animate.css/) by Daniel Eden.

```javascript
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
```