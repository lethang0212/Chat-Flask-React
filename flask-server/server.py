from logging import debug
from flask import Flask

app = Flask(__name__)

# Api route memberteam
# test

@app.route("/members")
def members():
    return {"members": ["Thang", "Quy", "Than", "Thieu", "Khang"]}


if __name__ == "__main__":
    app.run(debug=True)
