import React, {Component} from 'react';
import {EmptyTableMessage} from "./table";

function withTable(TableComponent){
    return class TableWrapper extends Component{
       state = {
           ids: [],
           filterIds: [],
           rawData: [],
           decoratedData: [],
           sortParams: {
               type: 'id',
               abc: true
           },
       };

        componentDidMount(){
           this.handleNewData(this.props);
        }

        componentWillReceiveProps(newProps){
           this.handleNewData(newProps);
        }

        sortData = (e) => {

            const sortParam = e.target.dataset.type ? e.target.dataset.type : e.target.parentNode.dataset.type;
            const {rawData, decoratedData, sortParams} = this.state;
            const oldParam = sortParams.type === sortParam;
            const newDecoratedData = oldParam
                ? decoratedData.reverse()
                : rawData.sort(
                    (prev, next) => !isNaN(prev[sortParam])
                        ? next[sortParam] - prev[sortParam]
                        : prev[sortParam] > next[sortParam] ? 1 : -1
                ).map(e => decoratedData.find(decorated => decorated.id === e.id));

            this.setState({
                decoratedData: newDecoratedData,
                sortParams: {
                    type: sortParam,
                    abc: oldParam ? !sortParams.abc : true
                }
            })

        };

        handleNewData = (props) => {
            const {ids, rawData, decoratedData} = this.state;
            const {head, decorate} = this.props;

            const newData = ids.length ? props.data.filter(elem => !ids.includes(elem.id)) : props.data;

            if(!newData.length) return;

            const dataWithStyles = decorate
                ? newData.map(elem => {
                    const newElem = {};

                    head.forEach(headElem => {
                        const key = headElem.key;
                        newElem[key] = decorate[key] ? decorate[key](elem) : elem[key]
                    });

                    newElem.id = elem.id;
                    ids.push(elem.id);

                    return newElem;
                })
                : newData;

            const newRawData = [...rawData, ...newData];
            const newDecoratedData = [...decoratedData, ...dataWithStyles];

            this.setState({
                ids,
                rawData: newRawData,
                decoratedData: newDecoratedData
            });
        };

        render(){
            const decoratedData = this.state.decoratedData;
            const filteredIds = this.props.filteredIds || [];

            if(!decoratedData.length || decoratedData.length === filteredIds.length) return <EmptyTableMessage pageName={this.props.onEmpty} />;

            const {head, checkboxParams, classNames} = this.props;

            return (
                <TableComponent
                    head={head}
                    classNames={classNames}
                    data={decoratedData}
                    filtered={filteredIds}
                    checkboxParams={checkboxParams}
                    sortData={this.sortData}
                    sortParams={this.state.sortParams}
                />
            )
        }
    }
};

export default withTable;
