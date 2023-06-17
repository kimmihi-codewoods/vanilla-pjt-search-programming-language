import Component from "../../core/Component";

interface Props {
  onChange: (newText: string) => void;
}

export default class SearchContainer extends Component {
  constructor(target: Element, props: Props) {
    super(target, {}, props);
  }

  template(): string {
    return `
        <form>
            <input class="Search__input" />
            <button class="Search__button">search</button>
        </form>
      `;
  }

  componentDidMount(): void {
    const searchInput = document.querySelector(".Search__input");

    searchInput.addEventListener("keyup", (e) => {
      const { onChange } = this.props;
      const target = e.target as HTMLInputElement;
      onChange(target.value);
    });
  }
}
