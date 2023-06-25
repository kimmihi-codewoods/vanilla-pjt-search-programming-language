import Component from "../../core/Component";

interface State {}
interface Props {
  recentKeywordList: string[];
}

export default class RecentKeywordContainer extends Component<State, Props> {
  constructor(target: Element, props: Props) {
    super(target, props);
  }

  render(): void {
    const recentKeywordList = this.props.recentKeywordList ?? [];

    this.target.innerHTML = `
            <ul>
                ${recentKeywordList.map((item) => `<li>${item}</li>`)}
            </ul>
        `;
  }
}
