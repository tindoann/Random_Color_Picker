import React, { Component } from 'react';
import { Button } from './Button'; 

// need constructor because every state value needs to be initialzed 
// we are taking the handleClick method and we are setting equal to a verson of itself
// that is bound  to this object which is random 
export default class Random extends Component {
  constructor(props){
      super(props)
      this.state = { 
          color: [0, 25, 237]
      }
      this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
      this.applyColor();
  }
  componentDidUpdate(prevProps, prevState) {
      this.applyColor();
  }
  //formats 'rgb' for DOM
  formatColor(ary) {
      return 'rgb(' + ary.join(', ') + ')';
  }
  //adjusts button color based on this.state.color for background
  isLight() {
      const rgb = this.state.color;
      return rgb.reduce((a,b) => a+b) < 127 * 3;
  }
  // applies background color to body of document
  applyColor() {
      const color = this.formatColor(this.state.color);
      document.body.style.background = color;
  }
  //chooses random numbers for rgb rendering
  chooseColor() {
      const random = [];
      for (let i = 0; i < 3; i++) {
          random.push(Math.floor(Math.random()*256));
      }
      return random;
  }
  // click handler event to choose color when button is clicked
  handleClick(){
      this.setState({ 
        color: this.chooseColor()
      });
    }

  render(){
      return(
          <div>
              <h1 className={this.isLight() ? 'white' : 'black'}>
                  Your color is {this.formatColor(this.state.color)}. 
              </h1>
              <Button onClick={this.handleClick} light={this.isLight()}/>
          </div>
      )
  }
}

// Purpose of this method is to change the page to a random color 
// because the color is a state of random we need to write this method in random
// and pass the funtionality to button

// we want this in button to refer to random because the color is part of the random state
// use bind to lock in a specific object, if we bind the random class to handleClick
// then every this in handleClick would refer to random 

// now that handleClick is bound to random we can pass it down to button 
// to pass it down we'll add it as anothe prop of the button component just like light
// so we'll add onClick equals this handle.handleClick 
// in buttons renders method, we can use that prop we'll assign this prop to onClick
// which is pointing to the handleClick method 


