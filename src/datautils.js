
import { db } from "./firebase";
import { query, collection, getDocs, orderBy } from "firebase/firestore";

const getFilterMasterData = (colle, name_field) => (
    getDocs(query(
        collection(db, colle),
        //orderBy("popularity", 'desc'),
        orderBy(name_field, 'asc')
    ))
    .then(data => data.docs.map(element => element.data()))
);

export { getFilterMasterData };
