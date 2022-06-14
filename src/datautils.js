
import { db } from "./firebase";
import { query, collection, getDocs, orderBy } from "firebase/firestore";
import { geohashQueryBounds } from "geofire-common";

const getFilterMasterData = (colle, name_field) => (
    getDocs(query(
        collection(db, colle),
        //orderBy("popularity", 'desc'),
        orderBy(name_field, 'asc')
    ))
    .then(data => data.docs.map(element => element.data()))
);

const getGeohashRange = (position, distance) => {
    const geoBounds = geohashQueryBounds(position, distance).flat();
    const [ lower, upper ] = [geoBounds.at(0), geoBounds.at(-1)];
    return { lower, upper };
};

export { getFilterMasterData, getGeohashRange };
