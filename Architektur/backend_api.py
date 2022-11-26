from flask import Flask

app = Flask(__name__)


@app.route("/api", methods=['POST'])

def generate_output():
    # banking_product = NeuralNetwork.calc_banking_product()   # So könnte das später aussehen

    return "connection test"