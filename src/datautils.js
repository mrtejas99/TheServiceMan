
import { db } from "./firebase";
import { query, collection, getDocs, orderBy } from "firebase/firestore";
const geofire = require('geofire-common');

const getFilterMasterData = (colle, name_field) => (
    getDocs(query(
        collection(db, colle),
        //orderBy("popularity", 'desc'),
        orderBy(name_field, 'asc')
    ))
    .then(data => data.docs.map(element => element.data()))
);

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

export { getFilterMasterData, matchGeoHashAds };
