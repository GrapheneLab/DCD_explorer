import {store} from '../../index';
import {setAlert} from "../../dispatch/alertActions";
import {apiUrl} from "../../components/data_temp";

export const getBackendData = async (path, data = '') => false;
// {
//     return fetch(`${apiUrl}${path}`, {
//         method: data ? 'post' : 'get',
//         body: data? JSON.stringify(data) : undefined,
//     })
//         .then(response => response.json())
//         .then(e => {
//             if (e.data && e.data.status !== 'ERROR') {
//                 return e.data
//             } else {
//                 return false
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             store.dispatch(setAlert('backendError'));
//             return false
//         });
// };
