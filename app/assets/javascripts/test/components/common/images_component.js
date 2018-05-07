import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import DropZone from 'react-dropzone';
import http from '../../services/http';

export default class ImagesComponent extends Component {
  state = {
    files: []
  };

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    if (value instanceof Array) {
      this.setState({
        files: value
      })
    }
  }

  updateParent() {
    const { update } = this.props;
    const { files } = this.state;
    update(files);
  }

  handleDrop = files => {
    this.setState({
      files: [...this.state.files, ...files]
    }, this.updateParent)
  };

  handleRemove = file => {
    const { files } = this.state;
    this.setState({
      files: files.map(item => {
          if(item == file) {
              console.log('2312')
              return {...item, _destroy: true}
          }
          return item
      })
    }, this.updateParent);
    console.log(this.state)
  };

  render() {
    const { files } = this.state;

    return(
      <div>
        {
          files.filter(item => !item._destroy).map((file,i) => {
            return (
              <Col xs={6} md={3} key={i}>
                <figure className='image-preview' style={{backgroundImage: `url(${file.preview || file.url})`}}>
                  <span className="remove-image" onClick={ () => this.handleRemove(file) }>&times;</span>
                </figure>
              </Col>
            )
          })
        }
        <Col xs={6} md={3}>
          <DropZone onDrop={this.handleDrop} className='image-preview-dropzone' />
        </Col>
      </div>
    )
  }
}
