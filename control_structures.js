/*
const randomNumber = Math.random();

if (randomNumber > 0.5) {
  console.log("Größer als 0.5");
} else if (randomNumber > 0.25) {
  console.log("Größer als 0.25");
} else {
  console.log("Größer, kleiner oder gleich 0.25");
}
*/

const randomNumber = Math.floor(Math.random() * 5);

switch (randomNumber) {
  case 1:
    console.log("Der Wert der Zahl ist exakt 1");
    break;
  case 3:
    console.log("Der Wert der Zahl ist exakt 3");
    break;
  default:
    console.log("Der Wert der Zahl ist weder 1 noch 3");
    break;
}
