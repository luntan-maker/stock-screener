from flask import Flask, request
from flask_cors import CORS
from financial import *

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def shutdown_server():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError("Not running with the werkzeug server")
    func()

@app.get('/shutdown')
def shutdown():
    shutdown_server()
    return "Server shutting down ..."

@app.route("/")
def hello_world():
    return "Hello, Worlds!"
    # return "<p>Hello, World!</p>"

@app.route("/data")
def data():
    ticker = request.args.get("tick")
    hist_of = request.args.get("hist")
    interval = request.args.get("interval")

    return regularData(ticker, hist_of, interval)


@app.route("/sma")# @cross_origin()
def SMA():
    ticker = request.args.get("tick")
    range_of = request.args.get("range")
    hist_of = request.args.get("hist")
    interval = request.args.get("interval")

    return sma(ticker, hist_of, range_of, interval)
