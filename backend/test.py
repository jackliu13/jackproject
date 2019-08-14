from model.user import User
from model.project import Project


user = User(**{
            "username": "testORM8",
            "realname": "Jack Liu",
            "password": "password",
            "email": "test123@gmail.com"
        })
user.save()
user.realname = "New Name"
user.save()


user2 = User(**{
            "username": "seconduser8",
            "realname": "Second user",
            "password": "password",
            "email": "test12345@gmail.com"
        })
user2.save()


project = Project(**{
            "title": "Title3",
            "description": "description3",
            "owner" : user.id
        })
project.save()
project.addUser(user.id, "Owner")
project.title = "New Title"
project.save()
#
# project.addUser(user, ['Designer', 'Coder'])
# project.addUser(user2, ['Designer'])

# print(User.login(user2.username, user2.password).username)
