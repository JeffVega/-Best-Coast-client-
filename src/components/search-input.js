import React from 'react';
import {connect} from 'react-redux';
import { fetchSearchApi } from '../actions/protected-data';
import '../css/search.css'
export class Search extends React.Component {
  onSubmit(event) {
    event.preventDefault();
    const search = document.getElementById("searchInput").value;
    this.props.dispatch(fetchSearchApi(search));
  }

  render() {
    return (
      <div className={"search"}>
        <form className={'form-search'}onSubmit={event => this.onSubmit(event)}> 
          <input
            type="text"
            className={'search-input'}
            id="searchInput"
            placeholder="E.g. Restaurants in San Francisco"
          /> 
          <button className={"search-button"} type="submit">Search</button>

        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  protectedData: state.protectedData.data
});

export default connect(mapStateToProps)(Search);