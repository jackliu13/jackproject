from flask import jsonify, abort, make_response, request
from .app import app
from model.user import User
from model.project import Project
from model.user_project import UserProject
from model.recruit import Recruit
from model.recruit_request import RecruitRequest



############################################
# USER MANAGEMENT
############################################

#Register an account
@app.route("/api/register", methods=["POST"])
def web_register():
    if not request.json or "username" not in request.json or 'password' not in request.json or 'email' not in request.json or 'realname' not in request.json:
        return jsonify({"error": "account creation missing valid inputs"}), 400
    print(request.json['realname'])
    user = User(username=request.json['username'],password=request.json['password'], email=request.json['email'], realname=request.json['realname'])
    user.save()
    return jsonify({"register": "success"})


#Verify's user login
@app.route("/api/login", methods=["POST"])
def web_login():
    if not request.json or "username" not in request.json or 'password' not in request.json:
        return jsonify({"error": "login requires json with 'username' and 'password' key"}), 400
    username= request.json['username']
    password = request.json['password']
    user = User.login(username,password)
    if user is not None:
        return jsonify({
        "id": user.id
        })
    return jsonify({"error": "no user found"})

# Returns all projects from a given user
@app.route("/api/projects/fromuser", methods=["POST"])
def select_project_fromuser():
    if not request.json or "userid" not in request.json:
        return jsonify({"error": "new project is missing valid input"}), 400
    return jsonify({"projects":[item.json() for item in Project.projects_fromuser(request.json['userid'])]})

#Find user info:
@app.route('/api/user', methods=["POST"])
def user_info():
    if not request.json or "userid" not in request.json:
        return jsonify({"error": "user id is missing valid input"}), 400
    user = User.user_info(request.json['userid'])
    if user is not None:
        return jsonify({"user": user.json()})
    return jsonify({"error": "invalid project id"})

############################################
# PROJECT MANAGEMENT
############################################

#Returns all projects
@app.route("/api/projects/all", methods=["GET"])
def all_projects():
    return jsonify({"projects":[item.json() for item in Project.all_projects()]})

#Find the data of a specific project
@app.route("/api/project/select", methods=["POST"])
def select_project():
    if not request.json or "projectid" not in request.json:
        return jsonify({"error": "new project is missing valid input"}), 400
    project = Project.project_info(request.json['projectid'])
    if project is not None:
        return jsonify({"project": project.json()})
    return jsonify({"error": "invalid project id"})

#Creates a new project with a user-id as owner
@app.route('/api/projects/create-project', methods=["POST"])
def create_project():
    """ create an account with a username, realname, and password provided in
    a json POST request """
    if not request.json or "title" not in request.json or 'description' not in request.json or 'owner' not in request.json:
        return jsonify({"error": "new project is missing valid input"}), 400
    project = Project(title=request.json['title'], description= request.json['description'], owner= request.json['owner'])
    project.save()
    project.addUser(request.json['owner'], "Owner")
    if "tags" in request.json:
        project.tags=request.json['tags']
    project.save()
    print("added project")
    return jsonify(project.json())

#Find all the users part of a given project
@app.route('/api/project/users', methods=["POST"])
def project_users():
    """ create an account with a username, realname, and password provided in
    a json POST request """
    if not request.json or "projectid" not in request.json:
        return jsonify({"error": "new project is missing valid input"}), 400
    users = UserProject.find_projectUsers(request.json['projectid'])
    if users is not None:
        return jsonify({"users":[item.json() for item in users]})
    return jsonify({"error": "invalid project id"})

############################################
# RECRUIT MANAGEMENT
############################################

#Creates a new project with a user-id as owner
@app.route('/api/recruit/create-recruit', methods=["POST"])
def create_recruit():
    if not request.json or "projectid" not in request.json or 'role' not in request.json or 'description' not in request.json:
        return jsonify({"error": "new recruit model is missing valid input"}), 400
    recruit = Recruit(projectid=request.json['projectid'], description= request.json['description'], role= request.json['role'])
    recruit.save()
    return jsonify(recruit.json())


#Get all the recruit listings for a given project
@app.route('/api/project/recruits', methods=["POST"])
def find_recruits():
    if not request.json or "projectid" not in request.json:
        return jsonify({"error": "find recruit module is missing valid input"}), 400
    return jsonify({"recruits":[item.json() for item in Recruit.recruits_for_project(request.json['projectid'])]})

#Creates a new recruit request object for a given recruit
@app.route('/api/recruit/create-recruit-request', methods=["POST"])
def create_recruit_request():
    if not request.json or "recruitid" not in request.json or 'userid' not in request.json or 'message' not in request.json or 'status' not in request.json:
        return jsonify({"error": "new recruit model is missing valid input"}), 400
    recruitrequest = RecruitRequest(recruitid=request.json['recruitid'], userid=request.json['userid'], message= request.json['message'], status= request.json['status'])
    recruitrequest.save()
    return jsonify(recruitrequest.json())

#Get all the recruit-request objects for a given recruit listing
@app.route('/api/project/recruit-requests', methods=["POST"])
def find_recruits_request():
    if not request.json or "recruitid" not in request.json:
        return jsonify({"error": "find recruit-rquest module is missing valid input"}), 400
    return jsonify({"recruitrequests":[item.json_with_username() for item in RecruitRequest.requests_for_recruit(request.json['recruitid'])]})


#Accept a request and add the user to the project
@app.route('/api/project/recruit-requests/accept', methods=["POST"])
def accept_recruits_request():
    if not request.json or "recruitrequestid" not in request.json:
        return jsonify({"error": "accept recruit-request module is missing valid input"}), 400
    RecruitRequest.accept(request.json['recruitrequestid'])
    return jsonify({"accept_recruitrequests":"Done"})

#Reject a recruit request
@app.route('/api/project/recruit-requests/reject', methods=["POST"])
def reject_recruits_request():
    if not request.json or "recruitrequestid" not in request.json:
        return jsonify({"error": "reject recruit-request module is missing valid input"}), 400
    RecruitRequest.reject(request.json['recruitrequestid'])
    return jsonify({"reject_recruitrequests":"Done"})


############################################
# Error Handling
############################################

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)
