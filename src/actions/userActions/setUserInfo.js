import {dateToLocal} from "../index";

function UserInfo(){
    this.name = '';
    this.created = '';
    this.creator = '';
    this.avatar = '';
    this.site = '';
    this.socials = false;
}

export const handleProducerJSON = (data) => {
    const result = {
        avatar: '',
        website: '',
        socials: {}
    };

    let jsonData = '';

    try {
        jsonData = data.indexOf('<') < 0 ? JSON.parse(data.split('\n').join('')) : false;
    } catch (err) {
        jsonData = false;
    }

    if(jsonData){
        let json = jsonData.org;
        result.website = json.website;
        result.avatar = json.branding.logo_256;
        result.socials = json.social;
    }

    return result;
};

export const setUserInfo = async (data, creator, producer, proxy) => {
    const result = new UserInfo();

    let avatar = '';
    let site = '';
    let proxySocials = {};
    let producerSocials = {};

    // if(producer && producer.bp){
    //     let producerData = handleProducerJSON(producer.bp);
    //     avatar = producerData.avatar;
    //     producerSocials = producerData.socials ? producerData.socials : {};
    //     site = producerData.website;
    // }

    if(proxy){
        const socials = ['steemit', 'telegram', 'twitter'];
        avatar = avatar ? avatar : proxy.logo_256;
        site = site ? site : proxy.website;
        proxySocials = socials.some(elem => proxy.hasOwnProperty(elem))
            ? {
                steemit: proxy.steemit,
                telegram: proxy.telegram,
                twitter: proxy.twitter
            }
            : {}
    }

    const socials = {...proxySocials, ...producerSocials};

    result.name = data.account_name;
    result.created = dateToLocal(data.created);
    result.creator = creator;
    result.avatar = avatar;
    result.site = site;
    result.socials = Object.values(socials).length ? socials : false;

    return result;
};
