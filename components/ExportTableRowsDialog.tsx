"use client";
import {copyToClipboard} from "@/core/components/CopyToClipboard/clipboard";
import {n_error, n_success} from "@/core/features/notifications";
import {download} from "@/core/utils/download";
import {formatCount} from "@/core/utils/formatCount";
import {Button, Dialog, DialogTitle, Stack, TextField, Typography} from "@mui/material";
import moment from "moment";
import React, {useCallback, useMemo, useState} from "react";
import {useLocalStorage} from "usehooks-ts";

interface Props {
  rows: any[];
  attributes: Record<
    string,
    {
      getter: (row: any) => string;
    }
  >;
  defaultFormat: string;
  fastFormats: string[];
  onClose: () => any;
  isDisable?: boolean;
  storageKey?: string;
  exportFileName?: string;
}

export const ExportTableRowsDialog = ({
  onClose,
  rows,
  isDisable = false,
  attributes,
  defaultFormat,
  fastFormats,
  storageKey = "export-format",
  exportFileName = "data",
}: Props) => {
  const [savedFormat, setSavedFormat] = useLocalStorage(storageKey, defaultFormat);
  const [format, setFormat] = useState(savedFormat);
  const [error, setError] = useState("");

  const getTextData = useMemo(() => {
    return (rows: any[]) => {
      const attributeRegex = /\{(\w+)\}/g;

      let match;
      const formatParts: {key?: string; separator?: string}[] = [];
      let lastIndex = 0;

      while ((match = attributeRegex.exec(format)) !== null) {
        if (match.index > lastIndex) {
          formatParts.push({separator: format.slice(lastIndex, match.index)});
        }
        formatParts.push({key: match[1]});
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < format.length) {
        formatParts.push({separator: format.slice(lastIndex)});
      }

      return rows
        .map((row) => {
          return formatParts
            .map(({key, separator}) => {
              if (separator) return separator;
              if (key && attributes[key]) return attributes[key].getter(row);
              return "";
            })
            .join("");
        })
        .join("\n");
    };
  }, [format, attributes]);

  const exportHandler = useCallback(() => {
    const text = getTextData(rows);
    download(`${exportFileName}-${moment(new Date()).format("YYYY-MM-DD-HH-mm-ss")}.txt`, text);
    setSavedFormat(format);
    onClose();
  }, [getTextData, rows, format, exportFileName, onClose]);

  const copyToClipboardHandler = useCallback(() => {
    const text = getTextData(rows);
    copyToClipboard({value: text})
      .then(() => {
        setSavedFormat(format);
        onClose();
        n_success("Скопировано в буфер обмена");
      })
      .catch(() => {
        n_error("Ошибка при копировании в буфер обмена");
      });
  }, [getTextData, rows, format, onClose]);

  const changeInputFormatHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormat(value);

    if (value === "") {
      setError("Не может быть пустым");
      return;
    }

    const attributeRegex = /\{([^}]+)?\}/g;
    let match;
    const usedAttributes = new Set<string>();

    while ((match = attributeRegex.exec(value)) !== null) {
      const attrName = match[1];

      if (attrName === undefined || attrName.trim() === "") {
        setError(`Атрибут {} не найден`);
        return;
      }

      if (!attributes[attrName]) {
        setError(`Атрибут {${attrName}} не найден`);
        return;
      }
      usedAttributes.add(attrName);
    }

    if ((value.match(/{/g) || []).length !== (value.match(/}/g) || []).length) {
      setError("Не валиден");
      return;
    }

    if (usedAttributes.size === 0) {
      setError("Не указано ни одного атрибута");
      return;
    }

    setError("");
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle sx={{padding: "0px", textAlign: "center"}}>Укажите формат</DialogTitle>
      <Stack width={450} sx={{padding: "12px"}} gap={"12px"}>
        <Typography>
          Экспорт <strong>{formatCount(rows.length || 0, "0 шт.")}</strong> прокси
        </Typography>

        <Stack>
          <TextField
            id="outlined-basic"
            label="Формат"
            variant="outlined"
            multiline
            value={format}
            onChange={changeInputFormatHandler}
            sx={{marginBottom: "9px"}}
          />
          <Typography color={"error"}>{error}</Typography>

          <Typography fontWeight={"bold"} sx={{marginBottom: "12px"}}>
            Нажмите, чтобы дополнить значение формата
          </Typography>
          <Stack flexWrap={"wrap"} direction={"row"} sx={{marginBottom: "12px"}}>
            {Object.entries(attributes).map(([key]) => {
              const isInFormat = format.includes(`{${key}}`);

              return (
                <Button
                  key={key}
                  sx={{paddingInline: "3px", minWidth: "12px"}}
                  variant={isInFormat ? "outlined" : "text"}
                  disabled={isInFormat}
                  onClick={() => {
                    setError("");
                    if (!isInFormat) {
                      setFormat((prev) => prev + (prev ? ":" : "") + `{${key}}`);
                    }
                  }}
                >
                  {key}
                </Button>
              );
            })}
          </Stack>

          {fastFormats && fastFormats?.length > 0 && (
            <>
              <Typography fontWeight={"bold"} sx={{marginBottom: "12px"}}>
                Или выберите готовый
              </Typography>
              <Stack gap={"2px"} alignItems={"start"}>
                {fastFormats.map((format, index) => (
                  <Button
                    key={index}
                    variant={"text"}
                    onClick={() => {
                      setFormat(format);
                    }}
                  >
                    {format}
                  </Button>
                ))}
              </Stack>
            </>
          )}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button onClick={onClose}>Отмена</Button>

          <Stack direction={"row"} gap={"2px"}>
            <Button
              onClick={copyToClipboardHandler}
              disabled={isDisable || error !== ""}
              color={"success"}
              variant={"contained"}
            >
              Копировать
            </Button>
            <Button
              onClick={exportHandler}
              disabled={isDisable || error !== ""}
              color={"primary"}
              variant={"contained"}
            >
              Экспорт
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
};
