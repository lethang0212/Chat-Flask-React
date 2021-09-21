from logging import debug
from flask import Flask

app = Flask(__name__)

# Api route memberteam
# test a
# uh...hi

@app.route("/members")
def members():
    return {
        "members": [
            {"id": 1, "name": "le thang", "address": "Phuong Trung, Ha Noi"},
            {"id": 2, "name": "le quy", "address": "Phuong Trung, Ha Noi"},
            {"id": 3, "name": "le than", "address": "Phuong Trung, Ha Noi"},
            {"id": 4, "name": "le thieu", "address": "Phuong Trung, Ha Noi"},
            {"id": 5, "name": "le khang", "address": "Phuong Trung, Ha Noi"},
        ],
    }


if __name__ == "__main__":
    app.run(debug=True)
