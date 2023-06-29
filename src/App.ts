import Component from "./core/Component";

import { getLanguages } from "./api/index";

import { setItem, getItem } from "./utils/localStorage";

import RecentKeywordContainer from "./components/RecentKeywordContainer/index";
import SearchInputContainer from "./components/SearchInputContainer/index";
import SearchResultContainer from "./components/SearchResultContainer/index";

interface State {
  tabIndex: number;
  keyword: string;
  languageList: string[];
  recentKeywordList: string[];
}

export default class App extends Component<State, undefined> {
  target: Element;
  state: State = {
    tabIndex: 0,
    keyword: "",
    languageList: [],
    recentKeywordList: [],
  };

  constructor(target: Element) {
    super(target);
  }

  initialize() {
    const languageList = getItem("RESULT");

    if (languageList) {
      this.setState({ ...this.state, languageList });
    }
  }

  render() {
    this.initialize();

    this.target.innerHTML = `
      <h1>Search Programming Languages</h1>
      <section class="Recent__keyword-list"></section>
      <section class="Search__input-container"></section>
      <section class="Search__result-container"></section>
    `;

    window.addEventListener("load", () => {
      const input = document.querySelector("input");
      input.focus();
    });

    new RecentKeywordContainer(
      this.target.querySelector(".Recent__keyword-list"),
      {
        recentKeywordList: this.state?.recentKeywordList ?? [],
      }
    );

    new SearchInputContainer(
      this.target.querySelector(".Search__input-container"),
      {
        onChange: this.handleChangeKeyword.bind(this),
      }
    );

    new SearchResultContainer(
      this.target.querySelector(".Search__result-container"),
      {
        languageList: this.state?.languageList ?? [],
        onSubmit: this.handleSubmitKeyword.bind(this),
      }
    );
  }

  handleChangeKeyword(e: KeyboardEvent) {
    if (e.key === "ArrowDown") {
      const list = this.target
        .querySelector(".Search__result-container")
        .querySelector("li");
      list?.focus();
      return;
    }

    const { value } = e.target as HTMLInputElement;
    if (value.length === 0) {
      new SearchResultContainer(
        this.target.querySelector(".Search__result-container"),
        {
          languageList: [],
          onSubmit: this.handleSubmitKeyword.bind(this),
        }
      );
      return;
    }
    setItem("SEARCH", value);

    this.loadNewLanguageList(value);
  }

  handleSubmitKeyword(keyword: string) {
    const newRecentKeywordList = this.state.recentKeywordList ?? [];
    if (newRecentKeywordList.length >= 5) {
      newRecentKeywordList.shift();
    }

    newRecentKeywordList.push(keyword);
    this.setState({ ...this.state, recentKeywordList: newRecentKeywordList });
    new RecentKeywordContainer(
      this.target.querySelector(".Recent__keyword-list"),
      {
        recentKeywordList: this.state.recentKeywordList,
      }
    );
  }

  async loadNewLanguageList(keyword: string) {
    try {
      const response = await getLanguages(keyword);
      this.setState({ ...this.state, languageList: response });
      setItem("RESULT", response);
      new SearchResultContainer(
        this.target.querySelector(".Search__result-container"),
        {
          languageList: this.state.languageList,
          onSubmit: this.handleSubmitKeyword.bind(this),
        }
      );
    } catch {
      console.log("Error: Load new languages");
    }
  }
}
