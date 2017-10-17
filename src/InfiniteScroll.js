import React from 'react';
import axios from 'axios';
import PressRelease from './PressRelease';

class InfiniteScroll extends React.Component {
  state = {
    isLoading: true,
    data: []
  }

  componentDidMount() {
    axios.get(this.props.endpoint, {
      params: {
        limit: 10,
        offset: 0
      }
    }).then((res) => {
      this.setState({ isLoading: false, data: res.data.news });
    }, (err) => {
      console.error(err);
    });
  }


  render() {
    if (this.state.isLoading) {
      return (
        <div>
          {
            new Array(10).map((val, index) => <PressRelease key={index} title='...' published='...' />)
          }
        </div>
      );
    }
    return (
      <div>
        {this.state.data.map((pressRelease, index) => <PressRelease key={index} {...pressRelease} />)}
      </div>
    );
  }
}

export default InfiniteScroll;
