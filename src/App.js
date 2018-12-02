import React, { Component } from 'react'
import './App.css'
import Search from './Search'
import Table from './Table'
import Button from './Button'
import axios from 'axios'

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100';
const PATH_BASE = "http://hn.algolia.com/api/v1";
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage='
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}`;

console.log(url);


const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());
class App extends Component {
  // _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null
    };
    this.needToSearchTopStories = this.needToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  needToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits }
      }
    })
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }));
  }

  componentDidMount() {
    this._isMounted = true
    const { searchTerm } = this.state
    this.setState({ searchKey: searchTerm })
    this.fetchSearchTopStories(searchTerm)
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  onSearchSubmit(event) {
    // axios.get('https://www.reddit.com/r/GoneWildHairy/top.json', { responseType: 'json' }).then(response => {
    //   const tab = (response.data.data.children)
    //   console.log(tab)
    //   for (let i = 0; i < tab.length; i++) {
    //     console.log(tab[i].data.url)
    //   }
    // });
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm })
    if (this.needToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }


  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    const oldHits = results && results[searchKey]
      ? results[searchKey].hits : [];


    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }
  render() {
    const {
      searchTerm,
      results,
      searchKey,
      error
    } = this.state;
    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    if (!results) { return null; }
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
      </Search>
        </div>
        {error
          ? <div className='interactions'>
            <p>Something wen wrong.</p>
          </div>
          : <Table
            list={list}
            onDismiss={this.onDismiss}
          />
        }
        <div className='interactions'>
          <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            More
        </Button>
        </div>
      </div>
    );
  }
}


export default App;