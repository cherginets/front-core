import {Option} from "@/core/formik/types/options";
import {Add} from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
  Stack,
} from "@mui/material";
import TextField, {TextFieldProps} from "@mui/material/TextField";
import {Fragment, useMemo} from "react";

export type AutocompleteProps<OptionType extends Option = Option, Multiple extends boolean | undefined = false> = {
  label: string;
  name: string;
  placeholder?: string;
  loading?: boolean;
  multiple?: Multiple;
  optionsMap?: Map<OptionType["value"], OptionType>;
  onAddElementClick?: () => any;
  textFieldProps?: TextFieldProps;
  value?: string | number | null | undefined
  onChange?: (value: Multiple extends true ? OptionType["value"][] : OptionType["value"]) => any;
} & Omit<MuiAutocompleteProps<OptionType, Multiple, any, any>, "renderInput" | "value">;

export default function AutocompleteField<
  OptionType extends Option = Option,
  Multiple extends boolean | undefined = boolean,
>({
  value: _value,
  name,
  label,
                                             placeholder,
  loading = false,
  multiple,
  options,
  optionsMap: _optionsMap,
  onAddElementClick,
  onChange,
  textFieldProps = {},
  ...props
}: AutocompleteProps<OptionType, Multiple>) {
  const optionsMap = useMemo(() => _optionsMap || new Map(options.map((o) => [o.value, o])), [_optionsMap, options]);
  const value = _value || (multiple ? _value || [] : null);

  return (
    <MuiAutocomplete<OptionType, Multiple>
      options={options}
      // @ts-ignore
      value={value}
      // @ts-ignore
      getOptionLabel={(option) => {
        if (option?.label) return option.label;
        // @ts-ignore
        return optionsMap.get(option?.value || option)?.label || null;
      }}
      getOptionKey={(option) => option.value}
      isOptionEqualToValue={(option, value) => {
        // @ts-ignore
        if (option.value === value) return true;

        if (typeof option === "object" && typeof value === "object" && "value" in option && "value" in value) {
          return option.value === value.value;
        }

        return false;
      }}
      onChange={(event, value, reason, details) => {
        if (onChange) {
          console.log("value", value);
          var newValue = !multiple
            ? value !== null &&
              // @ts-ignore
              "value" in value
              ? value.value
              : null
            : // @ts-ignore
              value.map((option) => (typeof option === "object" ? option.value : option));

          onChange(newValue);
        }
      }}
      multiple={multiple}
      // slotProps={{}}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          name={name}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                <Stack direction={"row"} spacing={2}>
                  {params.InputProps.endAdornment}
                  {!!onAddElementClick && (
                    <IconButton size={"small"} color={"primary"} onClick={onAddElementClick}>
                      <Add />
                    </IconButton>
                  )}
                </Stack>
              </Fragment>
            ),
          }}
          {...textFieldProps}
        />
      )}
      {...props}
    />
  );
}
