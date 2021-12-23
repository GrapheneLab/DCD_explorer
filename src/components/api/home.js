import React, {Fragment} from 'react';
import HyperLink from "../helpers/hyperLink";
import {IconImage} from "../../svg";

const Home = () => (
    <Fragment>
        <h2 className="api__section-title">Welcome to the EOSExplorer Wiki</h2>
        <div className="api__content-block">
            <p className="api__text">This is the community maintained wiki covering all sorts of information on the next-generation peer-to-peer technology platform built by the Ethereum Foundation, including Ethereum, the generalized blockchain for smart contract development, as well as sister protocols like Whisper, the private low-level datagram communication platform, and Swarm, a distributed storage platform and content distribution service.</p>
        </div>
        <h2 className="api__section-title">Issues and pull requests</h2>
        <div className="api__content-block">
            <p className="api__text">If you have a technical issue with a specific client, application or tool, e.g. those listed here, please ask in the Gitter room of that project, and if your issue is still not resolved, post an issue in the repo for that project.</p>
            <HyperLink id="hyperlink">hyperlink</HyperLink>
        </div>
        <h3 className="api__block-title">1. Lorem ipsum</h3>
        <div className="api__content-block">
            <p className="api__code-block">cleos push action eosforumtest post '{<span className="api__code">{'{"poster":"YOURACCOUNT", "post_uuid":"<span>-bp_meeting", "content":"present", "reply_to_poster":"", "reply_to_post_uuid":"", "certify":false, "json_metadata":"" }'}</span>}' -p YOURACCOUNT@active</p>
        </div>
        <h3 className="api__block-title">2. Lorem ipsum</h3>
        <div className="api__content-block">
            <p className="api__code-block">cleos push action eosforumtest post '{<span className="api__code">{'{"poster":"YOURACCOUNT", "post_uuid":"<span>-bp_meeting", "content":"present", "reply_to_poster":"", "reply_to_post_uuid":"", "certify":false, "json_metadata":"" }'}</span>}' -p YOURACCOUNT@active</p>
            <p className="api__picture-block">
                <IconImage />
            </p>
        </div>
        <h2 id="hyperlink" className="api__section-title">Issues and pull requests</h2>
        <div className="api__content-block">
            <p className="api__text">If you have a technical issue with a specific client, application or tool, e.g. those listed here, please ask in the Gitter room of that project, and if your issue is still not resolved, post an issue in the repo for that project.</p>
        </div>
    </Fragment>
);

export default Home
