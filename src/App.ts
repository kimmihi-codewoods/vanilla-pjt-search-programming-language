import Component from "./core/Component";

import { getLanguages } from "./api/index";

import SearchInputContainer from "./components/SearchInputContainer/index";
import SearchResultContainer from "./components/SearchResultContainer/index";

interface State {
  keyword: string;
  languageList: string[];
}

export default class App extends Component<State, undefined> {
  target: Element;
  state: State = {
    keyword: "",
    languageList: [],
  };
  constructor(target: Element) {
    super(target);
  }

  render() {
    this.target.innerHTML = `
      <h1>Search Programming Languages</h1>
      <section class="Search__input_container"></section>
      <section class="Search__result_container"></section>
    `;

    new SearchInputContainer(
      this.target.querySelector(".Search__input_container"),
      {
        onChange: this.handleChangeKeyword.bind(this),
      }
    );

    new SearchResultContainer(
      this.target.querySelector(".Search__result_container"),
      {
        languageList: this.state.languageList,
      }
    );
  }

  handleChangeKeyword(newKeyword: string) {
    if (newKeyword.length === 0) {
      new SearchResultContainer(
        this.target.querySelector(".Search__result_container"),
        {
          languageList: [],
        }
      );
      return;
    }

    this.loadNewLanguageList(newKeyword);
  }

  async loadNewLanguageList(keyword: string) {
    try {
      const response = await getLanguages(keyword);
      this.setState({ ...this.state, languageList: response });
      new SearchResultContainer(
        this.target.querySelector(".Search__result_container"),
        {
          languageList: this.state.languageList,
        }
      );
    } catch {
      console.log("Error: Load new languages");
    }
  }
}
