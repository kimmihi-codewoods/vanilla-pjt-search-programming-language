export default class Component {
  target: Element;
  props: any;
  state: any;

  constructor(target: Element, props?: any) {
    this.target = target;
    this.props = props;
    this.state = {};

    this.render();
    this.componentDidMount();
  }

  setState(newState: any) {
    this.setState = { ...this.state, newState };
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
