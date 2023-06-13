import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import {
  ClearIndicator,
  ClearIndicatorStyles,
  OptionTypes,
} from "./MultiSelectInputV2";

interface MultiSelectInputWithCreateProps {
  options: OptionTypes[];
  value?: OptionTypes[];
  onChange: (e: any) => void;
  placeholder?: string;
  onCreate: (e: any) => void;
  variant?: "filled" | "standard";
}
const MultiSelectInputWithCreate: React.FC<MultiSelectInputWithCreateProps> = (
  props
) => {
  const [options, setOptions] = useState<OptionTypes[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<OptionTypes[]>(props.value ?? []);

  useEffect(() => {
    setOptions(props.options);
  }, [props.options]);

  const handleCreate = (inputValue: string) => {
    const newOption: OptionTypes = {
      keyword: inputValue,
      label: inputValue,
      value: inputValue,
    };
    setIsLoading(true);
    setOptions((prevState) => [...(prevState ?? []), newOption]);
    setValue((prevState) => [...(prevState ?? []), newOption]);
    const newValue = [...(value ?? []), newOption];
    props.onCreate(newValue);
    setIsLoading(false);
  };

  const handleChange = (newValue: any) => {
    props.onChange(newValue);
    setValue(newValue);
  };

  const filledInputStyles = {
    background: "rgba(0, 0, 0, 0.06)",
    border: "none",
    borderBottom: "1px solid #333",
    borderBottomLeftRadius: "0",
    borderBottomRightRadius: "0",
  };

  const filteredFilledInputStyles =
    props.variant === "filled" ? filledInputStyles : null;
  return (
    <CreatableSelect
      isMulti
      options={options}
      placeholder={props.placeholder}
      onChange={handleChange}
      components={{ ClearIndicator }}
      isDisabled={isLoading}
      isLoading={isLoading}
      onCreateOption={handleCreate}
      value={value}
      styles={{
        clearIndicator: ClearIndicatorStyles,
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        control: (baseStyles, state) => ({
          ...baseStyles,
          ...filteredFilledInputStyles,
          fontSize: "13px",
          paddingTop: "5px",
          paddingBottom: "5px",
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          color: "rgba(0, 0, 0, 0.3)",
        }),
      }}
    />
  );
};

MultiSelectInputWithCreate.defaultProps = {
  variant: "standard",
};

export default MultiSelectInputWithCreate;
