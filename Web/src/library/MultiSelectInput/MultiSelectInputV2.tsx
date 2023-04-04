import React, { SetStateAction, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable/dist/react-select-creatable.cjs";
import "./MultiSelectInput.scss";
import { metaTagsData, tagsData } from "data/blogs";

export type MultiSelectInputType = {
    label: string;
    value: string;
};

interface IOptions {
    label: string,
    value: string,
    keyword: string,
}
interface OptionType {
    name?: string;
    onChange: (e?: any) => void;
    onCreate: (e?: any) => void;
    value: SetStateAction<MultiSelectInputType | undefined>;
}

export const langOptions = [
    {
        label: "Meta Tag Sample 1",
        value: "meta tag value 1",
        keyword: "meta tag value 1",
    },
    {
        label: "Meta Tag Sample 2",
        value: "meta tag value 2",
        keyword: "meta tag value 2",
    },
    {
        label: "Meta Tag Sample 3",
        value: "meta tag value 3",
        keyword: "meta tag value 3",
    },
];
const MultiSelectInput: React.FC<OptionType> = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState<IOptions[]>(langOptions);
    const [value, setValue] = useState<MultiSelectInputType>();

    const handleCreate = (inputValue: string) => {
        setIsLoading(true);
        setTimeout(() => {
            const newOption = {
                label: inputValue,
                value: inputValue,
                keyword: inputValue,
            };
            setIsLoading(false);
            setOptions((prev) => [...prev, newOption as any]);
            setValue((prev: any) => [...prev, inputValue] as any);

            const data = [...(value as any), newOption];
            props.onCreate(data);
        }, 1000);
    };

    const onChangeHandler = (newValue: any) => {
        props.onChange(newValue);
        setValue(newValue);
    };

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    return (
        <div className="creatable-select-container">
            <CreatableSelect
                placeholder={
                    props.name === "metaTagKeywords" ? "Meta Tag Keywords" : "Blog Tags"
                }
                isClearable
                isMulti
                name={props.name}
                isDisabled={isLoading}
                isLoading={isLoading}
                onChange={onChangeHandler}
                onCreateOption={handleCreate}
                options={options}
                value={value}
                className="multi-select-input"
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        fontSize: "15px",
                        border: state.isFocused ? "none" : "none",
                        outline: "none",
                        boxShadow: "none",
                        borderBottom: state.isFocused
                            ? "2px solid #1976d2"
                            : "1px solid gray",
                        backgroundColor: state.isFocused
                            ? "rgba(0, 0, 0, 0.03)"
                            : "rgba(0, 0, 0, 0.06)",
                    }),
                }}
            />
        </div>
    );
};

export default MultiSelectInput;
