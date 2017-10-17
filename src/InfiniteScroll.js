import React from 'react';
import axios from 'axios';
import PressRelease from './PressRelease';
import debounce from './debounce';

const GET_LENGTH = 10;
const SCROLL_DEBOUNCE_DURATION_MS = 100;

class InfiniteScroll extends React.Component {
  state = {
    isInitialPageLoad: true,
    loadedPages: 0,
    data: []
  }

  updateInfiniteScroll = debounce((e) => {
    const box = this.scrollBox;
    // If we haven't scrolled to the very bottom, do nothing.
    if (box.scrollTop !== box.scrollHeight - box.offsetHeight) {
      return;
    }

    // Fetch new press releases:
    axios.get(this.props.endpoint, {
      params: {
        limit: GET_LENGTH,
        offset: this.state.loadedPages
      }
    }).then((res) => {
      this.setState({ data: [...this.state.data, ...res.data.news],
                      loadedPages: this.state.loadedPages + res.data.news.length });
    }, (err) => {
      console.error(err);
    });
  }, SCROLL_DEBOUNCE_DURATION_MS)

  componentDidMount() {
    // Get our starting data
    axios.get(this.props.endpoint, {
      params: {
        limit: GET_LENGTH,
        offset: 0
      }
    }).then((res) => {
      this.setState({ isInitialPageLoad: false, data: res.data.news });
    }, (err) => {
      console.error(err);
    });
  }


  render() {
    if (this.state.isInitialPageLoad) {
      return (
        <div id="infinite-scroll" className="box">
          {
            new Array(10).map((val, index) => <PressRelease key={index} title='...' published='...' />)
          }
        </div>
      );
    }

    return (
      <div id="infinite-scroll" className="box"
           onScroll={this.updateInfiniteScroll} ref={(div) => {this.scrollBox = div;}} >
        {this.state.data.map((pressRelease, index) => <PressRelease key={index} {...pressRelease} />)}
      </div>
    );
  }
}

export default InfiniteScroll;
