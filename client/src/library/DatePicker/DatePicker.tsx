import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";

interface DatePickerFieldProps {
	name: string;
	[key: string]: any;
}

const DatePickerField: React.FC<DatePickerFieldProps> = (props) => {
	const { setFieldValue } = useFormikContext();
	const [field] = useField(props.name);

	return (
		<DatePicker
			{...field}
			{...props}
			selected={(field.value && new Date(field.value)) || null}
			onChange={(val: any) => {
				setFieldValue(props.name, val);
			}}
		/>
	);
};

export default DatePickerField;
