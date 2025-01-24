import MuiWysiwyg from "@/core/components/MuiWysiwyg";
import {TextFieldProps} from "@mui/material";
import {useFormikContext} from "formik";

export default function FormikWysiwyg(props: Omit<TextFieldProps, 'name'> & {name: string}) {
    const formik = useFormikContext<any>();

    return <MuiWysiwyg
        value={formik.values[props.name]}
        // @ts-ignore
        onChange={(value) => formik.setFieldValue(props.name, value as string)}
        error={formik.touched[props.name] && Boolean(formik.errors[props.name])}
        helperText={(formik.touched[props.name] && formik.errors[props.name]) as any}
        margin={'normal'}
        variant={'standard'}
        fullWidth
        {...props}
    />
}
