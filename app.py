from flask import Flask, jsonify, make_response
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)


@app.route("/")
def hello_from_root():
    URL = "http://loveread.ec/read_book.php?id=92460&p=1"
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find("div", class_="MsoNormal")
    lines = results.find_all('p', class_="MsoNormal")
    lineArray = []
    for line in lines:
        l = line.text.strip()
        lineArray.append(l)
    # need to also fetch the chapter if available
    # div class=take_h1

    return jsonify(message=lineArray, statusCode=200)


@app.route("/hello")
def hello():
    return jsonify(message='Hello from path!')


@app.errorhandler(404)
def resource_not_found(e):
    return make_response(jsonify(error='Not found!'), 404)