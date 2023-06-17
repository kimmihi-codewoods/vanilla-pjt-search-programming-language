export default class Component {
  target: Element;
  props: any;
  _state: any;

  constructor(target: Element, initialState: any, props?: any) {
    this.target = target;
    this.props = props;
    this._state = initialState;

    this.render();
    this.componentDidMount();
  }

  get state(): any {
    return this._state;
  }

  set state(newState: any) {
    this._state = { ...this.state, ...newState };
    this.render();
  }

  template() {
    return "";
  }

  render() {
    this.target.innerHTML = this.template();
    this.componentDidMount();
  }

  componentDidMount() {}
}
