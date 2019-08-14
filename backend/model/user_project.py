from database.orm import ORM
from .user import User

class UserProject(ORM):

    fields = ['userid', 'projectid', 'userrole']
    dbtable = "user_project"

    def __init__(self, **kwargs):
        self.id = kwargs.get('id')
        self.userid = kwargs.get('userid')
        self.projectid = kwargs.get('projectid')
        self.userrole = kwargs.get('userrole') #Array / List of roles
        # self.creationdate = kwargs.get('creationdate')

    @classmethod
    def find_projectUsers(cls, projectid):
        SQL = """
        SELECT user_info.* FROM user_info
        JOIN user_project ON user_project.userid = user_info.id
        JOIN project ON project.id = user_project.projectid
        WHERE project.id=%s;
        """
        users = User.select_all_where(SQL, (projectid,))
        if users is None:
            return None
        print(users)
        return users


    def json(self):
        return {
        "userid": self.userid,
        "projectid": self.projectid,
        "userrole": self.userrole
    }
