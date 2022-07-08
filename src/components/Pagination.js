import React from 'react';

const Pagination = ({moviesPerPage, totalMovies, paginate}) => {
    const PageNumbers= [];

    for(let i=1; i<= Math.ceil(totalMovies/moviesPerPage); i++){
        PageNumbers.push(i);
    }
    
  return (
    <nav>
             <ul className='pagination'>
                {PageNumbers.map(number => (
                    <li key={number} className='page=item'>
                        <a onClick={() => paginate(number)} href="#" className='page-link'>{number}</a>
                    </li>
                    
                ))}
            </ul> 
    </nav>
  );
};

export default Pagination;