import {FC} from "react";
import {useMemo} from 'react';
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import {FormControl, FormHelperText} from "@mui/material";
import Typography from "@mui/material/Typography";

const JoditEditor = dynamic(() => import('jodit-react'), {ssr: false,});

export type MuiWysiwygProps = {
  value: string,
  onChange: (value: string) => any
  error?: boolean
  label?: string
  helperText?: string
};

const MuiWysiwyg: FC<MuiWysiwygProps> = ({
                                           label,
                                           value,
                                           onChange,
                                           helperText,
                                           error,
                                         }) => {
  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/doc/,
    placeholder: 'Просто начните писать текст...'
  }), [])

  return (<Box display={'flex'} flexDirection={'column'}>
    <FormControl error={error}>
      {label && <Typography variant={'caption'} color={error ? 'error' : 'black'}>{label}</Typography>}
      <JoditEditor
        value={value}
        config={config as any}
        onBlur={onChange} // preferred to use only this option to update the content for performance reasons
        onChange={newContent => {}}
      />
    </FormControl>
    {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
  </Box>);
}

export default MuiWysiwyg;