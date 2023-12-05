import { from } from "rxjs";

export default function getData (name) {
  return from(
    fetch(`https://restcountries.com/v3.1/name/${name}`).then((response) => response.json())
  );
};