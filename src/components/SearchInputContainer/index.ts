import Component from "../../core/Component";

import { getItem } from "../../utils/localStorage";
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

    const input = this.target.querySelector(
      ".Search__input"
    ) as HTMLInputElement;
    const lastKeyword = getItem("SEARCH");

    if (lastKeyword) {
      input.value = lastKeyword;
    }

    const handleKeyUp = debounce((e: Event) => {
      this.props.onChange(e);
    });

    input.addEventListener("keyup", handleKeyUp);
  }
}
