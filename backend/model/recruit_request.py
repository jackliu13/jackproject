from database.orm import ORM
from .user import User

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



    def json(self):
        return {
        "recruitid": self.recruitid,
        "userid": self.userid,
        "message": self.message,
        "status": self.status
    }


    def json_with_username(self):
        username = User.user_info(self.userid).username
        return {
        "recruitid": self.recruitid,
        "userid": self.userid,
        "username": username,
        "message": self.message,
        "status": self.status
    }
