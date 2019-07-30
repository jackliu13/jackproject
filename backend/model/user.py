from database.orm import ORM

class User(ORM):

    fields = ['username', 'password', 'realname']
    dbtable = "user_info"

    def __init__(self, **kwargs):
        self.id = kwargs.get('id')
        self.username = kwargs.get('username')
        self.password = kwargs.get('password')
        self.realname = kwargs.get('realname')

    def json(self):
        return {
            "username": self.username,
            "realname": self.realname,
        }



    # #Login function
    # @classmethod
    # def login(cls, username, passworde):
    #     SQL = "SELECT * FROM user_info WHERE username=%s"
    #     user = cls.find_one(SQL, (username,))
    #     if user is None:
    #         return None
    #     if user.password == passworde:
    #         return user
    #     return None


    # #Find all Projects User is working on based on project ID's
    # def findProjects(listOfIds):
    #     for x in listOfIds:
    #
    #         #Create a new project object -> need to initialize based on database

    #
