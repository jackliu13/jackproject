
class Project:

    def __init__(self, **kwargs):
        self.pk = kwargs.get('pk')
        self.name = kwargs.get('username')
        self.description = kwargs.get('description')
        self.tags = kwargs.get('tags') #Potentially a dictionary
        self.creationdate = kwargs.get('creationdate')
        self.api_key = kwargs.get('api_key',self.generate_api_key())

    #Find all users who are working on the project > And what role they have
    # Likely a dictionary

    #Find a count for how many users are working on the project


    #
