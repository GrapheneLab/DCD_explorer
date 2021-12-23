import React from 'react';

export const Avatar = ({name, avatar = false}) => (
    <div className={`avatar${!avatar ? ' avatar--hash' : ''}`}>
        <img src={!avatar ? `https://robohash.org/${name}?set=set4` : avatar} alt={`${name ? name : 'account'} avatar`} />
    </div>
);
