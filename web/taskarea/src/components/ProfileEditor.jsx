// ProfileEditor.jsx
import React, {Component} from 'react';
import ImageUploader from 'react-firebase-image-uploader';
import {Button} from 'react-bootstrap'
import {observer} from 'mobx-react';

import {auth, storage, db} from '../firebase';

@observer
export default class ProfileEditor extends Component {

    constructor() {
        super();
        this.state = {
            username: auth.currentUser.displayName,
            avatar: '',
            isUploading: false,
            progress: 0,
            avatarURL: auth.currentUser.photoURL,
        };
    }

    handleChangeUsername = (event) => {
        this.setState({username: event.target.value});
    };

    handleUploadStart = () => {
        this.setState({isUploading: true, progress: 0});
    };

    handleProgress = (progress) => {
        this.setState({progress});
    };

    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    };

    handleUploadSuccess = (filename) => {
        this.setState({avatar: filename, progress: 100, isUploading: false});
        storage.ref('images').child(filename)
            .getDownloadURL()
            .then(url => {
                this.setState({avatarURL: url});
            });
    };

    onSubmit = (e) => {
        e.preventDefault();
        db.ref(`users/${auth.currentUser.uid}`).set({
            name: this.state.username,
            photoURL: this.state.avatarURL,
        });
        auth.currentUser.updateProfile({
            photoURL: this.state.avatarURL,
            displayName: this.state.username,
        }).then(()=> {
            this.props.history.go(`/user/${auth.currentUser.uid}`);
        });
    };

    onCancelClick = () => {
        this.props.history.go(`/user/${auth.currentUser.uid}`);
    };

    render() {
        const isSubmitEnabled = this.state.progress === 100 || this.state.username !== auth.currentUser.displayName;
        return (
            <div className='feed profile-editor'>
                <form onSubmit={this.onSubmit}>
                    <p>
                        <label>Username:</label>
                        <input type='text'
                            value={this.state.username}
                            name='username'
                            onChange={this.handleChangeUsername} />
                    </p>
                    <div>
                        <label>Avatar:</label>
                        {this.state.isUploading &&
                            <p>Progress: {this.state.progress}</p>
                        }
                        {this.state.avatarURL &&
                            <img className='avatar-image' src={this.state.avatarURL} />
                        }
                        <span className='image-uploader'>
                            <ImageUploader
                                name='avatar'
                                storageRef={storage.ref('images')}
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                                onProgress={this.handleProgress} />
                        </span>
                    </div>
                    <Button disabled={!isSubmitEnabled} bsStyle='primary' type='submit'>Save changes</Button>
                    <Button bsStyle='primary' onClick={this.onCancelClick}>Cancel</Button>
                </form>
            </div>
        )
    }
};

ProfileEditor.propTypes = {
    history: React.PropTypes.object.isRequired,
}