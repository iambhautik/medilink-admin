import React, { Fragment, useEffect, useState } from 'react'

const Toggle = ({ register, type, setValue, errors, formData }) => {

    const [monday, tuesday, wednesday, thursday, friday, saturday, sunday] = formData

    const [isMonday, setIsMonday] = useState(monday?.isSelected || false);
    const [isTuesday, setIsTuesday] = useState(tuesday?.isSelected || false);
    const [isWednesday, setIsWednesday] = useState(wednesday?.isSelected || false);
    const [isThursday, setIsThursday] = useState(thursday?.isSelected || false);
    const [isFriday, setIsFriday] = useState(friday?.isSelected || false);
    const [isSaturday, setIsSaturday] = useState(saturday?.isSelected || false);
    const [isSunday, setIsSunday] = useState(sunday?.isSelected || false);

    useEffect(() => {

        setValue(`${type}_appointment_time[0].day`, 'Monday')
        
        setValue(`${type}_appointment_time[1].day`, 'Tuesday')
        
        setValue(`${type}_appointment_time[2].day`, 'Wednesday')
        
        setValue(`${type}_appointment_time[3].day`, 'Thursday')
        
        setValue(`${type}_appointment_time[4].day`, 'Friday')
        
        setValue(`${type}_appointment_time[5].day`, 'Saturday')
        
        setValue(`${type}_appointment_time[6].day`, 'Sunday')

    }, [])

    useEffect(() => {

        if (monday?.isSelected) {
            setValue(`${type}_appointment_time[0].day`, 'Monday')
        }
        if (tuesday?.isSelected) {
            setValue(`${type}_appointment_time[1].day`, 'Tuesday')
        }
        if (wednesday?.isSelected) {
            setValue(`${type}_appointment_time[2].day`, 'Wednesday')
        }
        if (thursday?.isSelected) {
            setValue(`${type}_appointment_time[3].day`, 'Thursday')
        }
        if (friday?.isSelected) {
            setValue(`${type}_appointment_time[4].day`, 'Friday')
        }
        if (saturday?.isSelected) {
            setValue(`${type}_appointment_time[5].day`, 'Saturday')
        }
        if (sunday?.isSelected) {
            setValue(`${type}_appointment_time[6].day`, 'Sunday')
        }
    }, [])

    const handleCheckBox = (id, { target: { checked } }) => {

        switch (id) {
            case 0:
                setIsMonday(!isMonday);
                setValue(`${type}_appointment_time[0].day`, 'Monday')
                break;
            case 1:
                setIsTuesday(!isTuesday);
                setValue(`${type}_appointment_time[1].day`, 'Tuesday')
                break;
            case 2:
                setIsWednesday(!isWednesday);
                setValue(`${type}_appointment_time[2].day`, 'Wednesday')
                break;
            case 3:
                setIsThursday(!isThursday)
                setValue(`${type}_appointment_time[3].day`, 'Thursday')
                break;
            case 4:
                setIsFriday(!isFriday)
                setValue(`${type}_appointment_time[4].day`, 'Friday')
                break;
            case 5:
                setIsSaturday(!isSaturday);
                setValue(`${type}_appointment_time[5].day`, 'Saturday')
                break;
            case 6:
                setIsSunday(!isSunday);
                setValue(`${type}_appointment_time[6].day`, 'Sunday')
                break;
            default:
                break;
        }

        if (!checked) {
            switch (id) {
                case 0:
                    setValue(`${type}_appointment_time[0].start_time`, '')
                    setValue(`${type}_appointment_time[0].end_time`, '')
                    break;
                case 1:
                    setValue(`${type}_appointment_time[1].start_time`, '')
                    setValue(`${type}_appointment_time[1].end_time`, '')
                    break;
                case 2:
                    setValue(`${type}_appointment_time[2].start_time`, '')
                    setValue(`${type}_appointment_time[2].end_time`, '')
                    break;
                case 3:
                    setValue(`${type}_appointment_time[3].start_time`, '')
                    setValue(`${type}_appointment_time[3].end_time`, '')
                    break;
                case 4:
                    setValue(`${type}_appointment_time[4].start_time`, '')
                    setValue(`${type}_appointment_time[4].end_time`, '')
                    break;
                case 5:
                    setValue(`${type}_appointment_time[5].start_time`, '')
                    setValue(`${type}_appointment_time[5].end_time`, '')
                    break;
                case 6:
                    setValue(`${type}_appointment_time[6].start_time`, '')
                    setValue(`${type}_appointment_time[6].end_time`, '')
                    break;
                default:
                    break;
            }
        }
    }

    const getOptions = () => {
        const timeConstants = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00"]
        return timeConstants.map((i) => {
            return (
                <option value={i} key={i}>{i}</option>
            )
        })
    }

    return (
        <Fragment>
            {/* Monday 00 */}
            <>
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <div className="d-flex justify-content-between">
                            <p>Monday</p>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    role="switch"
                                    type="checkbox"
                                    name="isSelected"
                                    disabled
                                    {...register(`${type}_appointment_time[0].isSelected`, {
                                        onChange: (e) => handleCheckBox(0, e),
                                        value: monday?.isSelected,
                                    })}
                                />{" "}
                                <div className="inner-switch"></div>
                            </div>
                        </div>
                    </div>
                    {((isMonday)) && (
                        <>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <select
                                        className="form-select"
                                        name='start_time'
                                        disabled
                                        {...register(`${type}_appointment_time[0].start_time`, {
                                            required: "Start time required",
                                            value: monday?.start_time,
                                            // disabled: true
                                        })}
                                    >
                                        <option value="">Select Time</option>
                                        {getOptions()}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <select
                                        className="form-select"
                                        name='end_time'
                                        disabled
                                        {...register(`${type}_appointment_time[0].end_time`, {
                                            required: "End time required",
                                            value: monday?.end_time,
                                            // disabled: true
                                        })}
                                    >
                                        <option value="">Select Time</option>
                                        {getOptions()}
                                    </select>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </>
            {/* Tuesday 01 */}
            <>
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <div className="d-flex justify-content-between">
                            <p>Tuesday</p>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    role="switch"
                                    type="checkbox"
                                    name="isSelected"
                                    disabled
                                    {...register(`${type}_appointment_time[1].isSelected`, {
                                        onChange: (e) => handleCheckBox(1, e),
                                        value: tuesday?.isSelected,
                                        // disabled: true
                                    })}
                                />{" "}
                                <div className="inner-switch"></div>
                            </div>
                        </div>
                    </div>
                    {isTuesday && (
                        <>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <select
                                        className="form-select"
                                        name='start_time'
                                        disabled
                                        {...register(`${type}_appointment_time[1].start_time`, {
                                            required: "Start time required",
                                            value: tuesday?.start_time,
                                            // disabled: true
                                        })}
                                    >
                                        <option value="">Select Time</option>
                                        {getOptions()}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <select
                                        className="form-select"
                                        name='end_time'
                                        disabled
                                        {...register(`${type}_appointment_time[1].end_time`, {
                                            required: "End time required",
                                            value: tuesday?.end_time,
                                            // disabled: true
                                        })}
                                    >
                                        <option value="">Select Time</option>
                                        {getOptions()}
                                    </select>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </>
            {/* Wednesday 02*/}
            <>
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <div className="d-flex justify-content-between">
                            <p>Wednesday</p>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    role="switch"
                                    type="checkbox"
                                    name="isSelected"
                                    disabled
                                    {...register(`${type}_appointment_time[2].isSelected`, {
                                        onChange: (e) => handleCheckBox(2, e),
                                        value: wednesday?.isSelected,
                                        // disabled: true
                                    })}
                                />{" "}
                                <div className="inner-switch"></div>
                            </div>
                        </div>
                    </div>
                    {isWednesday && (
                        <>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <select
                                        className="form-select"
                                        name='start_time'
                                        disabled
                                        {...register(`${type}_appointment_time[2].start_time`, {
                                            required: "Start time required",
                                            value: wednesday?.start_time,
                                            // disabled: true
                                        })}
                                    >
                                        <option value="">Select Time</option>
                                        {getOptions()}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <select
                                        className="form-select"
                                        name='end_time'
                                        disabled
                                        {...register(`${type}_appointment_time[2].end_time`, {
                                            required: "End time required",
                                            value: wednesday?.end_time,
                                            // disabled: true
                                        })}
                                    >
                                        <option value="">Select Time</option>
                                        {getOptions()}
                                    </select>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </>
            {/* Thursday 03 */}
            <>
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <div className="d-flex justify-content-between">
                            <p>Thursday</p>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    role="switch"
                                    type="checkbox"
                                    name="isSelected"
                                    disabled
                                    {...register(`${type}_appointment_time[3].isSelected`, {
                                        onChange: (e) => handleCheckBox(3, e),
                                        value: thursday?.isSelected,
                                        // disabled: true
                                    })}
                                />{" "}
                                <div className="inner-switch"></div>
                            </div>
                        </div>
                    </div>
                    {isThursday && (
                        <>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <select
                                        className="form-select"
                                        name='start_time'
                                        disabled
                                        {...register(`${type}_appointment_time[3].start_time`, {
                                            required: "Start time required",
                                            value: thursday?.start_time,
                                            // disabled: true
                                        })}
                                    >
                                        <option value="">Select Time</option>
                                        {getOptions()}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <select
                                        className="form-select"
                                        name='end_time'
                                        disabled
                                        {...register(`${type}_appointment_time[3].end_time`, {
                                            required: "End time required",
                                            value: thursday?.end_time,
                                            // disabled: true
                                        })}
                                    >
                                        <option value="">Select Time</option>
                                        {getOptions()}
                                    </select>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </>
            {/* Friday 04 */}
            <>
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <div className="d-flex justify-content-between">
                            <p>Friday</p>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    role="switch"
                                    type="checkbox"
                                    name="isSelected"
                                    disabled
                                    {...register(`${type}_appointment_time[4].isSelected`, {
                                        onChange: (e) => handleCheckBox(4, e),
                                        value: friday?.isSelected,
                                        // disabled: true
                                    })}
                                />{" "}
                                <div className="inner-switch"></div>
                            </div>
                        </div>
                    </div>
                    {isFriday && (
                        <>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <select
                                        className="form-select"
                                        name='start_time'
                                        disabled
                                        {...register(`${type}_appointment_time[4].start_time`, {
                                            required: "Start time required",
                                            value: friday?.start_time,
                                            // disabled: true
                                        })}
                                    >
                                        <option value="">Select Time</option>
                                        {getOptions()}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <select
                                        className="form-select"
                                        name='end_time'
                                        disabled
                                        {...register(`${type}_appointment_time[4].end_time`, {
                                            required: "End time required",
                                            value: friday?.end_time,
                                            // disabled: true
                                        })}
                                    >
                                        <option value="">Select Time</option>
                                        {getOptions()}
                                    </select>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </>
            {/* Saturday 05 */}
            <>
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <div className="d-flex justify-content-between">
                            <p>Saturday</p>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    role="switch"
                                    type="checkbox"
                                    name="isSelected"
                                    disabled
                                    {...register(`${type}_appointment_time[5].isSelected`, {
                                        onChange: (e) => handleCheckBox(5, e),
                                        value: saturday?.isSelected,
                                        // disabled: true
                                    })}
                                />{" "}
                                <div className="inner-switch"></div>
                            </div>
                        </div>
                    </div>
                    {isSaturday && (
                        <>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <select
                                        className="form-select"
                                        name='start_time'
                                        disabled
                                        {...register(`${type}_appointment_time[5].start_time`, {
                                            required: "Start time required",
                                            value: saturday?.start_time,
                                            // disabled: true
                                        })}
                                    >
                                        <option value="">Select Time</option>
                                        {getOptions()}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <select
                                        className="form-select"
                                        name='end_time'
                                        disabled
                                        {...register(`${type}_appointment_time[5].end_time`, {
                                            required: "End time required",
                                            value: saturday?.end_time,
                                            // disabled: true
                                        })}
                                    >
                                        <option value="">Select Time</option>
                                        {getOptions()}
                                    </select>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </>
            {/* Sunday 06 */}
            <>
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <div className="d-flex justify-content-between">
                            <p>Sunday</p>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    role="switch"
                                    type="checkbox"
                                    name="isSelected"
                                    disabled
                                    {...register(`${type}_appointment_time[6].isSelected`, {
                                        onChange: (e) => handleCheckBox(6, e),
                                        value: sunday?.isSelected,
                                        // disabled: true
                                    })}
                                />{" "}
                                <div className="inner-switch"></div>
                            </div>
                        </div>
                    </div>
                    {isSunday && (
                        <>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <select
                                        className="form-select"
                                        name='start_time'
                                        disabled
                                        {...register(`${type}_appointment_time[6].start_time`, {
                                            required: "Start time required",
                                            value: sunday?.start_time,
                                            // disabled: true
                                        })}
                                    >
                                        <option value="">Select Time</option>
                                        {getOptions()}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <select
                                        className="form-select"
                                        name='end_time'
                                        disabled
                                        {...register(`${type}_appointment_time[6].end_time`, {
                                            required: "End time required",
                                            value: sunday?.end_time,
                                            // disabled: true
                                        })}
                                    >
                                        <option value="">Select Time</option>
                                        {getOptions()}
                                    </select>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </>
        </Fragment>
    )
}

// Toggle.defaultProps = {
//     formData: []
// }

export default Toggle;