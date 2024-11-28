import {Option} from "@/core/formik/types/options";
import Autocomplete, {AutocompleteProps} from "@/core/mui/Autocomplete";
import {useFormikContext} from "formik";

export type FormikAutocompleteFieldProps<OptionType extends Option = Option> = {
  label: string;
  name: string;
  helperText?: string;
  loading: boolean;
  optionsMap?: Map<OptionType["value"], OptionType>;
  onAddElementClick?: () => any;
} & Omit<AutocompleteProps<OptionType, any>, "renderInput">;

export default function FormikAsyncAutocompleteField<OptionType extends Option = Option>({
  name,
  helperText,
  ...props
}: FormikAutocompleteFieldProps<OptionType>) {
  const formik = useFormikContext<any>();

  return (
    <Autocomplete
      name={name}
      value={formik.values[name] || null}
      onChange={(value) => {
        // @ts-ignore
        formik.setValues((v: any) => ({...v, [name]: value}));
      }}
      disabled={formik.isSubmitting}
      helperText={helperText}
      {...props}
    />
  );
}
