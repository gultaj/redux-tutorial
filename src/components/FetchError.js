import React from 'react';

const style = {
    color: 'red'
};


const FetchError = ({message, onRetry}) => (
    <div>
        <p style={style}>Could not fetch todos. {message}</p>
        <button onClick={onRetry}>Retry</button>
    </div>
);

export default FetchError;