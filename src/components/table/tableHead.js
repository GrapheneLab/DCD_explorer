import React, {Component} from 'react'
import Translate from "react-translate-component";

class TableHead extends Component{

    shouldComponentUpdate(props){
        return (
            JSON.stringify(this.props.sortParams) !== JSON.stringify(props.sortParams) ||
            JSON.stringify(this.props.head) !== JSON.stringify(props.head)
        );
    }

    render(){

        const {classes, checkboxParams, head, sortData, sortParams} = this.props;

        return(
            <thead className={classes.thead}>
                <tr>
                    {checkboxParams ? <th/> : undefined}
                    {head.map(el => {

                        let filterClass = '';

                        if(el.filter){
                            const active = sortParams.type === el.filter;
                            filterClass = `table-sort table-sort--${!active || sortParams.abc ? 'abc' : 'cba'}${active ? ' table-sort--active' : ''}`
                        }

                        return(
                            <th key={el.key} className={`title text--md ${classes.th}`}>
                                {el.title ? <Translate content={`tableHead.${el.title}`} /> : el.key}
                                {el.filter
                                    ? <button
                                        className={filterClass}
                                        data-type={el.filter}
                                        onClick={sortData}
                                    >
                                        <span />
                                        <span />
                                        <span />
                                    </button>
                                    : ''}
                            </th>
                        )}
                    )}
                </tr>
            </thead>
        )
    }
}

export default TableHead;
