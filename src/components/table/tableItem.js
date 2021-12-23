import React, {Component} from 'react'
import TableCheckBox from "../helpers/checkBoxTable";

class TableItem extends Component{

    shouldComponentUpdate(props){
        return JSON.stringify(this.props.data) !== JSON.stringify(props.data) || this.props.disabled !== props.disabled;
    }

    render(){
        const {checkboxParams = false, classes = {}, data, head, disabled} = this.props;

        return(
            <tr className={`text--md table__item ${disabled ? 'table__item--disabled' : ''} table__item ${classes.tr}`}>
                {checkboxParams
                    ? <td>
                        <TableCheckBox index={data[checkboxParams.index]}
                                       fn={checkboxParams.fn}
                                       type={checkboxParams.type}
                        />
                    </td>
                    : undefined
                }
                {head.map(headElem => {
                    const key = headElem.key;
                    return (
                        <td key={`${key}-${data[key]}`} className={classes.td}>
                            {data[key]}
                        </td>
                    )
                })}
            </tr>
        )
    }
}

export default TableItem;
