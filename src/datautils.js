
import { db } from "./firebase";
import { query, collection, getDocs, orderBy } from "firebase/firestore";
import geohash from "ngeohash";

//const geofire = require('geofire-common');

const getFilterMasterData = (colle, name_field) => (
    getDocs(query(
        collection(db, colle),
        //orderBy("popularity", 'desc'),
        orderBy(name_field, 'asc')
    ))
    .then(data => data.docs.map(element => element.data()))
);

const getGeohashRange = (position, distance) => {
    const [latitude, longitude] = position;
    const lat_per_mile = 0.0144927536231884; // degrees latitude per mile
    const lon_per_mile = 0.0181818181818182; // degrees longitude per mile

    const lowerLat = latitude - lat_per_mile * distance;
    const lowerLon = longitude - lon_per_mile * distance;

    const upperLat = latitude + lat_per_mile * distance;
    const upperLon = longitude + lon_per_mile * distance;

    const lower = geohash.encode(lowerLat, lowerLon);
    const upper = geohash.encode(upperLat, upperLon);

    return { lower, upper };
};

/*
const matchGeoHashAds = (snapshots, coordinate, proximity) => {
    const matchingDocs = [];

    for (const snap of snapshots) {
        for (const doc of snap.docs) {
            //Search in the 'latitude' and 'longitude' fields
            const lat = doc.get('latitude');
            const lng = doc.get('longitude');

            // We have to filter out a few false positives due to GeoHash
            // accuracy, but most will match
            const distanceInKm = geofire.distanceBetween([lat, lng], coordinate);
            const distanceInM = distanceInKm * 1000;
            if (distanceInM <= proximity)
                matchingDocs.push(doc);
        }
    }

    return matchingDocs;
};
*/

export { getFilterMasterData, getGeohashRange };
