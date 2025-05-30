import { Close } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import IconButton from "../mui/IconButton";
import {Box, MenuItem, Paper} from "@mui/material";
import {Preloader} from "@/core/components/Preloader";
import {useCallback, useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import useOutsideClick from "@/core/utils/useOutsideClick";

export default function MuiLayoutSearch({onClose, useLazySearchQuery}: {onClose: () => any, useLazySearchQuery: any}) {
  const [searchValue, setSearchValue] = useState("");
  const {push} = useRouter();

  const [search, {data: options = [], isLoading, isFetching}] = useLazySearchQuery();

  const loading = isLoading || isFetching;

  const [open, setOpen] = useState(false);

  const handleChange = useCallback((e: any) => {
    setSearchValue(e.target.value);
    setOpen(true);
  }, []);

  const menuRef = useRef(null);

  useOutsideClick(menuRef, () => {
    setOpen(false);
  });

  useEffect(() => {
    if (searchValue || searchValue?.length > 0) {
      search(searchValue)
    }
  }, [searchValue, search])

  return (
    <Box
      style={{
        position: "relative",
        width: "100%",
        flexGrow: 1,
      }}
    >
      <TextField
        variant={"outlined"}
        style={{background: "white"}}
        color={"primary"}
        onChange={handleChange}
        autoComplete={'off'}
        fullWidth
        size={'small'}
        placeholder={'Поиск по админке, введите что-нибудь...'}
        autoFocus
        slotProps={{
          input: {
            endAdornment: <IconButton title={'Закрыть'} size={'small'} onClick={onClose}><Close /></IconButton>
          }
        }}
      />
      {open && (
        <Box style={{position: "absolute", top: "100%", left: 0, right: 0}}>
          <Paper style={{marginTop: 8}} ref={menuRef as any}>
            {loading ? (
              <Preloader />
            ) : options.length > 0 ? (
              <div className={"flex flex-col"}>
                {options.map((hint: any, i: number) => (
                  <MenuItem
                    key={i}
                    onClick={() => {
                      push(hint.value);
                      setOpen(false);
                      onClose();
                    }}
                  >
                    {hint.label}
                  </MenuItem>
                ))}
              </div>
            ) : (
              <span className={'p-3 flex items-center text-gray-500'}>Ничего не найдено</span>
            )}
          </Paper>
        </Box>
      )}
    </Box>
  );
}