import React from 'react';
import { Table } from 'react-bootstrap';
import WishLike from '../common/WishLike';

const MoviesTable = (props) => {
    const { paginateMovies, onWishList, onDeleteMovie, onTableSort, sortColumn } = props;

    const handleTableSort = path => {
        const tableSort = { path, order: 'asc' };
        tableSort.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        onTableSort(tableSort);
    }
    
    return (
        <Table hover className='movies-table'>
            <thead>
                <tr>
                    <th onClick={() => handleTableSort('title')}>Title</th>
                    <th onClick={() => handleTableSort('genre.name')}>Genre</th>
                    <th onClick={() => handleTableSort('numberInStock')}>Stock</th>
                    <th onClick={() => handleTableSort('dailyRentalRate')}>Rate</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    paginateMovies.map(movie =>
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td>
                                <WishLike movie={movie} onClick={onWishList} />
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => onDeleteMovie(movie)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    );
};

export default MoviesTable;