from flask import Flask, render_template, request

import tensorflow as tf
from tensorflow import keras
import numpy as np

from keras.preprocessing import image

from PIL import Image, ImageOps



model = keras.models.load_model('../Backend/Bild KI/ferNet.h5')
# model from https://www.kaggle.com/code/anantgupt/facial-emotion-recogination-91-accuracy-train-set/notebook




app = Flask(__name__, template_folder='templateFiles', static_folder='staticFiles')


@app.route("/home")

def loadFrontend():
    return render_template('Oberfläche.html')


@app.route("/api", methods=['POST'])

def generate_output():
    
    form_data = request.form
    user_image = request.files['image']

    img = Image.open(user_image)
    img2 = ImageOps.grayscale(img)
    img3 = img2.resize((48,48))
    img_array = tf.keras.utils.img_to_array(img3)
    img_batch = np.expand_dims(img_array,axis = 0)

    prediction = model.predict(img_batch)
    mapping_list = ['angry','disgust','fear','happy','neutral','sad','surprise']
    result = mapping_list[prediction[0].argmax()]

    # banking_product = NeuralNetwork.calc_banking_product(user_image)   # So könnte das später aussehen

    return result