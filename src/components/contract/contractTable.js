import React, {Component} from 'react';
import {chainOperation, setDefaultNumber} from "../../actions";
import {defaultTableParams} from "../data_temp";
import Table from "../table/table";
import Translate from "react-translate-component";
import {Link} from "react-router-dom";

class ContractTable extends Component{
    state = {
        heading: false,
        rows: false
    };

    componentDidMount(){
        const {name, table} = this.props.match.params;

        this.formTable(name, table);
    }

    componentWillReceiveProps(nextProps){
        // if(this.props.tableName !== nextProps.tableName) this.setState({rows: false}, () => this.formTable(nextProps.tableName));
    }

    formTable = (scope, table) => {

        const params = { ...defaultTableParams, code: scope, scope, table };

        chainOperation('get_table_rows', params).then(data => {
            const rows = data.rows;
            const state = { heading: [], rows: [] };

            if(rows.length) {
                const keys = Object.keys(rows[0]);
                state.heading = keys.map(key => ({key}));
                state.rows = rows.map(row => {
                    keys.forEach(key => {
                        const val = row[key];
                        if(typeof val === 'object') row[key] = JSON.stringify(val);
                    });

                    return row;
                });
            }

            this.setState(state)
        });
    };

    render(){
        const {heading, rows} = this.state;

        if(!rows) return <span>Loading...</span>;

        return(
            <section className='container personal__page'>
                <div className="col-md-12">
                    <h2 className="heading">
                        <Translate content="contract.table" />
                        <div className="regaly text--sm">
                            <Link to={`/contract/${this.props.match.params.name}`} className="link--ghost">
                                Back
                            </Link>
                        </div>
                    </h2>
                </div>
                <div className="col-md-12">
                    <Table head={ heading } data={ rows } onEmpty="account.proxyTable" />
                </div>
            </section>
        )
    }
}

export default ContractTable;