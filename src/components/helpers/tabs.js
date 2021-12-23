import React, {Component, Fragment} from 'react';
import Translate from "react-translate-component";
import {defaultBreakPoint} from "../data_temp";
import Dropdown from "./dropdown";

class Tabs extends Component{
    state = {
        activeTab: 0
    };

    handleClick = (event) => this.setState({activeTab: Number(event.target.dataset.type)});

    render(){
        const {tabsTitles, children, title, tabsClass = '', contentClass = ''} = this.props;
        const {activeTab} = this.state;

        const list = tabsTitles.map((elem, index) =>
            <Translate
                key={index}
                content={`tabsHead.${elem}`}
                component={tabsTitles.length > 1 ? `button` : 'span'}
                className={`tabs-titles__item${index === activeTab ? ' tabs-titles__item--selected' : ''}`}
                data-type={index}
                onClick={this.handleClick}
            />
        );

        return(
            <Fragment>
                {tabsTitles.length > 1  &&
                    <div className={`col-md-12 heading ${tabsClass}`}>
                        {title ? <Translate content={title}/> : ''}
                        {window.innerWidth > defaultBreakPoint.sm
                            ? <div className={`tabs-titles`}>{list}</div>
                            : <Dropdown
                                className='text--sm dropdown--bg dropdown--md'
                                title={<Translate content={`tabsHead.${tabsTitles[activeTab]}`}/>}
                                list={list}
                            />
                        }
                    </div>
                }
                <div className={`col-md-12 tabs-content ${contentClass}`}>
                    {children[activeTab]}
                </div>
            </Fragment>
        )
    }
}

export default Tabs;
