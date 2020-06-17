import React from 'react';
import * as axios from 'axios';
import Loader from './Loader/Loader';
import Table from './Table/Table';
import _ from 'lodash';
import DetailRowView from './DetailRowView/DetailRowView';
import ModeSelector from './ModeSelector/ModeSelector';
import ReactPaginate from 'react-paginate';
import TableSearch from './TableSearch/TableSearch';

// test react app
class App extends React.Component {
 
  state = {
    isModeSelect: false,
    isLoading: false,
    data: [],
    search: '',
    sort: '↑' || '↓', // desc
    sortField: 'id',
    row: null,
    currentPage: 0,
  }
  
  fetchData(url){
    axios.get(url)
    .then(response=>{
        const data = response.data;
        this.setState({
          isLoading: false,
          data: _.orderBy(data, this.state.sortField, this.state.sort)
        });
      }
    );  
  }



  onSort = sortField => {
    const dataCopy = this.state.data.concat();
    const sort = this.state.sort === '↑' ? 'desc' : '↑';
    const data = _.orderBy(dataCopy, sortField, sort);

    this.setState({data,sort,sortField}); 
  }

  onRowSelect = row => {
    this.setState({
      row
    })
  }

  modeSelectHandler = (url) => {
    this.setState({
      isModeSelect: true,
      isLoading: true
    });
    this.fetchData(url);
  }

  onPageChangeHandler = ({selected}) => {
    this.setState({
      currentPage: selected
    });
  }

  searchHandler = search => {
    this.setState({
      search,
      currentPage: 0
    })
  }

  getFilterData(){
    const {data, search} = this.state;
    if(!search ){
      return data;
    }
    return data.filter(
      item => {
        return item["firstName"].toLowerCase().includes(search.toLowerCase())
          || item["lastName"].toLowerCase().includes(search.toLowerCase())
          || item["email"].toLowerCase().includes(search.toLowerCase());
      }
    );
  }

  render() {
    const pageSize = 50;
    const filteredData = this.getFilterData();
    const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage];
    const pageCount = Math.ceil(filteredData.length / pageSize)

    if(!this.state.isModeSelect){
      return (
        <div>
          <ModeSelector onSelect={this.modeSelectHandler}/>
        </div>
      )
    }
    return (
      <div className="container">
        {
          this.state.isLoading 
          ?<Loader /> 
          :<>
            <TableSearch onSearch={this.searchHandler} />
            <Table 
              onSort={this.onSort}
              sort={this.state.sort}
              sortField={this.state.sortField}
              onRowSelect={this.onRowSelect}
              data={displayData}
            />
          </>
        }
        {
          this.state.data.length > pageSize ? <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            onPageChange={this.onPageChangeHandler}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            containerClassName={'pagination'}
            activeClassName={'active'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            nextClassName={'page-item'}
            previousLinkClassName={'page-link'}	
            nextLinkClassName={'page-link'}
            forcePage={this.state.currentPage}
          />
          :null
        }
        {
          this.state.row ? <DetailRowView person={this.state.row}/> : null
        }
      </div>
    );
  }
}

export default App;
