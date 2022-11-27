from flask import Flask, render_template, request

app = Flask(__name__, template_folder='templateFiles', static_folder='staticFiles')


@app.route("/home")

def loadFrontend():
    return render_template('Oberfläche.html')


@app.route("/api", methods=['POST'])

def generate_output():
    
    form_data = request.form
    user_image = request.files['image']

    # banking_product = NeuralNetwork.calc_banking_product(user_image)   # So könnte das später aussehen

    return form_data['job']