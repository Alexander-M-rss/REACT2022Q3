import React from 'react';
import './searchBar.css';

const SEARCH_BAR_HEIGHT = '36px';
const MARGIN_TOP_BOTTOM = '10px';
export const SEARCH_HEIGHT = `${SEARCH_BAR_HEIGHT} + 2 * ${MARGIN_TOP_BOTTOM}`;

interface ISearchBarProps {
  placeholder: string;
  searchHandler: (search: string) => void;
}

interface ISearchBarState {
  value: string;
}

class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {
  constructor(props: ISearchBarProps) {
    super(props);
    const savedValue = localStorage.getItem('searchBarValue');
    this.state = { value: savedValue || '' };
  }

  handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ value: event.target.value });
  };

  handleClearClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    this.setState({ value: '' });
  };

  componentWillUnmount = () => {
    localStorage.setItem('searchBarValue', this.state.value);
  };

  handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    this.props.searchHandler(this.state.value);
  };

  render() {
    return (
      <form
        className="search-container"
        style={{ height: SEARCH_BAR_HEIGHT, margin: `${MARGIN_TOP_BOTTOM} auto` }}
        data-testid="search-bar"
        onSubmit={this.handleSearchSubmit}
      >
        <input type="submit" className="button search-button"></input>
        <input
          className="search"
          type="text"
          value={this.state.value}
          placeholder={this.props.placeholder}
          autoComplete="off"
          onChange={this.handleChange}
        />
        <button className="button clear-button" onClick={this.handleClearClick}></button>
      </form>
    );
  }
}

export default SearchBar;
