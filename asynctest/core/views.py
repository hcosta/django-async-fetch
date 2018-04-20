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