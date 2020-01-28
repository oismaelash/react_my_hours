import React, { Fragment } from 'react'
import {Button, Table} from 'reactstrap';

const DatetimeListTable = props => (
  <Fragment>
    <br></br>
    <h2>Datetime log list</h2>
    <Table>
      <thead>
        <tr>
          {/* <th>Id</th> */}
          <th>Arrival</th>
          <th>Lunch</th>
          <th>Exit</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.datetimesData.length > 0 ? (
          props.datetimesData.map(datetimeData => (
            <tr key={datetimeData.id}>
              {/* <td>{datetime.id}</td> */}
              <td>{datetimeData.date} {datetimeData.arrivalTime}</td>
              <td>{datetimeData.date} {datetimeData.lunchTime}</td>
              <td>{datetimeData.date} {datetimeData.exitTime}</td>
              <td>
                <Button size="md" color='primary' onClick={() => { props.editDatetime(datetimeData)}}>
                  Edit
                </Button>
              </td>
              <td>
                <Button size="md" color='danger' onClick={() => props.deleteDatetime(datetimeData.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No users</td>
          </tr>
        )}
      </tbody>
    </Table>
  </Fragment>
)

export default DatetimeListTable;