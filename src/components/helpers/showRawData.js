import React from 'react';

const ShowRawData = (data) => <pre className='api__code-block'>{JSON.stringify(data, null, '\t')}</pre>;

export default ShowRawData;
