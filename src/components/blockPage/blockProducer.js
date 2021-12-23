import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Translate from "react-translate-component";
import {getBackendData, handleProducerJSON} from "../../actions";
import {IconBP} from "../../svg";
import {Key} from "../helpers/key";


const getData = async (name) => {
    const data = await getBackendData('gpd', {name}).then(e => e);
    data.avatar = data.bp ? handleProducerJSON(data.bp).avatar : '';

    return {data}
};

export class BlockProducerCard extends Component {
    state = {
        data: false
    };

    componentDidMount(){ getData(this.props.name).then(e => this.setState(e)); }

    render(){
        const {data} = this.state;
        const {name, signature} = this.props;

        let avatar = <IconBP />,
            key = '--------';

        if(data){
            avatar = <img src={data.avatar} alt=""/>;
            key = data.producer_key;
        }

        return(
            <div className="card personal__card producer__card">
                <div className={`personal__info BP personal__name`}>
                    <div className="avatar">
                        {avatar}
                    </div>
                    <div className="block__info-text">
                        <Translate content="blockPage.producedBy" className="title" />
                        {data
                            ? <Link to={`/accounts/${name}`} className="link--ghost">{name}</Link>
                            : 'Genesis Block'
                        }
                    </div>
                </div>
                <Key title='producerKey' data={key}/>
                <Key title='producerSignature' data={signature}/>
            </div>
        )
    }
}
