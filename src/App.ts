import Component from "./core/Component";

import { getLanguages } from "./api/index";

import SearchContainer from "./components/SearchContainer/index";

interface State {
  searchInputValue: string;
}

export default class App extends Component {
  target: Element;
  _state: State;

  constructor(target: Element) {
    super(target, { searchInputValue: "" });
  }

  template(): string {
    return `
    <h1>Search Programming Languages</h1>
    <section class="Search__container"></section>
    `;
  }

  componentDidMount(): void {
    const searchContainer = document.querySelector(".Search__container");
    new SearchContainer(searchContainer, {
      onChange: (newText: string) => {
        getLanguages(newText).then((res) => {
          console.log(res);
        });
      },
    });
  }
}
