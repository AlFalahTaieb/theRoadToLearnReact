import React, { Component } from 'react';


class Dev extends Component {
  render() {
      let Taieb = {
        name:'tibon',
        job:'Developer JS'
      }
      const list = [
        {
          title:'React',
          url:'https://reactjs.org',
          author:'Jordan Walke',
          num_comments:'2',
          points:4,
          objectId:2
        },
        {
          title:'Redux',
          url:'https://redux.js.org',
          author:'Dan Abramov, Andrew Clar',
          num_comments:'2',
          points:5,
          objectId:1
        }
    ]
    return(
        console.log('he')
    )
  }
}

export default Dev;
