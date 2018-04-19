from django.views.generic.base import TemplateView
from django.shortcuts import render
from django.conf import settings


class TemplateBaseMixin(object):
    def get(self, request, *args, **kwargs):
        return render(request, self.template_name, {
            'template_base': settings.TEMPLATE_BASE_ASYNC_PATH if request.GET.get('async', None) == 'true' else settings.TEMPLATE_BASE_SYNC_PATH
            })


class HomePageView(TemplateBaseMixin, TemplateView):
    template_name = "core/home.html"


class SamplePageView(TemplateBaseMixin, TemplateView):
    template_name = "core/sample.html"