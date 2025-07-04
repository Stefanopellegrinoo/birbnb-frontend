import { useMemo, useState } from 'react';
import { DatePickerInput } from '@mantine/dates';
import 'dayjs/locale/es';
import '../../styles/SelectorFecha.css';


export default function SelectorFecha() {
  const [range, setRange] = useState([new Date(), null]);
const diasNoDisponibles = [
  '2025-07-24',
  '2025-12-25',
  '2025-12-31',
  // … más fechas en formato YYYY-MM-DD
]

  const excludeDates = useMemo(
    () => diasNoDisponibles.map(d => new Date(d)),
    []
  );

  return (
    <div className="sf-container">
      <label htmlFor="date-range" className="sf-label">
        Fechas de tu estadía
      </label>
      <DatePickerInput
        id="date-range"
        type="range"
        locale="es"
        minDate={new Date()}
        placeholder="Selecciona fechas"
        value={range}
        onChange={setRange}
        clearable={false}
        valueFormat="MMMM D, YYYY"
        classNames={{ input: 'sf-input' }}
         excludeDate={(date) => diasNoDisponibles.includes(date)}
         
      />
    </div>
  );
}
