import React from "react";
import { getTimeRange, TimePicker } from '@mantine/dates';

const CheckHour = ({horarioChkIn, horarioChkOut, }) => {




    return (
        <div>
            <TimePicker
                label="Check-in"
                withDropdown
                value={horarioChkIn}
                presets={getTimeRange({
                    startTime: "06:00:00",
                    endTime: "11:00:00",
                    interval: "01:00:00",
                })}
                onChange={handleChange("horarioChkIn")}
            />
            <TimePicker
                label="Check-out"
                withDropdown
                presets={getTimeRange({
                    startTime: "06:00:00",
                    endTime: "23:00:00",
                    interval: "01:00:00",
                })}
                value={horarioChkOut}
                onChange={handleChange("horarioChkOut")}
            />
        </div>
    );
};

export default CheckHour;
