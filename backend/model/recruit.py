from database.orm import ORM

class Recruit(ORM):

    fields = ['projectid', 'role', 'description']
    dbtable = "recruit"

    def __init__(self, **kwargs):
        self.id = kwargs.get('id')
        self.projectid = kwargs.get('projectid')
        self.role = kwargs.get('role')
        self.description = kwargs.get('description')

    @classmethod
    def recruits_for_project(cls, projectid):
        SQL = "SELECT * FROM recruit WHERE projectid=%s;"
        return cls.select_all_where(SQL, (projectid,))

    def json(self):
        return {
        "id": self.id,
        "projectid": self.projectid,
        "role": self.role,
        "description": self.description
    }
