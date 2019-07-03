import { backgroundColor, textColor } from 'modules/shared/components/theme';
import React from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';

export const SearchBar = props => {
    const { handleSearch, ...rest } = props;

    const debouncedEvent = (...args) => {
        const debounceEvent = debounce(...args);
        return e => {
            e.persist();
            return debounceEvent(e);
        }
    }

    const handleChange = e => {
        const { target: { value } } = e;
        handleSearch(value);
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
                        onChange={debouncedEvent(handleChange, 600)}
                        className="form-control rounded-0"
                        id="search-bar"
                        {...rest} />
                </Div>
            </div>
        </div>
    );
}