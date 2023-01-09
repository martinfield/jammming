import React from 'react';



class AudioFeature extends React.Component {
    render(){
        return (
            <div>
                {this.props.audioFeatures.map(feature => {
                    return  <p> {feature[0]} | {feature[1]} </p>
                })}
            </div>
        )
        
    }
}



export default AudioFeature;