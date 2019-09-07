import React, {Component} from 'react'
import { observer, inject } from 'mobx-react'
import  InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import  IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

@inject("cityStore")

@observer
class SearchBar extends Component {

    inputHandler = e => this.props.cityStore.handleInput(e.target.value)
    
    render() {
        return (
            <Paper>
                <IconButton onClick={this.props.cityStore.searchCity}>
                    <SearchIcon />
                </IconButton>
                <InputBase onChange = {this.inputHandler}/>
            </Paper>
        )
    }
}
export default SearchBar