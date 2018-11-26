import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { tooltipHeader } from '../../utils/data_table';
import { capitaliseText } from '../../utils/general';
import { map } from 'lodash';
import $ from 'jquery'

export default class WaiverPicksTable extends Component {
  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip();
  }

  render () {
    const data = this.props.waiver_picks;

    const pickNumberOptions = map(data, (waiverPick) => {
      const pickNumber = waiverPick.pick_number
      return (
          <option key={ pickNumber } value={ pickNumber }>{ pickNumber }</option>
      )
    });

    const columns = [
      {
        text: 'ID',
        dataField: 'id',
        hidden: true,
        editable: false,
      }, {
        text: 'Pick Number',
        dataField: 'pick_number',
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => {
          if (this.props.status === 'waiver') {
            return (
                <select
                defaultValue={ cell }
                onChange={ (e) => this.props.updateWaiverPickOrder(row.id, e.target.value) }
              >
                    { pickNumberOptions }
                </select>
            )
          } else {
            return cell
          }
        },
        headerFormatter: tooltipHeader,
      }, {
        text: 'Out',
        dataField: 'out_last_name',
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => {
         return `${ cell } (${ row.out_team_short_name })`;
        },
        headerFormatter: tooltipHeader,
      }, {
        text: 'In',
        dataField: 'in_last_name',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
        formatter: (cell, row) => {
         return `${ cell } (${ row.in_team_short_name })`;
        },
      }, {
        text: 'Position',
        dataField: 'singular_name_short',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
      }, {
        text: 'Status',
        dataField: 'status',
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => { return capitaliseText(cell) },
        classes: (cell, row, rowIndex, colIndex) => { return cell },
        headerFormatter: tooltipHeader,
      }, {
        text: 'Delete',
        dataField: 'id',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
        hidden: this.props.status !== 'waiver',
        formatter: (cell, row) => {
         return <button onClick={ (e) => this.props.deleteWaiverPick(row) }>Delete</button>;
        },
      }
    ];

    return (
        <div>
            <BootstrapTable
          keyField='id'
          data={ data }
          columns={ columns }
          striped
          hover
        />
        </div>
    );
  }
}
