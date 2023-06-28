import React, { SetStateAction, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import "./MultiSelectInput.scss";
import { GroupBase, StylesConfig } from "react-select";

export type MultiSelectInputType = {
  label: string;
  value: string;
};
interface OptionType {
  name?: string;
  onChange: (e?: any) => void;
  onCreate: (e?: any) => void;
  value: SetStateAction<MultiSelectInputType | undefined>;
  styles?:
    | StylesConfig<MultiSelectInputType, true, GroupBase<MultiSelectInputType>>
    | undefined;
  error?: boolean;
}

const metaTagsData = [
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
const tagsData = [
  {
    label: "Tag Sample 1",
    value: "tag sample 1",
    keyword: "tag sample 1",
  },
  {
    label: "Tag Sample 2",
    value: "tag sample 2",
    keyword: "tag sample 2",
  },
];

const MultiSelectInput: React.FC<OptionType> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(
    props.name === "metaTagKeywords" ? metaTagsData : tagsData
  );
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
      setValue((prev: any) => [...prev, newOption] as any);

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
        styles={
          props.styles ?? {
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            control: (baseStyles, state) => ({
              ...baseStyles,
              fontSize: "13px",
              paddingTop: "5px",
              paddingBottom: "5px",
              borderColor: props.error ? "#d32f2f" : "hsl(0, 0%, 80%)",
            }),
          }
        }
      />
    </div>
  );
};

export default MultiSelectInput;
