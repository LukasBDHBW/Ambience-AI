# Ambience-AI
Projekt für eine Webapp, die unter Nutzung von Emotions- und Alterserkennung geeignete Bankprodukte anhand eines Bildes empfiehlt

# Aufbau des Github Repositories
Das Repository gliedert sich in drei Hauptordner: Architektur, Frontend Design Konzept und Modell Konzeption.

__Der gesamte für die lauffähige Applikation benötigte Code befindet sich im Architektur Ordner.__
Die dort vorliegende Struktur ist so auch auf Pythonanywhere gehostet (nur bis 15.02.23).

In den beiden anderen Ordnern finden sich Vorarbeiten, deren Ergebnisse im Entwicklungsprozess in die App integriert wurden. Der Ordner "Modell Konzeption" stellt die Schritte bis zur Integration übersichtlich dar und macht die Hintergründe des Bayesian Modells und des zugehörigen Datensatzes transparent und nachvollziebar.

Der Architekturordner selbst enthält die Pythondatei, die die Flask App ausmacht (backend_api.py) sowie die HTML Dateien im Ordner templateFiles. Im Ordner staticFiles liegen neben CSS Dateien auch Graphiken und die Modelle.
__Alters- und Emotionsmodell sind jedoch zu groß für GitHub, sodass diese manuell eingefügt werden müssen. Das Emotionsmodell kann einfach in den staticFiles Ordner kopiert werden, das Altersmodell in den Age-Model Ordner. Wenn dann noch alle notwendigen Packete installiert sind (entweder über pip oder über conda mit den requirements.txt) kann die App lokal durch Ausführung des Befehls "flask --app backend_api run" im Architektur Ordner gestartet werden.__

__Wichtige Hinweise zum grundlegenden Aufbau des Frontends finden sich in der Main.html sowie der Main.css.__






# Übersicht über wichtige Befehle
# Spec List
Speichern der Enviroment-Spezifikationen in einer Datei:

conda list --explicit > spec-list.txt

Erstellung des Environments:

conda create --name fallstudie --file spec-list.txt

# Git Befehle
git pull
git stage * (eventuell)
git commit -m "blablabla"
git push