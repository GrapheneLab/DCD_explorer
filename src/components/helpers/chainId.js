import React from 'react';
import {IconLink} from "../../svg";
import {nodeInfo} from "../../reducers";
import {connect} from "react-redux";

const ChainId = ({node = {id: '---'}}) => (
    <span className="chain_id text--md">
        <IconLink/>ChainID: <span className='title text--xs'>{node.id}</span>
    </span>
);


const mapStateToProps = state => ({
    node: nodeInfo(state)
});

export default connect(mapStateToProps)(ChainId)
