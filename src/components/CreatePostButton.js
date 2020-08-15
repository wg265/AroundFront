import React, {Component} from 'react';
import {Modal, Button, message} from 'antd';
import CreatePostForm from "./CreatePostForm";
import {TOKEN_KEY, API_ROOT, AUTH_HEADER, POS_KEY} from "../constants";

class CreatePostButton extends Component {
    state = {
        visible: false,
        confirmLoading: false,
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = e => {
        console.log('ok');
        this.form.validateFields((err, values) => {
            if (!err) {
                const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
                const token = localStorage.getItem(TOKEN_KEY);
                const formData = new FormData();
                formData.set('lat', lat);
                formData.set('lon', lon);
                formData.set('message', values.message);
                formData.set('image', values.image[0].originFileObj);
                this.setState({
                    confirmLoading: true
                });
                fetch(`${API_ROOT}/post`, {
                    method: 'POST',
                        headers: {Authorization: `${AUTH_HEADER} ${token}`},
                        body : formData
                }).then((response)=> {
                    if (response.ok) {
                        return this.props.loadNearbyPosts();
                    }
                    throw new Error('Failed to create post.');
                }).then(() => {
                        this.setState({visible: false, confirmLoading: false});
                        this.form.resetFields();
                        message.success('Post created successfully');
                    }).catch((e) => {
                        console.error(e);
                        message.error('Failed to create post.');
                        this.setState({confirmLoading: false});
                    });
            }
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    getFormRef = (formInstance) => {
        this.form = formInstance;
    }
    render() {
        const {confirmLoading, visible} = this.state;
        return (
            <div>
            <Button type="primary" onClick={this.showModal}>
                Create Post
            </Button>
            <Modal
        title="Create New Post"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="Create"
        confirmLoading={confirmLoading}
        //confirmLoading={confirmLoading}
            >
                <CreatePostForm ref = {this.getFormRef}/>
    </Modal>
        </div>

        );
    }

}

export default CreatePostButton;