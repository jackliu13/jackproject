from database.orm import ORM
from .user_project import UserProject
class Project(ORM):

    fields = ['title', 'description']
    dbtable = "project"

    def __init__(self, **kwargs):
        self.id = kwargs.get('id')
        self.title = kwargs.get('title')
        self.description = kwargs.get('description')
        # self.tags = kwargs.get('tags') #Potentially a dictionary
        # self.creationdate = kwargs.get('creationdate')
        # self.api_key = kwargs.get('api_key',self.generate_api_key())

    #Find all users who are working on the project > And what role they have
    # Likely a dictionary


    #Find a count for how many users are working on the project


    #Add a user to a project
    def addUser(self, user, role):
        new_user_project = UserProject(userid=user.id, projectid=self.id, userrole=role)
        new_user_project.save()

    @classmethod
    def all_projects(cls):
        return cls.select_all('project')


    def json(self):
        return {
        "title": self.title,
        "description": self.description,
    }
