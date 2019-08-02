from rest_framework import serializers

from settings.models import Menu


class SubmenuSerializer(serializers.ModelSerializer):
    parent = serializers.PrimaryKeyRelatedField(queryset=Menu.get_menu(),
                                                allow_null=True)

    class Meta:
        model = Menu
        fields = ['id', 'title', 'iconClass', 'href', 'parent']


class MenuSerializer(serializers.ModelSerializer):
    submenu = SubmenuSerializer(many=True, required=False)
    parent = serializers.PrimaryKeyRelatedField(queryset=Menu.get_menu(),
                                                allow_null=True)

    class Meta:
        model = Menu
        fields = ['id', 'title', 'iconClass', 'href', 'parent', 'submenu']
