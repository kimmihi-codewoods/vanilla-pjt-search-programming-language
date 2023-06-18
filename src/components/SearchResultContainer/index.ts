import Component from "../../core/Component";

interface State {}

interface Props {
  languageList: string[];
}

export default class SearchResultContainer extends Component<State, Props> {
  constructor(target: Element, props: Props) {
    super(target, props);
  }

  render() {
    const { languageList } = this.props;

    this.target.innerHTML = `
      <ul>
        ${languageList.map((language: string) => `<li>${language}</li>`)}
      </ul>
    `;
  }
}
