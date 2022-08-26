import { useEffect, useRef } from 'react';

const google = window.google;

function Search(props) {
    const placeInput = useRef();

    useEffect(() => {
        const autocomplete = new google.maps.places.Autocomplete(
            placeInput.current, 
            {
                types: ['(cities)'],
                fields: ['place_id', 'geometry', 'name']
            }
        );
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            placeInput.current.value = '';
            placeInput.current.focus();
            props.onPlaceChange(place);
        });
        return () => {
            google.maps.event.clearInstanceListeners(placeInput);
        }
    }, []);

    return (
        <div>
            <input ref={placeInput} type='text' />
        </div>
    )
}

export default Search;