import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ListGroupComp = (props) => {
    const {
        onGenresChange,
        genres,
        textProperty,
        valueProperty,
        selectedGenres
    } = props;
    //with this textProperty, valueProperty we can assign dynamic value to the props
    return (
        <ListGroup as="ul">
            {
                genres.map((genre) => 
                    <ListGroup.Item
                        key={genre[valueProperty]}
                        as="li"
                        onClick={() => onGenresChange(genre)}
                        className={genre === selectedGenres ? 'active' : ''}
                        style={{ cursor: 'pointer' }}
                    >
                        {genre[textProperty]}
                    </ListGroup.Item>
                )
            }
        </ListGroup>
    );
};

ListGroupComp.defaultProps = {
    textProperty:'name',
    valueProperty:'_id'
}

export default ListGroupComp;