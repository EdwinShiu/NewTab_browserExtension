import react from 'react';


declare global {
  interface String {
    ConvertToDateFromYMDHM(): Date | null;
  }

  interface Date {
    toYMDHM(): string;
  }
}

String.prototype.ConvertToDateFromYMDHM = function (): Date | null {
  // implement logic
  const re = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/;
  const match = this.match(re);
  if (!match) {
    return null;
  }
  let numbers = [];
  for (let i = 1; i < 6; i++) {
    numbers.push(parseInt(match![i]))
  }
  return new Date(numbers[0], numbers[1] - 1, numbers[2], numbers[3], numbers[4]);
}

Date.prototype.toYMDHM = function (): string {
  return `${this.getFullYear()}/${this.getMonth() + 1}/${this.getDay()} ${this.getHours()}:${this.getMinutes()}`
}


export {};
