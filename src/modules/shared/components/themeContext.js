import React from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

const SCustomThemeProvider = props => {
    const { shared: { mode }, children, } = props;

    const Wrapper = styled.div`
    .bg-gold {
        background-color: #d79922;
    }

    .text-gold {
       color: #d79922; 
    }
    
    .bg-gold-dull {
        background-color: #efe2ba;
    }

    .bg-blue-brand {
        background-color: #66fcf1;
    }

    .text-blue-brand {
        color: #66fcf1;
    }

    .bg-grey-100 {
        background-color: #fcfcfc;
    }
    .text-grey-100 {
        color: #fcfcfc;
    }
     .bg-grey-200 {
        background-color: #f9f9f9;
    }
     .bg-grey-300 {
        background-color: #edecea;
    }
     .bg-grey-400 {
        background-color: #e5e4e1;
    }
     .bg-grey-500 {
        background-color: #e3e2df;
    }
     .bg-grey-600 {
        background-color: #cfcecb;
    }
     .bg-grey-700 {
        background-color: #bab9b7;
    }
     .bg-grey-800 {
        background-color: #a6a5a3;
    }
     .bg-grey-900 {
        background-color: #3e3e3d;
    }

    .text-grey-900 {
        color: #3e3e3d;
    }

     .bg-blue-100 {
        background-color: #b9c1dc;
    }
     .bg-blue-200 {
        background-color: #8593c3;
    }
     .bg-blue-300 {
        background-color: #7484ba;
    }
     .bg-blue-400 {
        background-color: #6274b2;
    }
     .bg-blue-500 {
        background-color: #4056a1;
    }
     .bg-blue-600 {
        background-color: #3b4f93;
    }
     .bg-blue-700 {
        background-color: #354784;
    }
     .bg-blue-800 {
        background-color: #232f58;
    }
     .bg-blue-900 {
        background-color: #12182c;
    }

    .text-900 {
       color: #12182c;
    }
    .text-bio {
        font-family: 'BioRhyme', serif;
    }
  `;

    return (
        <ThemeProvider
            theme={{
                mode: mode
            }}
        >
            <Wrapper>
                {children}
            </Wrapper>
        </ThemeProvider>
    );
};

function mapStateToProps(state) {
    return {
        shared: state.shared,
    }
}

export const CustomThemeProvider = connect(mapStateToProps, null)(SCustomThemeProvider);