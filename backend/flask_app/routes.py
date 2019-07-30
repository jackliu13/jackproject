from flask import jsonify, abort, make_response, request
from .app import app
from model.user import User
from model.project import Project


# @app.route("/api/login", methods=["POST"])
# def web_login():
#     """ accept a username and password in json data, return the user's api key """
#     if not request.json or "username" not in request.json or 'password' not in request.json:
#         return jsonify({"error": "deposit requires json with 'username' and 'password' key"}), 400
#     username= request.json['username']
#     password = request.json['password']
#     user = User.login(username,password)
#     if user is not None:
#         return jsonify({
#         "api_key": user.api_key
#         })
#     return jsonify({"error": "no user found"})

@app.route("/api/projects/all", methods=["GET"])
def all_projects():
    return jsonify({"projects":[item.json() for item in Project.all_projects()]})

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)
