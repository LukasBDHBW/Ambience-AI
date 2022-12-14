# ---
# jupyter:
#   jupytext:
#     formats: ipynb,py
#     text_representation:
#       extension: .py
#       format_name: light
#       format_version: '1.5'
#       jupytext_version: 1.14.0
#   kernelspec:
#     display_name: ace_new
#     language: python
#     name: python3
# ---

import pandas as pd
import random

products = ["Girokonto","Gemeinschaftskonto","Kreditkarte","Tagesgeldkonto","Sparplan","Bausparplan",
"Edelmetall Depot","Aktien Depot","Aktiensparplan","ETF Sparplan","Privatkredit","Umschuldung","Immobilienfinanzierung",
"Immobilien","Hebel Zertifikate","Crypto","Lebensversicherung","Private Rentenversicherung","NFTs","Berufsunfähigkeitsversicherung"]
emotions = ['angry','disgust','fear','happy','neutral','sad','surprise']
len(products)

age=[]
for i in range(round(20000*0.1855)):
    age.append("Jung")
for i in range(round(20000*0.5211)):
    age.append("Erwachsen")
for i in range(round(20000*(1-0.1855-0.5211))):
    age.append("Alt")
data=pd.DataFrame(age,columns=["age"])
data.value_counts()

emotions_col=[]
j=0
while j<len(data.age):
    for i in emotions:
        emotions_col.append(i)
    j+=7
for i in range(6):
    emotions_col.pop()
data["emotions"] = emotions_col

# +
neueSpalte=[]
for i in data.index:
    row = data.iloc[i] # row ist dann vom Datentyp Serie
    if row.age=="Jung" and row.emotions=="angry":
        if random.random() < 0.2:
            neueSpalte.append("Girokonto")
        else:
            neueSpalte.append(random.choice(products))
    elif row.age=="Jung" and row.emotions=="disgust":
        if random.random() < 0.2:
            neueSpalte.append("NFT")
        else:
            neueSpalte.append(random.choice(products))
    elif row.age=="Jung" and row.emotions=="fear":
        if random.random() < 0.2:
            neueSpalte.append("Berufsunfähigkeitsversicherung")
        else:
            neueSpalte.append(random.choice(products))
    elif row.age=="Jung" and row.emotions=="happy":
        if random.random() < 0.2:
            neueSpalte.append("Aktien Depot")
        else:
            neueSpalte.append(random.choice(products))
    elif row.age=="Jung" and row.emotions=="neutral":
        if random.random() < 0.2:
            neueSpalte.append("Girokonto")
        else:
            neueSpalte.append(random.choice(products))
    elif row.age=="Jung" and row.emotions=="sad":
        if random.random() < 0.2:
            neueSpalte.append("Bausparplan")
        else:
            neueSpalte.append(random.choice(products))
    elif row.age=="Jung" and row.emotions=="surprise":
        if random.random() < 0.2:
            neueSpalte.append("Crypto, Hebel Zertifikate")
        else:
            neueSpalte.append(random.choice(products))
    elif row.age=="Erwachsen" and row.emotions=="angry":
        if random.random() < 0.2:
            neueSpalte.append("Edelmetall Depot")
        else:
            neueSpalte.append(random.choice(products))
    elif row.age=="Erwachsen" and row.emotions=="disgust":
        if random.random() < 0.2:
            neueSpalte.append("Kreditkarte")
        else:
            neueSpalte.append(random.choice(products))
    elif row.age=="Erwachsen" and row.emotions=="fear":
        if random.random() < 0.2:
            neueSpalte.append("Rentenversicherung")
        else:
            neueSpalte.append(random.choice(products))
    elif row.age=="Erwachsen" and row.emotions=="happy":
        if random.random() < 0.2:
            neueSpalte.append("Gemeinschaftskonto, Tagesgeldkonto")
        else:
            neueSpalte.append(random.choice(products))
    elif row.age=="Erwachsen" and row.emotions=="neutral":
        if random.random() < 0.2:
            neueSpalte.append("Immobilien, Bausparvertrag")
        else:
            neueSpalte.append(random.choice(products))
    elif row.age=="Erwachsen" and row.emotions=="sad":
        if random.random() < 0.2:
            neueSpalte.append("Hebel Zertifikate")
        else:
            neueSpalte.append(random.choice(products))
    elif row.age=="Erwachsen" and row.emotions=="surprise":
        if random.random() < 0.2:
            neueSpalte.append("NFT, Crypto")
        else:
            neueSpalte.append(random.choice(products))
    elif row.age=="Alt" and row.emotions=="angry":
        if random.random() < 0.2:
            neueSpalte.append("Privatkredit")
        else:
            neueSpalte.append(random.choice(products))
    elif row.age=="Alt" and row.emotions=="disgust":
        if random.random() < 0.2:
            neueSpalte.append("Staatsanleihen")
        else:
            neueSpalte.append(random.choice(products))
    elif row.age=="Alt" and row.emotions=="fear":
        if random.random() < 0.2:
            neueSpalte.append("Lebensversicherung")
        else:
            neueSpalte.append(random.choice(products))
    elif row.age=="Alt" and row.emotions=="happy":
        if random.random() < 0.2:
            neueSpalte.append("Immobilien")
        else:
            neueSpalte.append(random.choice(products))
    elif row.age=="Alt" and row.emotions=="neutral":
        if random.random() < 0.2:
            neueSpalte.append("Bausparvertrag, Aktien Sparplan")
        else:
            neueSpalte.append(random.choice(products))
    elif row.age=="Alt" and row.emotions=="sad":
        if random.random() < 0.2:
            neueSpalte.append("Kreditkarte")
        else:
            neueSpalte.append(random.choice(products))
    elif row.age=="Alt" and row.emotions=="surprise":
        if random.random() < 0.2:
            neueSpalte.append("Aktien Depot")
        else:
            neueSpalte.append(random.choice(products))
    else:
        neueSpalte.append("---")   
        
        
data["product"] = neueSpalte

# -

data

data_a_j=data[(data.age=="Jung") & (data.emotions=="angry")]
data_a_j.value_counts()


data.to_csv('./data.csv')
