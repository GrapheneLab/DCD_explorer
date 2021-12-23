import React from 'react';
import UserProdList from "./userProdList";
import UserControlledList from "./userControlledList";
import UserCreatedList from "./userCreatedList";
import UserProxyList from "./userProxyList";
import UserVoteList from "./userVoteList";
import Tabs from "../helpers/tabs";

export const UserTabs = ({data}) => {
    let tabsTitles = [], tabContent = [];

    const name = data.info.name;
    const isProducer = data.producerData;
    // const isProxy = data.votingData.isProxy;

    if(data.votingData && data.votingData.voters.length > 0) {
        tabsTitles.push(`voteFor${data.votingData.proxy ? 'TroughProxy' : ''}`);
        tabContent.push(<UserProdList key='user_prods' data={data.votingData.voters}/>);
    }
    // if(isProducer) {
    //     tabsTitles.push('voteUs');
    //     tabContent.push(<UserVoteList key='user_voters' name={name} count={data.producerData.count}/>);
    // }
    // if(isProxy) {
    //     tabsTitles.push('proxyUs');
    //     tabContent.push(<UserProxyList key='user_proxy' name={name} count={data.votingData.countVoters}/>);
    // }

    // tabsTitles.push('controlled');
    // tabContent.push(<UserControlledList key='user_prods' name={name}/>);

    // tabsTitles.push('created');
    // tabContent.push(<UserCreatedList key='user_prods' name={name}/>);

    return (
        <Tabs tabsTitles={tabsTitles} tabsClass='tabs--voting' contentClass='tabs--voting_content'>
            {tabContent}
        </Tabs>
    )
};
