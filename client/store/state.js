import { observable, computed, autorun, action } from 'mobx'

export class AppState {
  @observable count = 0
  @observable name = 'owen'
  @computed get msg() {
    return `${this.name} has ${this.count} years old`
  }
  @action add() {
    this.count += 1;
  }
  @action changeName(name) {
    this.name = name
  }
}

const appState = new AppState()

autorun(() => {
  console.log(appState.msg)
})

setInterval(() => {
  appState.add();
},1000)

export default appState
