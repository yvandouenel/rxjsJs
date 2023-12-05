import Countries from "./component/Countries";
import CountryInput from "./component/CountryInput";

const appDiv = document.getElementById("app");
console.log(`appDiv :`, appDiv);
const countryInput = new CountryInput(appDiv);
console.log(`countryInput.countryList$`, countryInput.countryList$);
const countries = new Countries(appDiv, countryInput.countryList$);
//const subscribe = source$.subscribe(val => console.log(val));
