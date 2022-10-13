import { faHeart, faHeartbeat} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const WishLike = (props) => {
    // console.log('props', props);
    return (
        <div>
            <FontAwesomeIcon
                icon={props.movie.loveIcon ? faHeart : faHeartbeat}
                onClick={() => props.onClick(props.movie)}
                style={{cursor: 'pointer'}}
            />
        </div>
    );
};

export default WishLike;