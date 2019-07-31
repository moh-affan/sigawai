# Create your views here.

from basicauth.decorators import basic_auth_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import redirect
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from home.serializers import UserSerializer


@method_decorator(login_required, name='dispatch')
class HomeView(TemplateView):
    template_name = "home.html"


class LoginView(TemplateView):
    template_name = "login.html"

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('/')
        context = self.get_context_data(**kwargs)
        return self.render_to_response(context)


class LoginApiView(APIView):
    authentication_classes = []
    permission_classes = []

    @method_decorator(basic_auth_required, name='post')
    def post(self, request, format=None):

        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user is not None:
            if user.is_active:
                login(request, user)
                request.session['username'] = request.data['username']
                serializer = UserSerializer(User.objects.get(username__exact=user.username), data=request.data,
                                            context={'request': request})
                if serializer.is_valid():
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'success': False, 'message': "User belum terverifikasi"},
                                status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            return Response({'success': False, 'message': "Username atau password Anda salah"},
                            status=status.HTTP_401_UNAUTHORIZED)

    @method_decorator(basic_auth_required, name='delete')
    def delete(self, request, format=None):
        logout(request)
        request.session.flush()
        return Response({'success': True, 'message': "Berhasil logout"},
                        status=status.HTTP_200_OK)

