import { CSSObject } from "@emotion/styled";
import classNames from "classnames";
import React, { CSSProperties, useEffect, useState } from "react";
import Select, { ClearIndicatorProps } from "react-select";

export type OptionTypes = {
  label: string;
  value: string;
  keyword: string;
};
export interface MultiSelectInputProps {
  closeMenuOnSelect: boolean | undefined;
  options: OptionTypes[];
  onChange: (e: any) => void;
  placeholder?: string;
  error: boolean;
  variant?: "filled" | "standard";
  value?: OptionTypes[];
  onBlur?: any;
  disabled?: boolean;
}

const CustomClearText: React.FC = () => (
  <React.Fragment>Clear All</React.Fragment>
);
export const ClearIndicator = (
  props: ClearIndicatorProps<OptionTypes, true>
) => {
  const {
    children = <CustomClearText />,
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles("clearIndicator", props) as CSSProperties}
    >
      <div style={{ padding: "0px 5px" }}>{children}</div>
    </div>
  );
};
export const ClearIndicatorStyles = (
  base: CSSObject,
  state: ClearIndicatorProps<OptionTypes>
): CSSObject => ({
  ...base,
  cursor: "pointer",
  color: state.isFocused ? "blue" : "black",
});

const MultiSelectInput: React.FC<MultiSelectInputProps> = (props) => {
  const [options, setOptions] = useState<OptionTypes[]>();

  useEffect(() => {
    setOptions(props.options);
  }, [props.options]);

  const filledInputStyles = {
    background: "rgba(0, 0, 0, 0.06)",
    border: "none",
    borderBottom: props.error ? "1px solid #d32f2f" : "1px solid #333",
    borderBottomLeftRadius: "0",
    borderBottomRightRadius: "0",
  };

  const filteredFilledInputStyles =
    props.variant === "filled" ? filledInputStyles : null;

  return (
    <Select
      closeMenuOnSelect={props.closeMenuOnSelect}
      onBlur={props.onBlur}
      // components={{ ClearIndicator }}
      isDisabled={props.disabled}
      styles={{
        clearIndicator: ClearIndicatorStyles,
        placeholder: (defaultStyles) => {
          return {
            ...defaultStyles,
            color: "rgba(0, 0, 0, 0.3)",
            zIndex: 0,
          };
        },

        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        control: (baseStyles, state) => {
          return {
            ...baseStyles,
            ...filteredFilledInputStyles,
            fontSize: "13px",
            paddingTop: "5px",
            paddingBottom: "5px",
            borderColor: props.error ? "#d32f2f" : "hsl(0, 0%, 80%)",
            cursor: props.disabled ? "not-allowed" : "auto",
          };
        },
      }}
      isMulti
      options={options}
      onChange={props.onChange}
      placeholder={props.placeholder}
      value={props.value}
    />
  );
};

MultiSelectInput.defaultProps = {
  variant: "standard",
};

export default MultiSelectInput;
