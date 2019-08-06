from database.orm import ORM
from .user_project import UserProject
class Project(ORM):

    fields = ['title', 'description', 'owner', 'tags']
    dbtable = "project"

    def __init__(self, **kwargs):
        self.id = kwargs.get('id')
        self.owner = kwargs.get('owner') #Contains a user uuid
        self.title = kwargs.get('title')
        self.description = kwargs.get('description')
        self.tags = kwargs.get('tags')
        # self.tags = kwargs.get('tags') #Potentially a dictionary
        # self.creationdate = kwargs.get('creationdate')
        # self.api_key = kwargs.get('api_key',self.generate_api_key())

    #Find all users who are working on the project > And what role they have
    # Likely a dictionary


    #Find a count for how many users are working on the project


    #Add a user to a project
    def addUser(self, userid, role):
        new_user_project = UserProject(userid=userid, projectid=self.id, userrole=[role])
        new_user_project.save()

    @classmethod
    def all_projects(cls):
        return cls.select_all('project')

    @classmethod
    def projects_fromuser(cls, userid):
        SQL = """SELECT * FROM project JOIN user_project ON user_project.projectid=project.id
                    JOIN user_info ON user_info.id=user_project.userid
                    WHERE user_info.id=%s;
            """
        return cls.select_all_where(SQL, (userid,))


    def json(self):
        return {
        "id": self.id,
        "title": self.title,
        "description": self.description,
        "tags": self.tags,
        "owner": self.owner
    }
