import { fromEvent, of } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import getData from '../services/getData.js';


export default class CountryInput {
  constructor(domParent) {
    this.domParent = domParent;
    this.input = this.render();
    this.countryList$ = this.getObservableCountries();
  }
  render() {
    return this.createMarkup("input", "", this.domParent, [{ type: "text" }]);
  }
  getObservableCountries() {
    //create observable that emits input events
    const source$ = fromEvent(this.input, 'input').pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((ev) => {
        return of(ev.target.value);
      }),
      filter(name => name.length > 2),
      switchMap((name) => {
        return getData(name);
      }),
    );
    //const subscribe = source$.subscribe(val => console.log(val));
    return source$;
  }
  /**
   * Crée un élément du dom, lui ajoute du texte, le place comme dernier
   * enfant de parent et ajoute un attribut en utilisant le paramètre attributes
   * @param {String} markup_name 
   * @param {String} text 
   * @param {domElement} parent 
   * @param {Object[]} attributes  (doit comprendre les propriétés name et value)
   * @returns domElement
   */
  createMarkup(markupname, text, parent, attributes = []) {
    const markup = document.createElement(markupname);
    markup.textContent = text;
    parent.appendChild(markup);
    for (const attribute of attributes) {
      for (let key in attribute) {
        markup.setAttribute(key, attribute[key]);
      }
    }
    return markup;
  }
}