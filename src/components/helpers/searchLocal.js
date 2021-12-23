import React, {Component} from "react";
import ReactDOM from "react-dom";
import Translate from "react-translate-component";
import {IconSearch} from "../../svg";

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

const hintsBidDOM = (data, buttonEvent) => {
    let dom = [],
        errorMessage = <Translate content="hints.error" className="hints__error text--md" />;

    if(!data) return errorMessage;

    for(let item in data){
        if(data[item].length > 0) {
            dom.push(
                <div className="hints__list" key={item}>
                    <Translate content={`search.${item}`} className="text--md"/>
                    {data[item].filter(onlyUnique).map((el, index) =>
                        <span key={index} className="card link--ghost text--md"
                              onClick={() => buttonEvent(el)}>{el}</span>
                    )}
                </div>
            )
        }
    }

    if(dom.length < 1) return errorMessage;

    return dom.map(e => e);
};

const searchBid  = async (value, fields, data) => {
    let hints = {};

    const reg = new RegExp('^' + value);
    fields.forEach(el => {
        hints[el] = [];
    });

    data.forEach(el => {
        fields.forEach(field => {
            if(el[field].match(reg) && hints[field].length < 10){
                hints[field].push(el[field]);
            }
        })
    });

    return hints
};

const emptyHints = {dom: false, hints: false, value: ''};

export class SearchBid extends Component {
    state={
        value: '',
        hints: false,
        dom: false,
        timeout: false
    };

    close = () => {
        clearTimeout(this.state.timeout);
        this.setState(emptyHints);
    };

    search = (value = false) => {
        if(!value) return;

        const {fields, data} = this.props;

        return searchBid(value, fields, data).then(e => {
            this.setState({hints: e, dom: hintsBidDOM(e, this.getUp)})
        });
    };

    handleChange = (e) => {
        document.addEventListener('click', this.handleOutsideClick, false);

        if(this.state.timeout){
            clearTimeout(this.state.timeout);
        }

        const value = e.target.value.trim();

        let timeout = setTimeout(() => this.search(value), 500);

        this.setState({ value, timeout });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        clearTimeout(this.state.timeout);

        const {fields, data} = this.props;
        const value = this.state.value;

        return searchBid(value, fields, data).then(e => {
            for(let el in e) {
                if(e[el].includes(value)){
                    this.close();
                    return this.getUp(value)
                } else {
                    this.search(value)
                }
            }
        });
    };

    getUp = (value) => {
        this.close();
        this.props.resultFunc(value)
    };

    handleOutsideClick = (e) => {
        const obj = ReactDOM.findDOMNode(this);
        if((e.target !== obj && e.target.closest('form.search') !== obj)){
            document.removeEventListener('click', this.handleOutsideClick, false);
            this.close();
        }
    };

    render(){
        const {value, dom} = this.state;
        const {placeholder} = this.props;

        return(
            <form action="" className='search search--local' onSubmit={this.handleSubmit}>
                <label htmlFor="#localsearch" className='search__label'><IconSearch/></label>
                <Translate
                    component="input"
                    type="search"
                    className="search__field"
                    id='localsearch'
                    autoComplete='off'
                    value={value}
                    onChange={this.handleChange}
                    attributes={{placeholder: placeholder ? `search.placeholder.${placeholder}` : 'search.placeholder.default' }}
                />
                <div className={`hints${dom ? ' hints--active' : ''}`}>
                    {dom}
                </div>
            </form>
        )
    }
}
