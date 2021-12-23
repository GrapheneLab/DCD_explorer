import React, {Component} from 'react';
import Translate from "react-translate-component";
import {chainOperation} from "../../actions";
import {awaitForResult} from "../../actions/awaitForResult";
import {IconBlock, IconBlockIr} from "../../svg";
import {Link} from "react-router-dom";

const getData = async () => await chainOperation('get_info').then(e => e);

class DashboardHeadBlock extends Component {
    state = {
        info: false,
    };

    componentDidMount() {
        awaitForResult(getData()).then(e => {
            const interval = setInterval(() => {
                getData().then(e => this.setState({info: e}))
            }, 2000);

            this.setState({...e, interval});
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    render() {
        const {info} = this.state;

        const blockArr = [
            {icon: <IconBlock className='block__ico block__ico-first'/>, content: 'headBlock', num: (info.head_block_num ? info.head_block_num : 0)},
            {icon: <IconBlockIr className='block__ico block__ico-second'/>, content: 'irreversibleBlock', num: (info.last_irreversible_block_num ? info.last_irreversible_block_num : 0)}
        ];

        return (
            <div className="col-md-4 dashboard__block">
                <div className="card block__wrapper">
                    {blockArr.map(el => (
                        <div className='block__item' key={el.content}>
                            {el.icon}
                            <div className="heading block__desc">
                                <Translate content={`dashboard.${el.content}`} className="title block__title" />
                                <span className='nowrap'>{el.num.toLocaleString('ru-RU')}</span>
                            </div>
                        </div>
                    ))}
                    <p className='card block__producer text--md'>
                            <span className='title text--md'>
                                <Translate content="dashboard.produced" />:
                            </span> {info ? <Link className="link--ghost" to={`/accounts/${info.head_block_producer}`}>{info.head_block_producer}</Link> : "--"}
                    </p>
                </div>
            </div>
        )
    }
}

export default DashboardHeadBlock;
