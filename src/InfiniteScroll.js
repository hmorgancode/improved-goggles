import React from 'react';
import axios from 'axios';
import PressRelease from './PressRelease';
import debounce from './debounce';

const GET_LENGTH = 10;
const SCROLL_DEBOUNCE_DURATION_MS = 50;

class InfiniteScroll extends React.Component {
  state = {
    isInitialPageLoad: true,
    isFetching: true,
    loadedPages: 0,
    data: []
  }

  /**
   * Fetches new data if not already fetching and user has
   * scrolled to the bottom.
   */
  updateInfiniteScroll = debounce((e) => {
    if (this.state.isInitialPageLoad ||
        this.state.isFetching ||
        this.scrollBox.scrollTop !== this.scrollBox.scrollHeight - this.scrollBox.offsetHeight) {
      return;
    }

    // Fetch new press releases:
    this.setState({ isFetching: true });
    axios.get(this.props.endpoint, {
      params: {
        limit: GET_LENGTH,
        offset: this.state.loadedPages
      }
    }).then((res) => {
      this.setState({ data: [...this.state.data, ...res.data.news],
                      loadedPages: this.state.loadedPages + res.data.news.length,
                      isFetching: false });
      if (res.data.news.length === 0) {
        console.log('No more releases available.');
      }
    }, (err) => {
      this.setState({ isFetching: false });
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
      this.setState({ isInitialPageLoad: false, isFetching: false, data: res.data.news });
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
