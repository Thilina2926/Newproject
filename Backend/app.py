from multiprocessing import AuthenticationError
from flask import Flask, request, jsonify
import requests  # Import requests module
import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import firebase_admin
from firebase_admin import auth
from firebase_admin import credentials, firestore
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
FIREBASE_API_KEY = "AIzaSyBfUtvrkvwQ9UpZAykMDmYzw2yc6pmazs8"



cred = firebase_admin.credentials.Certificate("./finddownsyndrome-firebase-adminsdk-xilx6-a393e37263.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route('/register', methods=['POST'])
def register():
    try:
        # Retrieve data from the request
        first_name = request.json.get('firstName')
        last_name = request.json.get('lastName')
        phone_number = request.json.get('phone')
        address = request.json.get('address')
        email = request.json.get('email')
        course = request.json.get('course')
        gender = request.json.get('gender')
        activities = request.json.get('activities')
        image = request.json.get('image')
        document = request.json.get('document')
        user_data = {
            "firstName": first_name,
            "lastName": last_name,
            "phone": phone_number,
            "address": address,
            "email": email,
            "course": course,
            "gender": gender,
            "activities": activities,
            "image": image,
            "document": document
        }
        print(user_data)
        db.collection("users").document(email).set(user_data)

        return jsonify({ "message": "User registered successfully!"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/users', methods=['GET'])
def get_all_users():
    try:
        # Retrieve all documents in the "users" collection
        users_ref = db.collection("users")
        docs = users_ref.stream()

        # Create a list of all user data
        users = []
        for doc in docs:
            user = doc.to_dict()
            user["id"] = doc.id  # Include document ID for reference
            users.append(user)

        return jsonify(users), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/users/<email>', methods=['GET'])
def get_user(email):
    try:
        # Retrieve the document with the given email from the "users" collection
        user_ref = db.collection("users").document(email)
        user_doc = user_ref.get()

        if user_doc.exists:
            # Convert the document data to a dictionary
            user_data = user_doc.to_dict()
            user_data["id"] = user_doc.id  # Include document ID for reference
            return jsonify(user_data), 200
        else:
            return jsonify({"error": "User not found!"}), 404

    except Exception as e:
        return jsonify({"error":str(e)}),500
    
@app.route('/users/<email>', methods=['PUT'])
def edit_user(email):
    try:
        # Retrieve updated data from the request
        updated_data = request.json

        # Update the user document in Firestore
        user_ref = db.collection("users").document(email)
        if user_ref.get().exists:
            user_ref.update(updated_data)
            return jsonify({"message": "User updated successfully!"}), 200
        else:
            return jsonify({"error": "User not found!"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/users/<email>', methods=['DELETE'])
def delete_user(email):
    try:
        # Delete the user document in Firestore
        user_ref = db.collection("users").document(email)
        if user_ref.get().exists:
            user_ref.delete()
            return jsonify({"message": "User deleted successfully!"}), 200
        else:
            return jsonify({"error": "User not found!"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)
