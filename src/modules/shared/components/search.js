import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { backgroundColor, textColor } from 'modules/shared/components/theme';

export const SearchBar = props => {
    const { handleSearch, ...rest } = props;
    const delayedSearch = () => {
        _.debounce(handleSearch, 400)
    }

    const handleChange = (e) => {
        //This will ensure that the event is not pooled
        e.persist()
        const { target: { value } } = e;
        delayedSearch(value);
    }

    const Div = styled.div`
        font-size: 16px;
        background-color: ${backgroundColor};
        color: ${textColor};

        .form-control {
            outline: none;
            border: 2px solid #e5e4e1;
            border-top: 0px;
            border-left: 0px;
            border-right: 0px;

            &:focus {
                box-shadow: none;
                border-color:none;
            }
        }
    `;

    return (
        <div className="col-12 pb-5 pt-4 justify-content-center">
            <div className="row justify-content-center">
                <Div className="col-10 p-3 rounded-pill">
                    <input
                        onChange={handleChange}
                        className="form-control rounded-0"
                        id="search-bar"
                        {...rest} />
                </Div>
            </div>
        </div>
    );
}