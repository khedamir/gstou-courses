from rest_framework.exceptions import AuthenticationFailed

import jwt
from django.contrib.auth import get_user_model


from django.contrib.auth.backends import BaseBackend

       

def simple_middleware(get_response):
    # Единовременная настройка и инициализация.
    def middleware(request):
        # Код должен быть выполнен для каждого запроса
        # до view
        token = request.COOKIES.get('jwt2')
        user=None
        if token:
            try:
                payload = jwt.decode(jwt=token, key='secret', algorithms=['HS256'])
            except jwt.ExpiredSignatureError:
                raise AuthenticationFailed('Unauthenticated!')
        
            user= get_user_model().objects.filter(id=payload['id']).first()
        
        
        request.myuser=user

        response = get_response(request)
        # Код должен быть выполнен ответа после view
        return response
    return middleware


    