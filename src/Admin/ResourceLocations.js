
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
	TextField,
	TextInput,
	NumberField,
	NumberInput,
	ShowButton,
	EditButton,
	DeleteButton,
	RichTextField,
	SelectInput,
	FileField,
	FileInput
} from "react-admin";

//import RichTextInput from "ra-input-rich-text";

function LocFilter(props) {
	return (
		<Filter {...props}>
			<NumberInput label="Search Latitude" source="latitude" alwaysOn />
			<NumberInput label="Search Longitude" source="longitude" alwaysOn />
			<TextInput label="Location Name" source="location_name" alwaysOn />
			<TextInput label="Search Geohash" source="geohash" alwaysOn />
		</Filter>
	);
}

function LocList(props) {
	return (
		<List {...props} filters={<LocFilter />}>
			<Datagrid>
				<ShowButton label="View" />
				<NumberField label="Latitude" source="latitude" />
				<NumberField label="Logitude" source="longitude" />
				<TextField label="Location Name" source="location_name" />
				<TextField label="Geohash" source="geohash" />
				<EditButton label="" />
				<DeleteButton label="" redirect={false} />
			</Datagrid>
		</List>
	);
}

function LocShow(props) {
	return (
		<Show {...props}>
			<SimpleShowLayout>
				<TextField source="id" />
				<NumberField label="Latitude" source="latitude" />
				<NumberField label="Logitude" source="longitude" />
				<TextField label="Location Name" source="location_name" />
				<TextField label="Geohash" source="geohash" />
			</SimpleShowLayout>
		</Show>
	);
}

function LocEdit(props) {
	return (
		<Edit {...props}>
			<SimpleForm>
				<NumberInput label="Latitude" source="latitude" alwaysOn />
				<NumberInput label="Longitude" source="longitude" alwaysOn />
				<TextInput label="Location Name" source="location_name" alwaysOn />
				<TextInput label="Geohash" source="geohash" alwaysOn />
			</SimpleForm>
		</Edit>
	);
}

function LocCreate(props) {
	return (
		<Create {...props} >
			<SimpleForm>
				<NumberInput label="Latitude" source="latitude" alwaysOn />
				<NumberInput label="Longitude" source="longitude" alwaysOn />
				<TextInput label="Location Name" source="location_name" alwaysOn />
				<TextInput label="Geohash" source="geohash" alwaysOn />
			</SimpleForm>
		</Create>
	);
}

export { LocList, LocShow, LocEdit, LocCreate };
