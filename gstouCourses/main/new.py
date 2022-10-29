from rest_framework.exceptions import AuthenticationFailed

import jwt
from django.contrib.auth import get_user_model


from django.contrib.auth.backends import BaseBackend

class MyBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None):

        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(jwt=token, key='secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
       
        return get_user_model().objects.filter(id=payload['id']).first()