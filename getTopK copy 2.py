import os
import sys
from dotenv import load_dotenv
import pandas as pd
import numpy as np
from pinecone import Pinecone
from openai import OpenAI

# songName = sys.argv[1]
songName = "Restless"

load_dotenv(dotenv_path='secrets.env')
api_key = os.environ['PINECONE_API_KEY']
environment = os.environ['PINECONE_ENVIRONMENT']
pinecone = Pinecone(api_key=api_key, environment=environment)
index_name = "cos-15"
pinecone_index = pinecone.Index(index_name)


song_data = pinecone_index.query(
    namespace="Tracks",
    top_k=1,
    filter={
        "track_name": {"$eq": songName}
    },
    include_metadata=True,
    include_values=True,
    vector=[0] * 15
)

values = song_data['matches'][0]['values']

topK = pinecone_index.query(
    namespace="Tracks",
    top_k=11,
    include_metadata=True,
    include_values=False,
    vector=values
)
topK = topK['matches'][1:]

matchSongNames = []
matchSongArtists = []
for match in topK:
    matchSongNames.append(match['metadata']['track_name'])
    matchSongArtists.append(match['metadata']['artists'])
