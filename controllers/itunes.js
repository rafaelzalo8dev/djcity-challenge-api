import fetch from "node-fetch";

export const search = (filter) => {
    return new Promise((resolve, reject) => {
        fetch(`https://itunes.apple.com/search?term=${filter}&limit=20&entity=song`)
        .then((res) => res.json())
        .then((results) => {
            resolve(results);
        })
        .catch(err => {
            reject(`Error while fetching itunes API ${err}`);
        });
        
    });
};

