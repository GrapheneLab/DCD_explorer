import React, {Component} from 'react';
import Input from "../helpers/input";
import CheckBox from "../helpers/checkBox";
import Translate from "react-translate-component";

class TableFilter extends Component{
    state = {
        filterSpam: false,
        spamBorder: 0.001,
        removeDoubles: true,
        removeSpam: true,
        activeTypes: this.props.types || []
    };

    componentDidMount(){
        const {filterSpam, spamBorder, removeDoubles} = this.props.defaultParams;
        this.setState({filterSpam, spamBorder, removeDoubles});
    }

    handleChange = (e, id) => {

        let state = {...this.state};
        let val = e;

        if(typeof e !== 'string'){
            val = e.target.checked;
            id = e.target.id;
        }

        state[id] = val;

        this.setState(state);
        localStorage.setItem('filterData', JSON.stringify(state));
    };

    selectAllTypes = () => this.setState({activeTypes: this.props.types});
    deselectAllTypes = () => this.setState({activeTypes: []});

    changeTypesList = (e) => {
        const itemToHandle = e.target.id;
        const activeTypes = [...this.state.activeTypes];
        const indexOfItem = activeTypes.indexOf(itemToHandle);

        indexOfItem > -1
            ? activeTypes.splice(indexOfItem, 1)
            : activeTypes.push(itemToHandle);

        this.setState({activeTypes});
    };

    filterData = () => this.props.handleFilter(this.state);

    render(){

        const {showFilter} = this.props;
        const {filterSpam, removeDoubles, activeTypes, removeSpam} = this.state;
        const {types} = this.props;

        return(
            <div className={`table-filter${showFilter ? ' table-filter--open' : ''}`}>
                <div className="table-filter__section">
                    <Translate component="h2" content="tableFilter.spamTitle" />
                    <div className="row">
                        <div className="col-md-4 table-filter__group">
                            <CheckBox
                                id="filterSpam"
                                label={`tableFilter.filterSpam`}
                                value={filterSpam}
                                onChange={this.handleChange}
                            />
                            <Input
                                id="spamBorder"
                                disabled={!filterSpam}
                                value={this.state}
                                getVal={this.handleChange}
                            />
                            <span className="text--grey">EOS</span>
                        </div>
                        <div className="col-md-4">
                            <CheckBox
                                id="removeSpam"
                                label={`tableFilter.removeSpam`}
                                value={removeSpam}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <CheckBox
                                id="removeDoubles"
                                label={`tableFilter.removeDoubles`}
                                value={removeDoubles}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="table-filter__section">
                    <Translate component="h2" content="tableFilter.typesTitle" />
                    <div className="row">
                        {types.map(elem =>
                            <div className="col-md-2" key={elem}>
                                <CheckBox
                                    id={elem}
                                    className='switch'
                                    label={`actionsList.${elem}.title`}
                                    value={activeTypes.includes(elem)}
                                    onChange={this.changeTypesList}
                                />
                            </div>
                        )}
                    </div>
                    <div className="table-filter__btn-wrapper">
                        {activeTypes.length !== types.length &&
                            <Translate component="button" content="tableFilter.selectAll" onClick={this.selectAllTypes} />
                        }
                        {Boolean(activeTypes.length) &&
                            <Translate component="button" content="tableFilter.removeAll" onClick={this.deselectAllTypes}/>
                        }
                    </div>
                </div>
                <div className="table-filter__section">
                    <div className="table-filter__btn-wrapper">
                        <Translate component="button" content="tableFilter.submit" onClick={this.filterData} />
                    </div>
                </div>
            </div>
        )
    }
}

export default TableFilter
