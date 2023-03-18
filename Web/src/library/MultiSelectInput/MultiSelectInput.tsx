import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { blogMetaTags, createOption } from "data/blogs";

interface OptionType {
  label?: string;
  value?: any;
  name?: string;
  onChange?: any;
}

const MultiSelectInput: React.FC<OptionType> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(blogMetaTags);
  const [value, setValue] = useState<any>();

  const handleCreate = (inputValue: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setOptions((prev) => [...prev, newOption as any]);
      setValue((prev: any) => [...prev, newOption as any]);
      console.log(newOption, options, value);
    }, 1000);
  };

  console.log(value);
  return (
    <div>
      <CreatableSelect
        isClearable
        isMulti
        name={props.name}
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={(newValue) => setValue(newValue)}
        onCreateOption={handleCreate}
        options={options}
        value={value}
      />
    </div>
  );
};

export default MultiSelectInput;
