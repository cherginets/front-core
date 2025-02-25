'use client'
import React, {useState} from 'react';
import moment, { Moment } from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers';
import {Button, Stack, Typography} from "@mui/material";
import 'moment/locale/ru';

interface Props {
  selectedRange: { dateFrom: string; dateTo: string }
  onChangeRange: (value: { dateFrom: string; dateTo: string }) => void
}

export const AnalyticsDateRangePicker = ({selectedRange, onChangeRange}:Props) => {
  const [tempRange, setTempRange] = useState<{ from: Moment | null; to: Moment | null }>({
    from: moment(),
    to: moment(),
  });

  const applyDateRange = () => {
    if (tempRange.from && tempRange.to) {
      onChangeRange({
        dateFrom: tempRange.from.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        dateTo: tempRange.to.endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      });
    }
  };

  const setQuickRange = (from: Moment, to: Moment) => {
    setTempRange({ from, to });
    onChangeRange({
      dateFrom: from.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      dateTo: to.endOf('day').format('YYYY-MM-DD HH:mm:ss'),
    });
  };

  const isRangeSelected = (from: Moment, to: Moment) => {
    return (
      from.isSame(moment(selectedRange.dateFrom), 'day') &&
      to.isSame(moment(selectedRange.dateTo), 'day')
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ru">
      <Stack direction="row" gap="12px" alignItems="center">
        <DatePicker
          label="От"
          value={tempRange.from}
          onChange={(newValue) => setTempRange((prev) => ({ ...prev, from: newValue }))}
          shouldDisableDate={(date) => !!tempRange.to && date.isAfter(tempRange.to, 'day')}
        />
        <DatePicker
          label="До"
          value={tempRange.to}
          onChange={(newValue) => setTempRange((prev) => ({ ...prev, to: newValue }))}
          shouldDisableDate={(date) => !!tempRange.from && date.isBefore(tempRange.from, 'day')}
        />
        {(tempRange.from?.format('YYYY-MM-DD') !== moment(selectedRange.dateFrom).format('YYYY-MM-DD') ||
          tempRange.to?.format('YYYY-MM-DD') !== moment(selectedRange.dateTo).format('YYYY-MM-DD')) && (
          <Button variant="contained" onClick={applyDateRange}>
            Применить
          </Button>
        )}
      </Stack>

      <Stack direction="row" gap="12px" sx={{ marginTop: '16px', flexWrap: 'wrap' }}>
        {[
          { label: 'сегодня', from: moment(), to: moment() },
          { label: 'вчера', from: moment().subtract(1, 'day'), to: moment().subtract(1, 'day') },
          { label: 'эта неделя', from: moment().startOf('week'), to: moment().endOf('week') },
          { label: 'прошлая неделя', from: moment().subtract(1, 'week').startOf('week'), to: moment().subtract(1, 'week').endOf('week') },
          { label: 'этот месяц', from: moment().startOf('month'), to: moment().endOf('month') },
          { label: 'прошлый месяц', from: moment().subtract(1, 'month').startOf('month'), to: moment().subtract(1, 'month').endOf('month') },
          { label: 'этот год', from: moment().startOf('year'), to: moment().endOf('year') },
          { label: 'прошлый год', from: moment().subtract(1, 'year').startOf('year'), to: moment().subtract(1, 'year').endOf('year') },
        ].map(({ label, from, to }) => (
          <Typography
            key={label}
            className={`cursor-pointer ${isRangeSelected(from, to) ? 'black' : 'underline'}`}
            color={isRangeSelected(from, to) ? 'black' : 'primary'}
            onClick={() => setQuickRange(from, to)}
          >
            {label}
          </Typography>
        ))}
      </Stack>

      <Stack direction={'row'} gap={'12px'} marginTop={'20px'}>
        <strong>Выбранный диапазон:</strong>
        <p>От: {selectedRange.dateFrom}</p>
        <p>До: {selectedRange.dateTo}</p>
      </Stack>
    </LocalizationProvider>
  );
};

