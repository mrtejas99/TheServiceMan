
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
	ShowButton,
	EditButton,
	DeleteButton,
	RichTextField,
	SelectInput,
	FileField,
	FileInput
} from "react-admin";

//import RichTextInput from "ra-input-rich-text";

function CatFilter(props) {
	return (
		<Filter {...props}>
			<TextInput label="Search Category" source="category_name" alwaysOn />
		</Filter>
	);
}

function CatList(props) {
	return (
		<List {...props} filters={<CatFilter />}>
			<Datagrid>
				<ShowButton label="View" />
				<TextField label="Category Name" source="category_name" />
				<TextField label="Popularity" source="popularity" />
				<EditButton label="" />
				<DeleteButton label="" redirect={false} />
			</Datagrid>
		</List>
	);
}

function CatShow(props) {
	return (
		<Show {...props}>
			<SimpleShowLayout>
				<TextField source="id" />
				<TextField label="Category Name" source="category_name" />
				<TextField label="Popularity" source="popularity" />
			</SimpleShowLayout>
		</Show>
	);
}

function CatEdit(props) {
	return (
		<Edit {...props}>
			<SimpleForm>
				<TextField label="Category Name" source="category_name" />
				<TextField label="Popularity" source="popularity" />
			</SimpleForm>
		</Edit>
	);
}

export { CatList, CatShow, CatEdit };
