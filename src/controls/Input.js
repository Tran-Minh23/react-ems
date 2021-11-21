import React from 'react'
const Input = (props) => {
    const {id, label, labelSize, frmField, err, errMessage, ...others} = props;
    const size = labelSize ? labelSize : 3;
    const classSize = `col-sm-${size} col-form-label`;
    const inputClass = `form-control ${err ? "is-invalid" : ""}`;
    return (
        <div className="row mb-3">
            <label htmlFor={id} className={classSize}>{label}</label>
            <div className="col-sm">
                {
                    others["rows"] > 1 ?
                    (<textarea id={id} className={inputClass} {...others} {...frmField}></textarea>) :
                    (<input className={inputClass} id={id} {...others} {...frmField}/>)
                } 
                {err ? <div className="invalid-feedback">{errMessage}</div> : null}
            </div>
        </div>
    );
}
 
export default Input;