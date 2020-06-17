import React from 'react';

const Sort = (props) => {
  return <small>{props.sort}</small>
}

export default props => {
  return (
    <table className="table">
      <thead>
        <tr>
			<th onClick={props.onSort.bind(null, 'id')}>
				ID {props.sortField === 'id' ? <Sort sort={props.sort}/>:null}
			</th>
			<th onClick={props.onSort.bind(null, 'firstName')}>
				First Name {props.sortField === 'firstName' ? <Sort sort={props.sort}/>:null}
			</th>
			<th onClick={props.onSort.bind(null, 'lastName')}>
				Last Name {props.sortField === 'lastName' ? <Sort sort={props.sort}/>:null}
			</th>
			<th onClick={props.onSort.bind(null, 'email')}>
				Email {props.sortField === 'email' ? <Sort sort={props.sort}/>:null}
			</th>
			<th onClick={props.onSort.bind(null, 'phone')}>
				Phone {props.sortField === 'phone' ? <Sort sort={props.sort}/>:null}
			</th>
        </tr>
      </thead>
      <tbody>
		{
			props.data.map(item => {
				return <tr key={item.id + item.phone} onClick={props.onRowSelect.bind(null, item)} >
					<td>{item.id}</td>
					<td>{item.firstName}</td>
					<td>{item.lastName}</td>
					<td>{item.email}</td>
					<td>{item.phone}</td>
				</tr>
			})
		}
      </tbody>
    </table>
	);
}