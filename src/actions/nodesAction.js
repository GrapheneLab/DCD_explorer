import { defaultNodesList } from '../components/data_temp';

export const nodesConnect = (nodes = defaultNodesList) => {
    return Promise.race(
        nodes.map(async link => {
            let error = false,
                id = '---';

            await fetch(`${link}/chain/get_info`, {
                method: 'POST', body: '' })
                .then(response => response.json())
                .then(e => id = e.chain_id)
                .catch(() => error = true);

            if(!error){
                return {link, id};
            }
        })
    ).then(data => {

        if(!data.link){
            throw new Error('no active nodes!');
        }

        return data;
    });

};
