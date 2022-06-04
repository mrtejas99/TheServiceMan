
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
	DateField
} from "react-admin";

import { RichTextInput } from "ra-input-rich-text";

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
				<TextField label="Category" source="category" />
				<TextField label="Location" source="location" />
				<NumberField label="Latitude" source="latitude" />
				<NumberField label="Longitude" source="longitude" />
				<TextField label="Geohash" source="geohash" />
				<DateField label="Posted" source="posted_date" />
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
				<TextField label="Category" source="category" />
				<TextField label="Location" source="location" />
				<NumberField label="Latitude" source="latitude" />
				<NumberField label="Longitude" source="longitude" />
				<TextField label="Geohash" source="geohash" />
				<DateField label="Posted" source="posted_date" />
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
				<TextInput label="Language" source="language" />
			</SimpleForm>
		</Create>
	);
}

export { AdList, AdShow, AdEdit, AdCreate };
