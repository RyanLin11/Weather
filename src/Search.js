import React from 'react';

const google = window.google;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.placeInput = React.createRef();
  }

  componentDidMount() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.placeInput.current, 
      {
        types: ['(cities)'],
        fields: ['place_id', 'geometry', 'name']
      }
    );
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      this.placeInput.current.value = '';
      this.placeInput.current.focus();
      this.props.changeCity(place);
    });
  }

  render() {
    return (
      <div>
        <input ref={this.placeInput} type='text' />
      </div>
    );
  }
}

export default Search;