import React from 'react';

const AudioFeature = ({ audioFeatures }) => {
    return (
        <div>
            {audioFeatures.map(feature => {
                return <p>{feature[0]} | {feature[1]}</p>
            })}
        </div>
    )
}

export default AudioFeature;
