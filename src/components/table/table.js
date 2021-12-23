import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Translate from "react-translate-component";
import withTable from "./tableWrapper";
import TableHead from "./tableHead";
import TableItem from "./tableItem";

export const EmptyTableMessage = ({pageName}) => <Translate content={`emptyTable.${pageName}`} className="table--empty card text--md" />;

class Table extends Component {
    state = {
        version: 'desktop',
        fixedCell: false
    };

    checkTable = () => {
        const {table, inner} = this.refs;

        const DOMTable = ReactDOM.findDOMNode(this);

        const firstTh = Object.values(DOMTable.querySelectorAll('th:first-child'));
        const firstTd = Object.values(DOMTable.querySelectorAll('td:first-child'));

        let arr = [...firstTh, ...firstTd],
            marginLeft = '',
            fixedCell = this.state.fixedCell;

        if(table.offsetWidth > inner.offsetWidth){
            const px = arr.reduce((acc, el) => el.offsetWidth > acc ? el.offsetWidth : acc, 0 );
            marginLeft = `${px < 150 ? px : 150}px`;
            fixedCell = true;
        } else {
            fixedCell = false
        }

        inner.style.paddingLeft = marginLeft;

        if(fixedCell !== this.state.fixedCell)
            this.setState({fixedCell}, () => {
                arr.forEach(el => {
                    el.style.width = marginLeft;
                    if(el.tagName !== 'TH'){
                        el.style.height = (el.parentNode ? el.parentNode.offsetHeight  + 'px' : 'auto');
                    }
                });
            });
    };

    sort = (key) => {
        let data = this.state.data;

        data = data.sort((a,b) =>
            typeof a[key] === 'string'
                ? (a[key] > b[key] ? 1 : -1)
                : b[key] - a[key]
        );

        this.setState({data});
    };

    componentDidMount(){
        this.checkTable();
        this.setState({data: this.props.data});
        window.addEventListener('resize', this.checkTable);
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.checkTable);
    }

    componentWillReceiveProps(){
        this.setState({fixedCell: false}, this.checkTable);
    }

    render() {
        const {
            data = [],
            head = [],
            classNames = {},
            filtered = [],
            checkboxParams,
            sortData,
            sortParams
        } = this.props;

        const {fixedCell} = this.state;

        let classes = {
            wrapper: '',
            inner: '',
            table: '',
            tbody: '',
            thead: '',
            tr: '',
            th: '',
            td: '',
            ...classNames,
        };

        return(
            <div className={`table__wrapper ${classes.wrapper} ${fixedCell ? 'fixed-cell' : ''}`}>
                <div ref='inner' className={`table__inner ${classes.inner}`}>
                <table ref='table' className={`table ${classes.table}`}>
                    <TableHead classes={classes.thead} checkboxParams={checkboxParams} head={head} sortData={sortData} sortParams={sortParams} />
                    <tbody className={classes.tbody}>
                        {data.map(el => {
                            return <TableItem
                                    key={`row-${el.id}`}
                                    head={head}
                                    data={el}
                                    classes={{td: classes.td, tr: classes.tr}}
                                    checkboxParams={checkboxParams}
                                    disabled={filtered.includes(el.id)}
                                />
                            }
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default withTable(Table);

export const DefaultTable = Table;
