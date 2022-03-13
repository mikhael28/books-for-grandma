from flask import Flask, jsonify, make_response
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# 92460

@app.route("/<int:book>/<int:page>")
def hello_from_root(book, page):
    print(book)
    print(page)
    URL = f"http://loveread.ec/read_book.php?id={book}&p={page}"
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