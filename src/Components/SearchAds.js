
import React from 'react';
import { Form, FormControl, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

import { useTranslation } from "react-i18next";

function SearchAdsBar() {
    const { t } = useTranslation("common");

    const [queryParams] = useSearchParams();
    const search_query = queryParams.get('q') || "";

    return (
        <Form className="d-flex w-100 px-5" action="/">
            <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                name="q"
                defaultValue={search_query}
            />
            <Button variant="outline-success" type="submit">{t('search')}</Button>
        </Form>
    );
}

export { SearchAdsBar };