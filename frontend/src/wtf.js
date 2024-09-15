import { Pinecone } from '@pinecone-database/pinecone';
const pc = new Pinecone({
    apiKey: ''
}); 

const index = pc.index('cos-15');

const songName = "Restless"

export async function getSimilarSongs(songName) {
    const queryResponse1 = await index.query({
        namespace: "Tracks",
        vector: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        topK: 1,
        filter: {
            "track_name": {"$eq": songName}
        },
        includeMetadata: true,
        includeValues: true
    });

    const values = queryResponse1.matches[0].values;

    const queryResponse2 = await index.query({
        namespace: "Tracks",
        vector: values,
        topK: 11,
        includeMetadata: true,
        includeValues: false
    });

    const similarSongs = queryResponse2.matches.slice(1);
    const similarTrackNames = similarSongs.map(song => song.metadata.track_name);
    console.log('Similar track names:', similarTrackNames);

    console.log('Query response:', queryResponse1);

    return similarTrackNames;
}

// const queryResponse1 = await index.query({
//     namespace: "Tracks",
//     vector: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     topK: 1,
//     filter: {
//         "track_name": {"$eq": songName}
//     },
//     includeMetadata: true,
//     includeValues: true
// });

// const value = queryResponse1.matches[0].values;

// const queryResponse2 = await index.query({
//     namespace: "Tracks",
//     vector: value,
//     topK: 10,
//     includeMetadata: true,
//     includeValues: false
// });

// const similarSongs = queryResponse2.matches.slice(1);
// const similarTrackNames = similarSongs.map(song => song.metadata.track_name);
// console.log('Similar track names:', similarTrackNames);

// console.log('Query response:', queryResponse1);
