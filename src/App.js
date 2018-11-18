import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class understandBinding extends Component {
  constructor(props) {
    super(props);
    this.onClickMe = this.onClickMe.bind(this)
  }
  onClickMe() {
    console.log('hey Oh :) ')
  }
  render() {
    return(
    <button
      onClick={this.onClickMe}
      type="button"
    >
      Click Me
</button>
    )
  }

}

let hello = "Going to Learn React :) Mr  "
let person = {
  name: 'Taieb',
  nam: 'AlFalah',
  job: 'Developer JS',
  age: 25
}
const userService = {
  getUserName(person) {
    return person.name + '' + person.nam
  }
}

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org',
    author: 'Jordan Walke',
    num_comments: '2',
    points: 4,
    objectID: 2
  },
  {
    title: 'ReDux',
    url: 'https://redux.js.org',
    author: 'Dan Abramov, Andrew Clar',
    num_comments: '2',
    points: 5,
    objectID: 1
  }]
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list,
      birth: person.age,
    }
    this.onDismiss = this.onDismiss.bind(this)
  }
  onDismiss(id) {
    const updatedList = this.state.list.filter(item => item.objectID !== id)
    this.setState({ list: updatedList })
    console.log(id)
  }

  render() {
    return (

      <div className="App" >
        <h1>{hello} {person.name} {person.job} {this.state.birth}</h1>
        {this.state.list.map(item => {
          return (
            <div key={item.objectID}>
              <span> <a href={item.url} > {item.title} </a> </span>,
  <span> {item.author} </span>,
  <span> {item.num_comments} </span>,
  <span> {item.points} </span>
              <span>
                <button onClick={() => this.onDismiss(item.objectID)}
                  type='button' >Dismiss</button>
              </span>
            </div>
          )
        })}
        < p > Many people always ask me how I was able to get into Harvard as a 16 year old who skipped 3 grades of high school.They think I got in because of my scholarly records, but no the key is the interview.As I sat in the Harvard Dean's office in front of the board of reviewers for my application, the Dean asks me "Why should you be a good candidate for this school?" They seemed bored but I replied "Well I was born a child prodigy, placed 1st in my state spelling bee for three consecutive years, I can speak eight different languages not counting Latin, play four different instruments, I skipped grades 4 through 6, and graduated my high school as valedictorian at the age of 14. I then worked as an intern at both Telsa, and NASA." Suddenly the room burst into laughter and many of board instantly started scribbling down "No" near the application check marks. The Dean says "Sorry but you are just not the type we are looking for." But then I said "Excuse me but I wasn't finished...I watch Rick and Morty" The Dean looked at me like an idiot and said "So....?" Then I replied with a smile "And I understand all the references and subtle jokes" An audible gasp let out by the board was so loud the secretary had to come in. You could hear a pin drop and then suddenly all at once the entire board clicked their pens on the "Approved Box" and I was instantly handed a diploma and now I'm teaching advanced physicals there. I guess you can say I'm pretty smart. :)</p>

      </div>

    )
  }
}


export default App;
