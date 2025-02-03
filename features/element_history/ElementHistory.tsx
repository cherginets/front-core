import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Add, Close, Send} from "@mui/icons-material";
import {Switch, TextareaAutosize} from "@mui/material";
import {useMemo, useState} from "react";
import {CheckboxWithLabel} from "formik-mui";
import FormControlLabel from "@mui/material/FormControlLabel";
import {useLocalStorage} from "usehooks-ts";
import {randomBool} from "@/core/utils/random";

export type ElementHistoryProps = {
  title?: string;
  element_type: string
  element_id: string | number
};

const ElementHistory = ({title, element_type, element_id}: ElementHistoryProps) => {
  const rows = new Array(10).fill(null)


  const [adding, setAdding] = useState(false);
  const [showContext, setShowContext] = useLocalStorage(`history_showContext-[${element_type}]`, true);
  const [newComment, setNewComment] = useState('');

  return <div className={'flex flex-col'}>
    {title && <div className={'text-2xl font-bold mb-4'}>{title}</div>}

    <div className={'flex flex-row items-center justify-between max-sm:flex-col max-sm:items-start max-md:gap-2 max-md:mb-2'}>
      <FormControlLabel label={`Показывать контекст`} onChange={(e, checked) => setShowContext(sc => !sc)} control={<Switch checked={showContext} />} />
      {!adding
        ? <Button startIcon={<Add/>} variant={'outlined'} onClick={() => setAdding(a => !a)}>Добавить комментарий</Button>
        : <Button startIcon={<Close/>} onClick={() => {
          setAdding(a => !a)
          setNewComment("")
        }} color={'error'}>Отменить комментарий</Button>}
    </div>

    {adding && <div className={'flex my-2'}>
      <TextareaAutosize
        autoFocus placeholder={'Введите текст комментария'}
        value={newComment} onChange={e => setNewComment(e.target.value)}
                        className={'!grow border outline-none p-2'}/>
      <Button className={'!ml-4'} variant={'outlined'} endIcon={<Send/>}>Отправить</Button>
    </div>}

    <div className={'divide-y'}>
      {rows.map((_, i) => {
        return <Row key={i} index={rows.length - i} defaultShowContext={showContext} />
      })}
    </div>
  </div>
}

const Row = ({defaultShowContext, index}: {
  defaultShowContext: boolean
  index: number
}) => {

  const context = useMemo(() => randomBool() ? {gawgawgwaG: 15} : null, []);

  const [manualShowContext, setManualShowContext] = useState(false);

  const showContext = useMemo(() => defaultShowContext || manualShowContext, [defaultShowContext, manualShowContext])

  return <div className={'flex flex-col gap-1 py-2'}>
    <div className={'flex flex-row gap-2 text-sm max-md:flex-col'}>
      <div className={'flex gap-2'}>
        <div>#{index}</div>
        <b>Информация</b>
        <span>/</span>
        <b>anton.cherginets@gmail.com</b>
      </div>


      <div className={'flex flex-row gap-2 text-gray-500 ml-auto max-md:ml-0'}>
        <span>1016678</span>
        <span>/</span>
        <span>2025-02-03 12:50:40</span>
      </div>
    </div>
    <div>
      <div className={'whitespace-break-spaces break-words'}>Какое-то сообщение</div>
      {!defaultShowContext && context && <div className={'text-blue-700 cursor-pointer'} onClick={() => setManualShowContext(sc => !sc)}>{manualShowContext ? "скрыть контекст" : "показать контекст"}</div>}
      {showContext && context !== null && <pre className={'bg-gray-100 text-gray-500 p-2 rounded-xl mt-2 whitespace-break-spaces break-words'}>
              {JSON.stringify(context, null, 2)}
            </pre>}
    </div>
  </div>
}

export default ElementHistory;