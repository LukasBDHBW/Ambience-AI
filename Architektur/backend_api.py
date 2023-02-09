# Hinweis: In ======================== Zeichen eingebettete Kommentarblöcke sind derzeit nicht aktive Variationen bzw. zukünftig möclihe Anpassungen

### import statements

#from deepface import DeepFace  ## Test für zukünftige Optimierung des Emotionsmodells

import cv2 # in aktueller Version nicht eingebunden

from flask import Flask, render_template, request, redirect

import base64

import tensorflow as tf
from tensorflow import keras
from keras.preprocessing import image
from tensorflow.keras.preprocessing import image

import numpy as np

from PIL import Image, ImageOps

import io

from matplotlib import pyplot as plt # in aktueller Version nicht eingebunden

from mtcnn.mtcnn import MTCNN # in aktueller Version nicht eingebunden

import requests # in aktueller Version nicht eingebunden

from transformers import ViTFeatureExtractor, ViTForImageClassification

import pickle




app = Flask(__name__, template_folder='templateFiles', static_folder='staticFiles')

# redirect, damit die Route "/" nicht zum Fehler führt
@app.route('/')
def index():
    return redirect('/home', code=301)


# Hauptapp ist hinter dieser Route, die URL ändert sich von der Bildaufnahme bis zum Endergebnis nicht
@app.route("/home")
def loadFrontend():
    return render_template('Main.html')


# Nebenseiten, die im Footer verlinkt sind
@app.route("/banken") 
def loadPartner():
    return render_template('banken.html')

@app.route("/impressum")
def loadImpressum():
    return render_template('impressum.html')

@app.route("/ueber_uns")
def loadUeberUns():
    return render_template('ueber_uns.html')





# api's (Verarbeiung der http-requests)

# Verarbeitung des aufgenommenen Bildes
@app.route("/api", methods=['POST'])

def generate_output():

    # Einbindung Emotionsmodell
    model_emotion = keras.models.load_model('./staticFiles/ferNet.h5')
    # Modell von https://www.kaggle.com/code/anantgupt/facial-emotion-recogination-91-accuracy-train-set/notebook

    # Einbindung Altersmodell
    model_age = ViTForImageClassification.from_pretrained('./staticFiles/Age-Model')
    transforms = ViTFeatureExtractor.from_pretrained('./staticFiles/Age-Model')
    # Modell von huggingface

    # Labels für den Output des Altersmodells
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


    # Bild aus dem Post-Request laden und decodieren
    data = request.data
    img = Image.open(io.BytesIO(base64.b64decode(data)))



    ### Emotionserkennung

    #==========================================================================================#
    #im_array = np.array(img) ## Test für spätere Deepface Integration
    #flipped_array = im_array[:,:,::-1] ## Test für spätere Deepface Integration

    ## Versuch, das Emotionsmodell durch Ausschneiden des Gesichtsbereichs zu verbessern, jedoch nicht aktiv wegen kaum Verbesserung und starken Performanceeinbußen
    #detector = MTCNN()
    #face = detector.detect_faces(np.array(img))
    #face_pixels = face[0]['box']
    #face_img = img.crop((face_pixels[0], face_pixels[1], face_pixels[0]+face_pixels[2], face_pixels[1]+face_pixels[3]))
    #==========================================================================================#

    # preprocessing for das Emotionsmodell
    # Das Modell erwartet 48x48 Bilder in Graustufen
    face_gray = ImageOps.grayscale(img)
    face_resized = face_gray.resize((48,48))
    img_array = tf.keras.utils.img_to_array(face_resized)
    img_batch = np.expand_dims(img_array,axis = 0)

    # Prediction des Emotionsmodells
    prediction = model_emotion.predict(img_batch)
    mapping_list = ['angry','disgust','fear','happy','neutral','sad','surprise']
    result_emotion = mapping_list[prediction[0].argmax()]

    #==========================================================================================#
    # Test für Deepface Integration
    #try:
    #    result_emotion = DeepFace.analyze(flipped_array,actions = ['emotion'])["dominant_emotion"]
    #except:
    #    result_emotion = "sad"
    #==========================================================================================#



    ### Alterserkennung

    inputs = transforms(img, return_tensors='pt') # preprocessing für Altersmodell
    output = model_age(**inputs)
    proba = output.logits.softmax(1) # Vorhergesagte Class Wahrscheinlichkeiten
    preds = proba.argmax(1) # Vorhergesagte Class

    # Mapping auf die Stufen Jung, Erwachsen und Alt
    if int(preds)<=2:
        result_age="Jung"
    elif int(preds)>=7:
        result_age="Alt"
    else:
        result_age="Erwachsen"


    ### response mit den Ergebnissen zurückgeben
    result = [result_emotion, result_age]
    return result


# Verarbeitung von Emotion und Alter und Ausgabe der Bankproduktempfehlung
@app.route("/api_banking", methods=['POST'])

def give_recommendation():
    
    input_data = request.form # Die bestätigten Daten in neuem post request
    age_input = input_data["age"]
    emotions_input = input_data["emotion"]
    loaded_model = pickle.load(open("./staticFiles/product_model.sav", 'rb')) # Laden des Bayesian Modells
    products = ["Girokonto","Gemeinschaftskonto","Kreditkarte","Tagesgeldkonto","Sparplan","Bausparplan",
                "Edelmetall Depot","Aktien Depot","Aktiensparplan","ETF Sparplan","Privatkredit","Umschuldung","Immobilienfinanzierung",
                "Immobilien","Hebel Zertifikate","Crypto","Lebensversicherung","Rentenversicherung","NFT","Berufsunfähigkeitsversicherung",
                "Crypto, Hebel Zertifikate","Immobilien, Bausparvertrag","Gemeinschaftskonto, Tagesgeldkonto","NFT, Crypto","Staatsanleihen","Bausparvertrag, Aktien Sparplan"]
    emotions = ['angry','disgust','fear','happy','neutral','sad','surprise']
    ages=["Jung","Erwachsen","Alt"]
    age=ages.index(age_input)
    emotion=emotions.index(emotions_input)
    prediction = loaded_model.predict([[(age+1),(emotion+1)]])
    prediction = products[prediction[0]-1]

    return prediction