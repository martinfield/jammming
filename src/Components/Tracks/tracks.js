import React, { useState, useEffect } from 'react';

const Track = (props) => {
    const [trackAnalysis, setTrackAnalysis] = useState({});

    const renderAction = () => {
        if (props.isRemoval) {
            return <button className="Track-action" onClick={removeTrack}>-</button>
        } else {
            return <button className="Track-action" onClick={addTrack}>+</button>
        }
    };

    const addTrack = () => {
        props.onAdd(props.track);
    };

    const removeTrack = () => {
        props.onRemove(props.track);
    };

    useEffect(() => {
        const getTrackAnalysis = async () => {
          const result = await props.audioFeatures(props.track.id);
          setTrackAnalysis(result);
        };
        getTrackAnalysis();
      }, [props.audioFeatures, props.track.id]);

    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{props.track.name}</h3>
                <p>{props.track.artist} | {props.track.album} | {`${trackAnalysis.tempo} BPM`} | {trackAnalysis.keymode} </p>
            </div>
            {renderAction()}
        </div>
    );
};

export default Track;
