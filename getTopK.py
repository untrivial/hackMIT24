import os
from dotenv import load_dotenv
from flask_cors import CORS  # Import CORS

from flask import Flask, request, jsonify
from pinecone import Pinecone

app = Flask(__name__)
CORS(app)

load_dotenv(dotenv_path='secrets.env')
api_key = os.environ['PINECONE_API_KEY']
environment = os.environ['PINECONE_ENVIRONMENT']
pinecone = Pinecone(api_key=api_key, environment=environment)
index_name = "cos-15"
pinecone_index = pinecone.Index(index_name)


# @app.route('/get_similar_songs', methods=['POST'])
@app.route('/get_similar_songs', methods=['GET'])
def get_similar_songs():
    print("wts")
    song_name = request.args.get('song_name', '')

    if not song_name:
        return jsonify({"error": "No song name provided"}), 400

    song_data = pinecone_index.query(
        namespace="Tracks",
        top_k=1,
        filter={
            "track_name": {"$eq": song_name}
        },
        include_metadata=True,
        include_values=True,
        vector=[0] * 15
    )

    if not song_data['matches']:
        return jsonify({"error": "Song not found"}), 404

    values = song_data['matches'][0]['values']

    topK = pinecone_index.query(
        namespace="Tracks",
        top_k=11,
        include_metadata=True,
        include_values=False,
        vector=values
    )
    topK = topK['matches'][1:]

    similar_songs = []
    for match in topK:
        similar_songs.append({
            "track_name": match['metadata']['track_name'],
            "artists": match['metadata']['artists']
        })

    return jsonify({"similar_songs": similar_songs})

if __name__ == '__main__':
    app.run(debug=True)
