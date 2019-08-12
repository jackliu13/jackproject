from flask import jsonify, abort, make_response, request
from .app import app
from model.user import User
from model.project import Project
from model.user_project import UserProject

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

# Returns all projects from a given user
@app.route("/api/projects/fromuser", methods=["POST"])
def select_project_fromuser():
    if not request.json or "userid" not in request.json:
        return jsonify({"error": "new project is missing valid input"}), 400
    return jsonify({"projects":[item.json() for item in Project.projects_fromuser(request.json['userid'])]})

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

#Find user info:
@app.route('/api/user', methods=["POST"])
def user_info():
    if not request.json or "userid" not in request.json:
        return jsonify({"error": "user id is missing valid input"}), 400
    user = User.user_info(request.json['userid'])
    if user is not None:
        return jsonify({"user": user.json()})
    return jsonify({"error": "invalid project id"})


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)
