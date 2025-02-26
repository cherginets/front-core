import {FormControl, FormHelperText} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import {FC, useMemo, useRef} from "react";

const JoditEditor = dynamic(() => import("jodit-react"), {ssr: false});

export type MuiWysiwygProps = {
  value: string;
  onChange: (value: string) => any;
  error?: boolean;
  label?: string;
  helperText?: string;
};

const MuiWysiwyg: FC<MuiWysiwygProps> = ({label, value, onChange, helperText, error}) => {
  const editorRef = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/doc/,
      placeholder: "Просто начните писать текст...",
      iframe: true,
      iframeStyle: "body { font-family: Arial, sans-serif; font-size: 16px;,  }", // Стили в iframe
      height: "auto",
    }),
    []
  );

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <FormControl error={error}>
        {label && (
          <Typography variant={"caption"} color={error ? "error" : "black"}>
            {label}
          </Typography>
        )}
        <JoditEditor
          ref={editorRef}
          className={"prose"}
          value={value}
          config={config}
          onBlur={onChange} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {}}
        />
      </FormControl>
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </Box>
  );
};

export default MuiWysiwyg;
