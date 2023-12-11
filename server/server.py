from flask import Flask, jsonify, request
from random import randint
from flask_cors import CORS, cross_origin
import spacy

app = Flask(__name__)
CORS(app, support_credentials=True)

nlp = spacy.load('en_core_web_sm')

@app.route('/api/location', methods=['GET'])
def location():
  # Call your function here and get the result
  result = [] 
  print("adhwaoudhwaodoiawjdioajdoiwajdiowaj")
  text = request.args.get('text')
  print(text)
  doc = nlp(text)
  
  for ent in doc.ents:
    if (ent.label_ == 'GPE'):
        result.append(ent.text)

  return result

if __name__ == "__main__":
    app.run(port=8000, debug=True)