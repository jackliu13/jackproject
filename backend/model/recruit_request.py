from database.orm import ORM
from .user import User
from .project import Project
from .recruit import Recruit

class RecruitRequest(ORM):

    fields = ['recruitid', 'userid', 'message', 'status']
    dbtable = "recruit_request"

    def __init__(self, **kwargs):
        self.id = kwargs.get('id')
        self.recruitid = kwargs.get('recruitid')
        self.userid = kwargs.get('userid')
        self.message = kwargs.get('message')
        self.status = kwargs.get('status')

    @classmethod
    def requests_for_recruit(cls, recruitid):
        SQL = "SELECT * FROM recruit_request WHERE recruitid=%s;"
        return cls.select_all_where(SQL, (recruitid,))


    @classmethod
    def accept(cls, recruit_request_id):
        found_recruit_request = cls.from_id(recruit_request_id)
        if found_recruit_request is None:
            return
        userid = found_recruit_request.userid #Found the user

        #found the recruit object which stores the project id/role => get the project
        recruitid = found_recruit_request.recruitid
        found_recruit = Recruit.from_id(recruitid)
        role = found_recruit.role
        project = Project.from_id(found_recruit.projectid)

        #Add user to project
        project.addUser(userid, role)
        found_recruit_request.delete()

    @classmethod
    def reject(cls, recruit_request_id):
        found_recruit_request = cls.from_id(recruit_request_id)
        if found_recruit_request is None:
            return
        found_recruit_request.delete()

    def json(self):
        return {
        "id": self.id,
        "recruitid": self.recruitid,
        "userid": self.userid,
        "message": self.message,
        "status": self.status
    }


    def json_with_username(self):
        username = User.user_info(self.userid).username
        return {
        "id": self.id,
        "recruitid": self.recruitid,
        "userid": self.userid,
        "username": username,
        "message": self.message,
        "status": self.status
    }
