import Component from "../../core/Component";

interface Props {
  searchInputValue: string;
  onChange: (newText: string) => void;
}

export default class SearchContainer extends Component {
  constructor(target: Element, props: Props) {
    super(target, {}, props);
  }

  template(): string {
    const { searchInputValue } = this.props;
    return `
        <form>
            <input class="Search__input"  value="${searchInputValue}"  />
            <button class="Search__button">search</button>
        </form>
      `;
  }

  componentDidMount(): void {
    const searchInput = document.querySelector(".Search__input");

    searchInput.addEventListener("input", (e) => {
      const { onChange } = this.props;
      const target = e.target as HTMLInputElement;
      onChange(target.value);
    });
  }
}
