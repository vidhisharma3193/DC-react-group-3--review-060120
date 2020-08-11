import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  constructor(){
    super()
    this.state = {
      sushis: [],
      startIndex: 0,
      eatenSushis: [],
      money: 100
    }
  }

  componentDidMount(){
    fetch(API)
    .then(res => res.json())
    .then(sushis => {
      this.setState({
        // sushis 
        sushis: sushis.map(sushi => {return {...sushi, eaten: false}}) // add a new key and value pair
      })
    })
  }

  nextSushis = () => {

    // if(this.state.startIndex < this.state.sushis.length){
    //   this.setState({
    //     startIndex: this.state.startIndex + 4
    //   })
    // }else{
    //   this.setState({
    //     startIndex: 0
    //   })
    // }

    this.setState({
      startIndex: this.state.startIndex < this.state.sushis.length - 4 ? this.state.startIndex + 4 : 0
    })
    
  }

  eatSushi = (eatenSushi) => {

    if(eatenSushi.price <= this.state.money){
      let newSushiArray = this.state.sushis.map(sushi => {
        if(sushi === eatenSushi){
          return {...sushi, eaten: true}
        }
        return sushi
      })
      // debugger
      // let eatenArray = [...this.state.eatenSushis]
      // eatenArray.push(eatenSushi)  
  
      this.setState({
        sushis: newSushiArray,
        eatenSushis: [...this.state.eatenSushis, eatenSushi],
        money: this.state.money - eatenSushi.price
        // eatenSushis: eatenArray
        // eatenSushis: this.state.eatenSushis.push(eatenSushi) THIS WILL ASSIGN NUMBER TO STATE INSTEAD OF ARRAY
      })
    }
   
  }

  render() {
    let displaySushis = this.state.sushis.slice(this.state.startIndex, this.state.startIndex+4) 
    return (
      <div className="app">
        <SushiContainer 
        sushis={displaySushis}
        nextSushis={this.nextSushis}
        eatSushi={this.eatSushi}  />

        <Table 
        eatenSushis={this.state.eatenSushis}
        money={this.state.money} />
      </div>
    );
  }
}

export default App;