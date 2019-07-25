
class User:

    def __init__(self, **kwargs):
        self.pk = kwargs.get('pk')
        self.username = kwargs.get('username')
        self.password = kwargs.get('password')
        self.realname = kwargs.get('realname')
        self.api_key = kwargs.get('api_key',self.generate_api_key())

    #Login Function

    #Find all Projects User is working on


    #
