import Component from "../../core/Component";

interface State {
  tabIndex: number;
}

interface Props {
  languageList: string[];
  onSubmit: (newKeyword: string) => void;
}

export default class SearchResultContainer extends Component<State, Props> {
  state: State = {
    tabIndex: 0,
  };
  constructor(target: Element, props: Props) {
    super(target, props);
  }

  render() {
    const { languageList } = this.props;

    this.target.innerHTML = `
      <ul>
        ${languageList.map(
          (language: string) => `<li tabindex="0">${language}</li>`
        )}
      </ul>
    `;

    const list = this.target.querySelectorAll("li");

    this.target.addEventListener("keyup", (e: KeyboardEvent) => {
      console.log(this.state.tabIndex);
      if (e.key === "ArrowDown") {
        let nextTabIndex = this.state.tabIndex + 1;
        if (nextTabIndex >= list.length) {
          nextTabIndex = 0;
        }
        list[nextTabIndex]?.focus();
        this.setState({ ...this.state, tabIndex: nextTabIndex });
        return;
      }

      if (e.key === "ArrowUp") {
        let nextTabIndex = this.state.tabIndex - 1;
        if (nextTabIndex < 0) {
          nextTabIndex = list.length - 1;
        }
        list[nextTabIndex]?.focus();
        this.setState({ ...this.state, tabIndex: nextTabIndex });
        return;
      }

      if (e.key === "Enter") {
        const keyword = list[this.state.tabIndex]?.innerText;
        if (keyword === undefined) return;

        this.props.onSubmit(keyword);
        return;
      }
    });

    // list[0]?.addEventListener("focus", (e) => {
    //   console.log(e);
    // });
  }
}
