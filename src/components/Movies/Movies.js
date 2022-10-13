import React, { useEffect, useState } from 'react';
import { getMovies } from '../../services/fakeMovieService';
import { getGenres } from '../../services/fakeGenreService';
import { paginate } from '../../utils/Paginate';
import ListGroupComp from '../common/ListGroupComp';
import PaginationComp from '../common/PaginationComp';
import '../global/main.css'
import MoviesTable from '../MoviesTable/MoviesTable';
import _, { orderBy } from 'lodash';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    let [loveIcon, setLoveIcon] = useState(false);
    let [pageNumberContainer, setPageNumberContainer] = useState(4);
    let [currentPage, setCurrentPage] = useState(1);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState('');
    const [sortColumn, setSortColumn] = useState({});

    useEffect(() => {
        const genresName = [{ name: 'All Genres', _id: "" }, ...getGenres()];
        setGenres(genresName);
        setMovies(getMovies());
    }, []);

    const filterdMovies = selectedGenres && selectedGenres._id ? movies.filter(m => m.genre._id === selectedGenres._id) : movies;
    const sortedMovies = _.orderBy(filterdMovies, [sortColumn.path], [sortColumn.order]);
    const numberOfPageContainInArray = Math.ceil(filterdMovies.length / pageNumberContainer);
    const paginateMovies = paginate(sortedMovies, currentPage, pageNumberContainer);

    const handleDeleteMovie = (movie) => {
        const newMovies = movies.filter(m => m._id !== movie._id);
        setMovies(newMovies);
    }

    const handleWishList = (movie) => {
        const newMovies = [...movies];
        const newWishIcon = newMovies.find(m => m._id === movie._id);
        newWishIcon.loveIcon = !newWishIcon.loveIcon;
        setMovies(newMovies);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handlePageNext = () => {
        if (currentPage >= 1 && currentPage < numberOfPageContainInArray) {
            currentPage += 1;
            setCurrentPage(currentPage);

        }
    }
    const handlePagePrev = () => {
        if (currentPage > 1 && currentPage <= numberOfPageContainInArray) {
            currentPage -= 1;
            setCurrentPage(currentPage);

        }
    }

    const handlePageFirst = () => {
        if (currentPage > 1 ) {
            currentPage = 1;
            setCurrentPage(currentPage);

        }
    }

    const handlePageLast = () => {
        if (currentPage < numberOfPageContainInArray) {
            currentPage = numberOfPageContainInArray;
            setCurrentPage(currentPage);

        }
    }

    const handleGenresChange = genre => {
        setSelectedGenres(genre);
        setCurrentPage(1);
    }

    const handleTableSort = sortColumn => {
        // const tableSort = { path, order: 'asc' };
        // tableSort.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        setSortColumn(sortColumn);
    }

    return (
        <>
            <div className="row m-1">
                <div className='col-sm-12 col-md-3 col-lg-2 my-3'>
                    <ListGroupComp
                        onGenresChange={handleGenresChange}
                        genres={genres}
                        selectedGenres={selectedGenres}
                        // textProperty='name'
                        // valueProperty='_id'
                    />
                </div>
                <div className='col'>
                    {
                        filterdMovies.length ? (
                            <>
                                <h3>There {filterdMovies.length > 1 ? 'are ' + filterdMovies.length + ' movies' : 'is ' + filterdMovies.length + ' movie'} in the database.</h3>
                                <MoviesTable
                                    paginateMovies={paginateMovies}
                                    onWishList={handleWishList}
                                    onDeleteMovie={handleDeleteMovie}
                                    onTableSort={handleTableSort}
                                    sortColumn={sortColumn}
                                />
                                <PaginationComp
                                    movies={filterdMovies}
                                    onPageChange={handlePageChange}
                                    onNextPage={handlePageNext}
                                    onPrevPage={handlePagePrev}
                                    onFirstPage={handlePageFirst}
                                    onLastPage={handlePageLast}
                                    currentPage={currentPage}
                                    numberOfPageContainInArray={numberOfPageContainInArray}
                                />
                            </>
                        ) : (
                            <h3>There is no movies in the database.</h3>
                        )
                    }
                </div>
            </div>
        </>
        
    );
};

export default Movies;