import React from 'react';
import './searchBar.css';

interface ISearchBarProps {
  placeholder: string;
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

  handleClearClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    this.setState({ value: '' });
  };

  componentWillUnmount = () => {
    localStorage.setItem('searchBarValue', this.state.value);
  };

  render() {
    return (
      <div className="search-container">
        <button className="button search-button"></button>
        <input
          className="search"
          type="text"
          value={this.state.value}
          placeholder={this.props.placeholder}
          autoComplete="off"
          onChange={this.handleChange}
        />
        <button className="button clear-button" onClick={this.handleClearClick}></button>
      </div>
    );
  }
}

export default SearchBar;
