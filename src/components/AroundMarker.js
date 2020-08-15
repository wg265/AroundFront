import React, {Component} from 'react';
import {Marker, InfoWindow} from "react-google-maps";
import PropTypes from 'prop-types';
import blueMarkerUrl from '../assets/images/blue-marker.svg';
class AroundMarker extends Component {
    static propTypes = {
        post : PropTypes.object.isRequired,
    }
    state = {
        isOpen : false
    };
    render() {
        const {url, user, message, location, type} = this.props.post;
        const {lat, lon} = location;
        const isImagePost = type === 'image';
        const customIcon = isImagePost ? undefined : {
            url : blueMarkerUrl,
            scaledSize : new window.google.maps.Size(26, 41),
        };
        return (
            <Marker
                position = {{lat : lat, lng : lon}}
                onMouseOver={isImagePost ? this.handleToggle : undefined}
                onMouseOut = {isImagePost ? this.handleToggle : undefined}
                icon = {customIcon}
                onClick = {isImagePost ? undefined : this.handleToggle}>
                {   this.state.isOpen ? (
                    <InfoWindow>
                        <div>
                            {isImagePost
                            ? <img src = {url} alt = {message} className = "around-marker-image"/>
                            : <video src = {url} controls className = "around-marker-video"/> }
                        <p>{`${user}:${message}`}</p>
                        </div>
                    </InfoWindow>
                    ) : null}
            </Marker>
        );
    }
    handleToggle = () => {
        this.setState((preState) => ({isOpen: !preState.isOpen}));
    }
}

export default AroundMarker;