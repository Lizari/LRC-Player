from ast import parse
import os
from flask import *
from flask_cors import CORS
from parser import LRCParser
from werkzeug.utils import secure_filename

app = Flask(__name__, static_folder=".", static_url_path="")
app.config["JSON_AS_ASCII"] = False
app.config["UPLOAD_FOLDER"] = "./tmp"
CORS(app, resources={"*": {"origin": "*"}})


@app.route("/")
def index():
    return jsonify({"status": "ok"})


@app.route("/lrc", methods=["POST"])
def lrc():
    if "file" not in request.files:
        return jsonify({"message": "file is required"})

    file = request.files["file"]
    filename = file.filename

    if "" == filename:
        return jsonify({"message": "filename must not empty"})

    saveFileName = secure_filename(filename)
    file.save(os.path.join(app.config["UPLOAD_FOLDER"], saveFileName))

    parsed = parser(os.path.join(app.config["UPLOAD_FOLDER"], saveFileName))
    os.remove(os.path.join(app.config["UPLOAD_FOLDER"], saveFileName))

    return jsonify(parsed)


def parser(path: str) -> dict:
    return LRCParser(path).parse()


if __name__ == "__main__":
    app.run(port=8080, debug=True)
