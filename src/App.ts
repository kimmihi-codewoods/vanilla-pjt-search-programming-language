import Component from "./core/Component";

import SearchContainer from "./components/SearchContainer/index";

export default class App extends Component {
  target: Element;
  constructor(target: Element) {
    super(target);
  }

  template(): string {
    return `
    <h1>Search Programming Languages</h1>
    <section class="Search__container"></section
    `;
  }

  componentDidMount(): void {
    const searchContainer = document.querySelector(".Search__container");

    new SearchContainer(searchContainer);
  }
}
