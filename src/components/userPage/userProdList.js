import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import Translate from "react-translate-component";
import {IconClose, IconLink} from "../../svg";
import {EmptyTableMessage} from "../table/table";


class UserProdList extends Component {
    render(){
        const {data, removable} = this.props;

        if(!data){
            return <EmptyTableMessage pageName="account.prodList" />
        }

        return (
            <Fragment>
                <Translate content="account.countVoteProducer" component="p" className="text--md" with={{count: `(${data.length}/30)`}}/>
                <div className="personal__producer text--md">
                    {data.map((el, index) =>
                        !removable
                            ? <Link to={`/accounts/${el}`} key={`${el}-${index}`} className="card voted__producer link--ghost">{el}</Link>
                            :  <span key={`${el}-${index}`} className="card voted__producer link--ghost">
                                {el}
                                <span className="hover">
                                    <Link to={`/accounts/${el}`}><IconLink/></Link>
                                    <IconClose className='rm' onClick={() => removable(el)}/>
                                </span>
                            </span>
                    )}
                </div>
            </Fragment>
        );
    }
}

export default UserProdList
