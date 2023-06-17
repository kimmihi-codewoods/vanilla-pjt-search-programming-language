import Component from "../../core/Component";

export default class SearchContainer extends Component {
  constructor(target: Element) {
    super(target);
  }

  template(): string {
    return `
        <form>
            <input class="Search__input" />
            <button class="Search__button">search</button>
        </form>
      `;
  }
}
