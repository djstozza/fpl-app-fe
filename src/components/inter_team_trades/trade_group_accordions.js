import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import { capitaliseText } from '../../utils/general';
import OutTradeGroupTable from './out_trade_group_table';
import InTradeGroupTable from './in_trade_group_table';

export default class TradeGroupAccordions extends Component {
  statusClass (tradeStatus) {
    if (tradeStatus === 'pending') {
      return 'text-white bg-secondary';
    } else if (tradeStatus === 'submitted') {
      return 'text-white bg-primary';
    } else if (tradeStatus === 'approved') {
      return 'text-white bg-success';
    } else if (tradeStatus === 'declined') {
      return 'text-white bg-danger';
    } else if (tradeStatus === 'expired') {
      return 'text-white bg-dark';
    }
  }

  tradeGroupLoop (tradeGroups, type) {
    if (isEmpty(tradeGroups)) {
      return;
    }

    const components = { out: OutTradeGroupTable, in: InTradeGroupTable };
    const Component = components[type];

    let headerText;
    if (type === 'out') {
      headerText = 'Proposed';
    } else {
      headerText = 'Received';
    }

    return (
      <div>
        <h4>{ headerText } Trades</h4>
        <div id={ `${type}-trades-accordion` }>
          {
            Object.keys(tradeGroups).map( (tradeStatus, key) => {
              const tradeStatusKey = `${type}-${tradeStatus}-${key}`

              return (
                <div className="card" key={ tradeStatusKey }>
                  <div
                    className={ `card-header accordion-header ${this.statusClass(tradeStatus)}` }
                    id={key}
                    data-toggle="collapse"
                    data-target={ `#${tradeStatusKey}-body` }
                    aria-expanded="false"
                  >
                    <div className="mb-0">
                      { capitaliseText(tradeStatus) }
                    </div>
                  </div>
                  <div
                    id={ `${tradeStatusKey}-body` }
                    className="collapse"
                    aria-labelledby={ tradeStatusKey }
                    data-parent={ `#${type}-trades-accordion` }
                  >
                    <div className="card-body">
                      {
                        tradeGroups[tradeStatus].map( (tradeGroup, i) => {
                          return (
                            <Component
                              { ...this.props }
                              tradeGroup={ tradeGroup }
                              key={ `${tradeGroup.id}` }
                            />
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

  render () {
    return (
      <div>
        { this.tradeGroupLoop(this.props.out_trade_groups, 'out') }
        { this.tradeGroupLoop(this.props.in_trade_groups, 'in') }
      </div>
    )
  }
}
