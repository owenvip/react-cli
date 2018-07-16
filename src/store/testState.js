import { observable, computed, action, useStrict } from 'mobx'
import { request } from '../utils/axios'

useStrict(true)

class TestState {
  @observable globalInfo = {}
  @observable count = 0
  @observable name = 'owen'

  async getGlobalInfo() {
    const response = await request({
      method: 'GET',
      url: '/book',
    })
    const { data } = response
    this.setGlobalInfo(data)
  }
  @computed get msg() {
    return `${this.name} has ${this.count} years old`
  }
  @action add() {
    this.count += 1;
  }
  @action changeName(name) {
    this.name = name
  }
  @action setGlobalInfo(data) {
    this.globalInfo = data
  }
}

const testState = new TestState();
export default testState
