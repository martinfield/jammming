import React from 'react';


class Track extends React.Component {
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.state = {
            trackAnalysis: {}
        }
    }
    renderAction(){
        if (this.props.isRemoval) {
            return <button className="Track-action" onClick={this.removeTrack}>-</button>
        } else {
            return <button className="Track-action" onClick={this.addTrack}>+</button>
        }
    }
    addTrack(){
        this.props.onAdd(this.props.track);
    }
    removeTrack(){
        this.props.onRemove(this.props.track);
    }
    async componentDidMount(){
        const result = await this.props.audioFeatures(this.props.track.id)
        this.setState({
            trackAnalysis: result
        })
    }
    render(){
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album} | {`${this.state.trackAnalysis.tempo} BPM`} | {this.state.trackAnalysis.key} </p>
                </div>
                {this.renderAction()} 
            </div>
        );
    }
}

export default Track;