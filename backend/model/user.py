from database.orm import ORM
import bcrypt

class User(ORM):

    fields = ['username', 'password', 'realname']
    dbtable = "user_info"

    def __init__(self, **kwargs):
        self.id = kwargs.get('id')
        self.email = kwargs.get('email')
        self.username = kwargs.get('username')
        self.password = kwargs.get('password')
        self.realname = kwargs.get('realname')

    def json(self):
        return {
            "username": self.username,
            "realname": self.realname,
        }

    def hash_password(self, password):
        self.password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        return self.password



    #Login function
    @classmethod
    def login(cls, username, password):
        SQL = "SELECT * FROM user_info WHERE username=%s"
        user = cls.select_one(SQL, (username,))
        if user is None:
            return None
        if user.password == password:
            return user
        return None


    # #Find all Projects User is working on based on project ID's
    # def findProjects(listOfIds):
    #     for x in listOfIds:
    #
    #         #Create a new project object -> need to initialize based on database

    #
