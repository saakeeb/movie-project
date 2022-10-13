import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import _ from 'lodash';
import PropTypes from 'prop-types';

const PaginationComp = (props) => {
    const { 
        numberOfPageContainInArray,
        currentPage,
        onPageChange,
        onNextPage,
        onPrevPage,
        onFirstPage,
        onLastPage
    } = props;
    const pageArray = _.range(1, numberOfPageContainInArray + 1);

    return (
        <>
            {
                pageArray.length > 1 ? (
                    <Pagination className="justify-content-end me-3 mt-4">
                        <Pagination.First onClick={onFirstPage}/>
                        <Pagination.Prev onClick={onPrevPage}/>
                        {
                            pageArray.map(page =>
                                <Pagination.Item
                                    className={currentPage === page ? 'active' : ''}
                                    key={page}
                                    onClick={() => onPageChange(page)}
                                >
                                    {page}
                                </Pagination.Item>
                            )
                        }
                        <Pagination.Next onClick={onNextPage}/>
                        <Pagination.Last onClick={onLastPage}/>
                    </Pagination>
                ) : (
                    null
                )
            }
        </>
    );
};

PaginationComp.propTypes = {
    numberOfPageContainInArray: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onNextPage: PropTypes.func.isRequired,
    onPrevPage: PropTypes.func.isRequired,
    onFirstPage: PropTypes.func.isRequired,
    onLastPage: PropTypes.func.isRequired,
}

export default PaginationComp;