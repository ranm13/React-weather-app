import React, {Component} from 'react'
import { observer, inject } from 'mobx-react'
import  InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import  IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { ToastsContainer, ToastsStore } from 'react-toasts';


@inject("cityStore")

@observer
class SearchBar extends Component {

    inputHandler = e => this.props.cityStore.handleInput(e.target.value)
    
    searchCity = async () => {
        let response = await this.props.cityStore.searchCity()
        if(response){
            ToastsStore.error("Location Enterd Is Invalid, Please Try Again");
        }
    }

    render() {
        return (
            <div>
                <Paper>
                    <IconButton onClick={this.searchCity}>
                        <SearchIcon />
                    </IconButton>
                    <InputBase onChange = {this.inputHandler}/>
                </Paper>
                <ToastsContainer store={ToastsStore}/>
            </div>
        )
    }
}
export default SearchBar