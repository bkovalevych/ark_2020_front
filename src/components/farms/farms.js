import Elements from '../elements/elements';
import React, {useEffect, useState} from 'react'
import {faWarehouse} from '@fortawesome/free-solid-svg-icons'
import {withCookies} from 'react-cookie'
import Cages from './cages'

class Farms extends React.Component {
    constructor(params) {
        super(params);
        this.state = {
            filter: {idFarm: []},
            selectedItems: new Set(),
        }
        this.projectionAdd = ['name', 'location', 'animalKind']
        this.icon = faWarehouse;
        this.collectionName = '/farm'
        this.color = '#d41212'
        this.projection = new Set(['name', 'location', 'animalKind', 'registered', '_id'])
        this._unselectItem = this._unselectItem.bind(this);
        this._setItem = this._setItem.bind(this);
    }


    _setItem(filter, selectedItems, setFilter, setItem, id) {
        return (val) => {
            if (selectedItems.has(val)) {
                this._unselectItem(selectedItems, setItem, filter, setFilter, id)(val)
                return
            }
            filter[id].push(val);
            setFilter(Object.assign({},filter));
            selectedItems.add(val);
            setItem(selectedItems);
        }
    }
    _unselectItem(selectedItems, setItem, filter, setFilter, id) {
        return (val) => {
            selectedItems.delete(val);
            filter[id] = Array.from(selectedItems);
            setFilter(Object.assign({}, filter))
            setItem(selectedItems)
        }
    }
    render() {
        return (
            <>
                <Elements
                    projectionAdd={this.projectionAdd}
                    projection={this.projection}
                    filter={null}
                    icon={this.icon}
                    color={this.color}
                    collectionName={this.collectionName}
                    setItem={this._setItem(
                        this.state.filter,
                        this.state.selectedItems,
                        (val) => {this.setState({filter: val})},
                        (val) => {this.setState({selectedItems: val})},
                        'idFarm')}
                    selectedItems={this.state.selectedItems}
                    strings={this.props.strings}
                />
                <Cages
                    filterCage={this.props.filterCage}
                    setFilterCage={this.props.setFilterCage}
                    setItem={this._setItem}
                    strings={this.props.strings}
                    filter={this.state.filter}
                />
            </>
        )
    }
}
export default Farms;
