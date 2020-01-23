import React from 'react';
import { css } from '@emotion/core';
// First way to import
import { RingLoader } from 'react-spinners';

 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
    margin-top: 150px;
    border-color: red;
`;
 
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      
      <div className='sweet-loading'>
        <RingLoader
          css={override}
          sizeUnit={"px"}
          size={80}
          color={'#4A90E2'}
          loading={this.state.loading}
        />
         
      </div> 
    )
  }
}