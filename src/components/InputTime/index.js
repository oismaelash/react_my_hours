import React, {Fragment} from 'react';

const InputTime = props => {
    return(
        <Fragment>
            <label>{props.titleTime}</label>
            <input type="time" name={props.name} value={props.time} onChange={e => {props.onChangeTime(e)}} />
        </Fragment>
    );
}

export default InputTime;