export default class Component<S, P> {
  target: Element;
  props: P;
  state: S;

  constructor(target: Element, props?: P) {
    this.target = target;
    this.props = props;
    this.render();
  }

  setState(newState: any) {
    this.state = { ...this.state, ...newState };
  }

  render() {}
}
