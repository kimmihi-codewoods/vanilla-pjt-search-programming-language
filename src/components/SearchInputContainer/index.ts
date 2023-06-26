import Component from "../../core/Component";

import debounce from "../../utils/debounce";

interface State {}

interface Props {
  onChange: (e: Event) => void;
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

    const handleKeyUp = debounce((e: Event) => {
      this.props.onChange(e);
    });
    input.addEventListener("keyup", handleKeyUp);
  }
}
