from database.orm import ORM
from .user_project import UserProject
class Project(ORM):

    fields = ['owner', 'title', 'description', 'tags', 'category', 'updates']
    dbtable = "project"

    def __init__(self, **kwargs):
        self.id = kwargs.get('id')
        self.owner = kwargs.get('owner') #Contains a user uuid
        self.title = kwargs.get('title')
        self.description = kwargs.get('description')
        self.tags = kwargs.get('tags')
        self.category = kwargs.get('category')
        self.updates = kwargs.get('updates')
        # self.tags = kwargs.get('tags') #Potentially a dictionary
        # self.creationdate = kwargs.get('creationdate')
        # self.api_key = kwargs.get('api_key',self.generate_api_key())

    #Find all users who are working on the project > And what role they have
    # Likely a dictionary


    #Find a count for how many users are working on the project


    #Add a user to a project
    def addUser(self, userid, role):
        SQL = "SELECT * FROM user_project WHERE projectid=%s AND userid=%s"
        find_existing = UserProject.select_one(SQL, (self.id, userid))
        if find_existing is not None:
            find_existing.userrole.append(role)
            find_existing.save()
        else:
            new_user_project = UserProject(userid=userid, projectid=self.id, userrole=[role])
            new_user_project.save()

    @classmethod
    def all_projects(cls):
        return cls.select_all('project')

    @classmethod
    def projects_fromuser(cls, userid):
        SQL = """SELECT project.* FROM project JOIN user_project ON user_project.projectid=project.id
                    JOIN user_info ON user_info.id=user_project.userid
                    WHERE user_info.id=%s;
            """
        return cls.select_all_where(SQL, (userid,))

    @classmethod
    def projects_ownedBy(cls, ownerid):
        SQL = """SELECT * FROM project WHERE owner=%s;
            """
        return cls.select_all_where(SQL, (ownerid,))

    @classmethod
    def search_projects_byCategory(cls, category):
        SQL = """SELECT * FROM project WHERE category=%s;
            """
        return cls.select_all_where(SQL, (category,))

    @classmethod
    def search_projects_byTag(cls, tag):
        SQL = """SELECT * FROM project WHERE %s=ANY (tags);
            """
        return cls.select_all_where(SQL, (tag,))


    @classmethod
    def project_info(cls, id):
        SQL = "SELECT project.* FROM project WHERE id=%s;"
        project = cls.select_one(SQL, (id,))
        if project is None:
            return None
        return project

    def json(self):
        return {
        "id": self.id,
        "title": self.title,
        "description": self.description,
        "tags": self.tags,
        "owner": self.owner,
        "category": self.category,
        "updates": self.updates
    }
