import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import DropZone from 'react-dropzone';

export default class ImagesComponent extends Component {

  render() {
    const { value: file, onChange: handleDrop } = this.props;

    return(
      <DropZone onDrop={files => handleDrop(files[0])} className='image-preview-dropzone'>
        <figure className='image-preview'
                style={{backgroundImage: `url(${file.preview || file.url})`, height:146, borderRadius:8}}/>
      </DropZone>
    )
  }
}
