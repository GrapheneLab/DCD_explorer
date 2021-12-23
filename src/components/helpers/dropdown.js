import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Caret} from "../../svg/index";
import {IconClose} from "../../svg";
import {defaultBreakPoint} from "../data_temp";

const isMobile = window.innerWidth < defaultBreakPoint.sm;

const DropdownWrapper = ({children, popup}) => (
    isMobile || popup
        ? <div className="dropdown__popup">{children}</div>
        : children
);

class Dropdown extends Component {
    state = {
        path: window.location.pathname
    };

    open = () => {
        const {popup} = this.props;
        const obj = ReactDOM.findDOMNode(this), body = document.body;

        if (obj.matches('.open')) {
            obj.classList.remove('open')
        } else {
            document.addEventListener('click', this.handleOutsideClick, false);


            let arrDrops = Object.values(document.querySelectorAll('.dropdown.open'));
            arrDrops.forEach(el => el.classList.remove("open"));

            if(popup) {
                body.style.top = body.getBoundingClientRect().top + 'px';
                body.style.paddingRight = '17px';
                body.style.position = 'fixed';
            }

            obj.classList.add('open')
        }
    };

    close = () => {
        const {popup} = this.props;
        const body = document.body;
        if(popup) {
            const posTop = Math.abs(parseInt(body.style.top));
            body.removeAttribute('style');
            window.scrollTo(0, posTop);
        }
        document.removeEventListener('click', this.handleOutsideClick, false);
        ReactDOM.findDOMNode(this).classList.remove('open');
    };

    handleOutsideClick = (e) => {
        const {popup} = this.props;
        const obj = ReactDOM.findDOMNode(this);
        const modal = obj.querySelector('.dropdown__list');
        const condition = !popup ? !obj.contains(e.target) : !modal.contains(e.target);

        if (condition) this.close();
    };

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick, false);
    }

    componentWillReceiveProps() {
        if(this.state.path !== window.location.pathname){
            this.close();
        }
    }

    render() {
        const {
            list, data, title, className,
            btnClass = '',
            popup = false,
            icon = false,
            right = false
        } = this.props;

        const closeBtn = isMobile || popup
            ? <button className="btn--close" onClick={this.close}><IconClose/></button>
            : '';
        const btnText = title ? title : 'Dropdown';
        const caret = (list || data) && !popup && !icon && <Caret className='dropdown__caret'/>;
        let content = '';

        if(data){
            content =
                <div className={`dropdown__list`}>
                    {closeBtn}
                    {data}
                </div>
        }

        if(list){
            content =
                <ul className={`dropdown__list`}>
                    {closeBtn}
                    {list.map((e, index) =>
                        <li className="dropdown__item text--sm" key={index} onClick={this.close}>{e}</li>)
                    }
                </ul>
        }

        return (
            <div className={`dropdown ${className ? className : ''} ${right ? 'right' : ''} ${icon ? 'icon': ''}`}>
                <span className={`dropdown__title ${btnClass}`} onClick={this.open}>{btnText}{caret}</span>
                <DropdownWrapper popup={popup}>{content}</DropdownWrapper>
            </div>
        )
    }
}

export default Dropdown
