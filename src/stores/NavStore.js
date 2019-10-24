import { observable, action } from  'mobx'

export class NavStore {
    @observable theme = {
        palette: {
          type: "light"
        }
    }
    @observable isCelsius = true

    @action toggleTheme = () => {
        this.theme.palette.type = this.theme.palette.type === "light"? "dark" : "light"
    }

    @action toggleTempSign = () => {
        this.isCelsius = !this.isCelsius
    }
}