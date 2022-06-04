
import * as React from "react";

//Data elements for the resource
import {
	Datagrid,
	List,
	Show,
	Create,
	Edit,
	Filter,
	SimpleShowLayout,
	SimpleForm,
	ReferenceField,
	ReferenceInput,
	NumberField,
	NumberInput,
	TextField,
	TextInput,
	ShowButton,
	EditButton,
	DeleteButton,
	RichTextField,
	SelectInput,
	FileField,
	FileInput,
	DateField,
	DateInput
} from "react-admin";

import { RichTextInput } from "ra-input-rich-text";

import { RATING_MASTER, LANGUAGE_MASTER } from "../constants";

const ALL_RATINGS = RATING_MASTER.map(elem => ({"name": elem.rating_name, "id": elem.value}));
const ALL_LANGS = LANGUAGE_MASTER.map(elem => ({"name": elem.language_name, "id": elem.language_name}));

function AdFilter(props) {
	return (
		<Filter {...props}>
			<TextInput label="Title" source="title" alwaysOn />
			<TextInput label="Category" source="category" alwaysOn />
			<TextInput label="Language" source="language" />
		</Filter>
	);
}

function AdList(props) {
	return (
		<List {...props} filters={<AdFilter />}>
			<Datagrid>
				<ShowButton label="View" />
				<TextField label="Title" source="title" />
				<ReferenceField label="Posted by" source="email" reference="users">
					<TextField label="Posted by" source="email" />
				</ReferenceField>
				<DateField label="Posted on" source="posted_date" />
				<TextField label="Category" source="category" />
				<TextField label="Location" source="location" />
				<EditButton label="" />
				<DeleteButton label="" redirect={false} />
			</Datagrid>
		</List>
	);
}

function AdShow(props) {
	return (
		<Show {...props}>
			<SimpleShowLayout>
				<TextField source="id" />
				<TextField label="Title" source="title" />
				<ReferenceField label="Posted by" source="email" reference="users">
					<TextField label="Posted by" source="email" />
				</ReferenceField>
				<TextField label="Category" source="category" />
				<TextField label="Location" source="location" />
				<NumberField label="Latitude" source="latitude" />
				<NumberField label="Longitude" source="longitude" />
				<TextField label="Geohash" source="geohash" />
				<DateField label="Posted on" source="posted_date" />
				<RichTextField label="Description" source="description" />
				<TextField label="Language" source="language" />
			</SimpleShowLayout>
		</Show>
	);
}

function AdEdit(props) {
	return (
		<Edit {...props}>
			<SimpleForm>
				<TextInput label="Title" source="title" />
				<RichTextInput label="Description" source="description" />
				<TextInput label="Location" source="location" />
				<NumberInput label="Latitude" source="latitude" />
				<NumberInput label="Longitude" source="longitude" />
				<TextInput label="Geohash" source="geohash" />
				<SelectInput label="Language" source="language" choices={ALL_LANGS} />
				<SelectInput label="Rating" source="rating" choices={ALL_RATINGS} />
				<ReferenceInput
					label="Posted by"
					source="email"
					reference="users">
					<SelectInput label="Posted by" optionText="email" />
				</ReferenceInput>
				<DateInput source="posted_date" parse={val => new Date(val)} />
			</SimpleForm>
		</Edit>
	);
}

function AdCreate(props) {
	return (
		<Create {...props}>
			<SimpleForm>
				<TextInput label="Title" source="title" />
				<RichTextInput label="Description" source="description" />
				<TextInput label="Location" source="location" />
				<NumberInput label="Latitude" source="latitude" />
				<NumberInput label="Longitude" source="longitude" />
				<TextInput label="Geohash" source="geohash" />
				<SelectInput label="Language" source="language" choices={ALL_LANGS} />
				<SelectInput label="Rating" source="rating" choices={ALL_RATINGS} />
				<ReferenceInput
					label="Posted by"
					source="email"
					reference="users">
					<SelectInput label="Posted by" optionText="email" />
				</ReferenceInput>
				<DateInput source="posted_date" parse={val => new Date(val)} />
			</SimpleForm>
		</Create>
	);
}

export { AdList, AdShow, AdEdit, AdCreate };
