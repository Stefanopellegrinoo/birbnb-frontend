import { useEffect, useMemo, useState } from 'react';
import { DatePickerInput } from '@mantine/dates';
import 'dayjs/locale/es';
import '../../styles/SelectorFecha.css';


export default function SelectorFecha({changeFechaInicio, changeFechafin, diasNoDisponibles}) {
 
  const [range, setRange] = useState([null, null]);

  useEffect(()=>{
    changeFechaInicio(range[0])
    changeFechafin(range[1])
  }, [range])


function isFechaReservada(date, rangosFechas) {
  const día = new Date(date);
  día.setHours(0, 0, 0, 0);

  return rangosFechas.some(({ fechaInicio, fechaFin }) => {
    const inicio = new Date(fechaInicio);
    const fin    = new Date(fechaFin);
    inicio.setHours(0, 0, 0, 0);
    fin.setHours(0, 0, 0, 0);

    return día >= inicio && día <= fin;
  });
}

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
        valueFormat="D  MMMM  YYYY"
        classNames={{ input: 'sf-input' }}
        excludeDate={date => isFechaReservada(date, diasNoDisponibles)}
         
      />
    </div>
  );
}
