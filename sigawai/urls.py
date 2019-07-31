from django.urls import path

from home.views import HomeView, LoginView, LoginApiView
from settings.views import MenuApiView, MenuView

urlpatterns = [
    path('', HomeView.as_view()),
    path('login', LoginView.as_view()),
    path('settings/menu', MenuView.as_view()),
    # api
    path('api/login', LoginApiView.as_view()),
    path('api/menus', MenuApiView.as_view())
]
