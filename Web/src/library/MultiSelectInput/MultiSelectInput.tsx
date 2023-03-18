import React, { SetStateAction, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable/dist/react-select-creatable.cjs";
import "./MultiSelectInput.scss";

export type MultiSelectInputType = {
  label: string;
  value: string;
};
interface OptionType {
  name?: string;
  onChange: (e?: any) => void;
  onCreate: (e?: any) => void;
  value: SetStateAction<MultiSelectInputType | undefined>;
}

const optionData = [
  {
    label: "test0",
    value: "test value0",
    keyword: "test",
  },
  {
    label: "test1",
    value: "test value2",
    keyword: "test2",
  },
];
const MultiSelectInput: React.FC<OptionType> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(optionData);
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
    <div>
      <CreatableSelect
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
          }),
        }}
      />
    </div>
  );
};

export default MultiSelectInput;
