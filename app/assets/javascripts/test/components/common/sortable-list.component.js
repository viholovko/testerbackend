import React, { Component } from 'react';
import { ActionReorder, NavigationClose } from 'material-ui/svg-icons';

export default class SortableList extends Component {
  dragStart = (e) => {
    this.dragged = e.currentTarget;

    e.dataTransfer.effectAllowed = 'move';

    // Firefox requires calling dataTransfer.setData
    // for the drag to properly work
    // e.dataTransfer.setData("text/html", e.currentTarget);
  };

  dragEnd = (e) => {
    this.dragged.style.display = "block";
    this.placeholder.style.display = 'none';

    var data = this.props.data;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);

    data.splice(to, 0, data.splice(from, 1)[0]);
    this.props.onChange(data);
  };

  dragOver = (e) => {
    this.placeholder.style.display = 'block';
    e.preventDefault();
    this.dragged.style.display = "none";
    let closest = this.closestElement(e.target, 'drag-item');

    if(closest){
      this.over = closest;
    }

    var relY = e.clientY - this.over.getBoundingClientRect().top;
    var height = this.over.offsetHeight / 2;

    if(relY > height) {
      this.nodePlacement = "after";
      this.parent.insertBefore(this.placeholder, this.over.nextElementSibling);
    }else{
      this.nodePlacement = "before";
      this.parent.insertBefore(this.placeholder, this.over);
    }
  }

  closestElement (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }

  render() {
    return (
      <ul
        ref={(input) => { this.parent = input; }}
        onDragOver={this.dragOver}
        style={{listStyleType: 'none', margin: 0, padding: 0, position: 'relative'}}
      >
      {this.props.data.map((item, index) => {
        return (
          <li
            className="drag-item"
            key={index}
            data-id={index}
            draggable="true"
            onDragEnd={this.dragEnd}
            onDragStart={this.dragStart}
            style={{position: 'relative', paddingLeft: '30px'}}
          >
            <ActionReorder style={{position: 'absolute', top: '14px', left: '0px', cursor: 'move'}}/>
            {this.props.row(item, index)}
          </li>);
      })}
      <li ref={(input) => { this.placeholder = input; }} className="placeholder" style={{height: '48px', backgroundColor: 'lightgray', display: 'none'}}></li>
    </ul>)
  }
}