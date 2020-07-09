import { action, observable } from "mobx";

class Store {
  @observable visible = false;
  constructor(isServer) {

  }

  @action
  login = () => {
    // console.log('登录动作', this.user);
  }

  @action
  changeVisible = (b) => {
    this.visible = b;
  }
}

export default Store;