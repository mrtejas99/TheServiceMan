
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, createSearchParams } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { getFilterMasterData } from '../datautils';

function SearchAdsBar() {
    const { t } = useTranslation("common");

    const [queryParams] = useSearchParams();
    const navigate = useNavigate();

    const search_query = queryParams.get('q') || "";

    const [searchOptions, setSearchOptions] = useState([]);

    //Temporary. Load from a cache or something later
    useEffect(() => {
        getFilterMasterData("adcategories", "category_name")
        .then(categories => setSearchOptions(categories))
    }, []);

    return (
        <div className="w-100">
            <ReactSearchAutocomplete
                items={searchOptions}
                inputSearchString={search_query}
                onSelect={item => navigate({
                    pathname: '/',
                    search: `?${createSearchParams({"q": item.category_name})}`
                })}
                onClear={() => navigate('/')}
                placeholder={t("search")}
                fuseOptions={{ keys: ["category_name"] }}
                resultStringKeyName="category_name"
            />
        </div>
    );
}

export { SearchAdsBar };