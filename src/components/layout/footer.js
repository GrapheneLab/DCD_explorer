import React from 'react';
import {IconGithub} from "../../svg";
import Translate from "react-translate-component";
import {socialLink} from "../data_temp";
import {Socials} from "../helpers/socials";
import {Link} from "react-router-dom";

const apiNode = [
    {name: 'TeamGreymass', link: 'https://greymass.com/'},
    {name: 'Team BLCKCHND', link: 'http://eos.blckchnd.com/'},
];

export const Footer = () => {
    return (
        <div className='footer'>
            <p className="copyright">
                <Translate content="footer.text" className="text--grey text--md"
                           teamLink={<a href='http://eos.blckchnd.com/' target="_blank" rel="noopener" className='link--ghost text--light'>BLCKCHND TEAM</a>}
                           prodLink={<Link to='/accounts/blockchained' className='link--ghost text--light'>blockchained</Link>}
                />
                <Translate content="footer.provided" className="text--grey text--md provided" links={
                    apiNode.map(el => <a href={el.link} key={el.name} target="_blank" rel="noopener" className='link--ghost text--light'>{el.name}</a>)
                }/>
                <Translate content="footer.copyright" className="text--grey text--md" link={
                    <a href="http://eos.blckchnd.com/" target="_blank" rel="noopener" className="text--light">EOS.BLCKCHND</a>
                } />
            </p>
            <div className="social">
                <Socials data={socialLink}/>
                <a href='https://github.com/blckchnd' target="_blank" rel='noreferrer' aria-label="github-Blckchnd" className='social__link'><IconGithub/><span>Blckchnd</span></a>
                <a href='https://github.com/graphenelab' target="_blank" rel='noreferrer' aria-label="github-GrapheneLab" className='social__link'><IconGithub/><span>Graphenelab</span></a>
            </div>
        </div>
    );
};
