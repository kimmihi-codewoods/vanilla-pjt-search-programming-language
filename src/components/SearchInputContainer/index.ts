import Component from "../../core/Component";

interface State {}

interface Props {
  onChange: (newText: string) => void;
}

export default class SearchInputContainer extends Component<State, Props> {
  constructor(target: Element, props: Props) {
    super(target, props);
  }

  render() {
    this.target.innerHTML = `
      <form>
        <input class="Search__input" />
        <button class="Search__button">search</button>
      </form>
    `;

    const input = this.target.querySelector(".Search__input");
    input.addEventListener("keyup", (e) => {
      const { value } = e.target as HTMLInputElement;
      this.props.onChange(value);
    });
  }
}
