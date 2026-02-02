import {type FieldValues, useController, type UseControllerProps} from "react-hook-form";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, type SelectProps} from "@mui/material";

type Option = {
  label: string;
  value: string;
}

type Props<T extends FieldValues> = {
  label: string;
  options: Option[];
} & UseControllerProps<T> & SelectProps;

const SelectInput = <T extends FieldValues>(props: Props<T>) => {
  const {field, fieldState: {error}} = useController({...props});

  return (
    <FormControl fullWidth error={!!error}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={field.value || ''}
        label={props.label}
        onChange={field.onChange}
      >
        {props.options.map(option => (
          <MenuItem
            key={option.value}
            value={option.value}
          >{option.label}</MenuItem>
        ))}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};

export default SelectInput;
