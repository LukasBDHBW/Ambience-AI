# imports
from flask import Flask, render_template, request
import base64

import tensorflow as tf
from tensorflow import keras
import numpy as np

from keras.preprocessing import image

from PIL import Image, ImageOps

import io

from matplotlib import pyplot as plt
from mtcnn.mtcnn import MTCNN

import requests
from tensorflow.keras.preprocessing import image
from transformers import ViTFeatureExtractor, ViTForImageClassification


# emotion recognition model
model_emotion = keras.models.load_model('../Backend/Bild KI/Emotion-Model/ferNet.h5')
# model from https://www.kaggle.com/code/anantgupt/facial-emotion-recogination-91-accuracy-train-set/notebook

# age recognition model
model_age = ViTForImageClassification.from_pretrained('../Backend/Bild KI/Age-Model')
transforms = ViTFeatureExtractor.from_pretrained('../Backend/Bild KI/Age-Model')
# model from huggingface

# labels for age model output
idlabel={
    "0": "0-2",
    "1": "3-9",
    "2": "10-19",
    "3": "20-29",
    "4": "30-39",
    "5": "40-49",
    "6": "50-59",
    "7": "60-69",
    "8": "more than 70"}




app = Flask(__name__, template_folder='templateFiles', static_folder='staticFiles')


# frontend pages

# landing page + camera views
@app.route("/home")
def loadFrontend():
    return render_template('Main.html')





# api's
@app.route("/api", methods=['POST'])

def generate_output():
    
    # getting image from post request
    data = request.data
    img = Image.open(io.BytesIO(base64.b64decode(data)))


    ### emotion recognition
    # preprocessing for emotion recognition
    #detector = MTCNN()
    #face = detector.detect_faces(np.array(img))
    #face_pixels = face[0]['box']
    #face_img = img.crop((face_pixels[0], face_pixels[1], face_pixels[0]+face_pixels[2], face_pixels[1]+face_pixels[3]))
    face_gray = ImageOps.grayscale(img)
    face_resized = face_gray.resize((48,48))
    img_array = tf.keras.utils.img_to_array(face_resized)
    img_batch = np.expand_dims(img_array,axis = 0)

    # applying prediction model
    prediction = model_emotion.predict(img_batch)
    mapping_list = ['angry','disgust','fear','happy','neutral','sad','surprise']
    result_emotion = mapping_list[prediction[0].argmax()]


    ### age recognition
    # Apply preprocessing and model
    inputs = transforms(img, return_tensors='pt')
    output = model_age(**inputs)
    proba = output.logits.softmax(1) # Predicted Class probabilities
    preds = proba.argmax(1) # Predicted Classes
    result_age = idlabel[str(preds.item())]


    ### create response with results
    result = [result_emotion, result_age]
    return result


@app.route("/api_banking", methods=['POST'])

def give_recommendation():
    
    input_data = request.form # braucht die bestätigten Daten in neuem post request

    # branch test
    # banking_product = NeuralNetwork.calc_banking_product(input_data)   # So könnte das später aussehen

    return input_data