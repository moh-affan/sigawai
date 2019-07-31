import base64

from django import template

register = template.Library()


@register.simple_tag
def generate_basic(user, password):
    token = base64.b64encode('{}:{}'.format(user, password).encode(
        encoding='utf-8', errors='strict')).decode()
    return 'Basic {}'.format(token)
