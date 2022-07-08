import React from 'react';

const SearchBox = (props)=>{
    const debounce = (func) => {
        let timer;
        return function(...args){
            const context = this;
            if(timer) clearTimeout(timer);
            timer = setTimeout(()=>{
                func.apply(context,args);
            },500);
        }
    }

    const handleChange = (event) => props.setSearchValue(event.target.value);

    const optimizedVersion = debounce(handleChange);

    return(
        <div className='col col-sm-4'>
            <input className='form-control' 
            value={props.value}
            onChange={optimizedVersion}
            placeholder="Type to search..."
            >

            </input>
        </div>
    );
}


export default SearchBox;