from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from rest_framework import generics, mixins
from rest_framework.renderers import JSONRenderer

from settings.models import Menu
from settings.serializers import MenuSerializer


@method_decorator(login_required, name='dispatch')
class MenuView(TemplateView):
    template_name = "menu.html"


class MenuApiView(generics.ListAPIView):
    queryset = Menu.get_menu()
    serializer_class = MenuSerializer
    renderer_classes = [JSONRenderer]


class CreateMenuView(generics.CreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer


class DetailMenuView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
