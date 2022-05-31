
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

function UserFilter(props) {
	return (
		<Filter {...props}>
			<TextInput label="Search Email" source="email" alwaysOn />
			<TextInput label="Search Name" source="fname" alwaysOn />
		</Filter>
	);
}

function UserList(props) {
	return (
		<List {...props} filters={<UserFilter />}>
			<Datagrid>
				<ShowButton label="View" />
				<TextField label="Email" source="email" />
				<TextField label="First name" source="fname" />
				<TextField label="Last name" source="lname" />
				<EditButton label="" />
				<DeleteButton label="" redirect={false} />
			</Datagrid>
		</List>
	);
}

function UserShow(props) {
	return (
		<Show {...props}>
			<SimpleShowLayout>
				<TextField source="id" />
				<TextField label="Email" source="email" />
				<TextField label="First name" source="fname" />
				<TextField label="Last name" source="lname" />
			</SimpleShowLayout>
		</Show>
	);
}

function UserEdit(props) {
	return (
		<Edit {...props}>
			<SimpleForm>
				<TextInput label="First name" source="fname" />
				<TextInput label="Last name" source="lname" />
			</SimpleForm>
		</Edit>
	);
}

export { UserList, UserShow, UserEdit };
