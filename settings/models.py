from django.db import models


class Menu(models.Model):
    title = models.CharField(max_length=25)
    iconClass = models.CharField(max_length=20)
    href = models.CharField(max_length=200)
    parent = models.ForeignKey(
        'self', null=True, on_delete=models.SET_NULL, related_name='Menu')

    class Meta:
        ordering = ['id']

    def __str__(self):
        return "{} {}".format(self.pk, self.title)

    # my addition
    @staticmethod
    def get_menu():
        return Menu.objects.filter(parent__isnull=True)

    def submenu(self):
        return Menu.objects.filter(parent_id__exact=self.id)
    # end my addition
