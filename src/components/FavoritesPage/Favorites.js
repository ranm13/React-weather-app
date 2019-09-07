import React, {Component} from 'react'
import { observer, inject } from 'mobx-react'
import FavoriteCityCard from './FavoriteCityCard'
import { Grid } from '@material-ui/core'


@inject("favoritesStore")

@observer
class Favorites extends Component {
    render() {
        let favoritesStore = this.props.favoritesStore
        return (
        <Grid container  justify="center" spacing={6}>
            {favoritesStore.favoriteCities.map(c=> (
                <FavoriteCityCard key={c.key} cityData={c} />
            ))}
        </Grid>)
    }
}
export default Favorites