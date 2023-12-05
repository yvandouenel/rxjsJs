export default class Countries {
  constructor(domParent, countryList$) {
    this.domParent = domParent;
    this.subscribe = countryList$.subscribe(countries => this.render(countries));
  }
  render(countries) {
    console.log(`countries`, countries);
    if(countries.length > 0) {
      if(document.getElementById("countries")) {
        document.getElementById("countries").remove();
      }
      const section = this.createMarkup("section", "", this.domParent, [{ id: "countries" }]);
      countries.forEach(country => {
        console.log(`name : `, country.name.common);
        this.createMarkup("section", country.name.common, section);
      });
    }
    
    
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