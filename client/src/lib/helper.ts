export function wordBreaker(sentence: string, maxWords: number): string {
    const words = sentence?.split(' ');
  
    if (!words || words.length === 0) {
      return ''; // Return an empty string if there are no words
    }
  
    const resultWords = words.slice(0, maxWords);
    return resultWords.join(' ');
}

export function characterBreaker(sentence: string, maxWords: number): string {
  const words = sentence?.split('');

  if (!words || words.length === 0) {
    return ''; // Return an empty string if there are no words
  }

  const resultWords = words.slice(0, maxWords);
  return resultWords.join('');
}

  export function isEven(num: number): boolean {
    return num % 2 === 0;
  }

  export function isOdd(num: number): boolean {
    return num % 2 !== 0;
  }

  export function isPrime(num: number): boolean {
    console.log(num, 'number')
    if (num <= 1) {
      return false;
    }
    if (num <= 3) {
      return true;
    }
    if (num % 2 === 0 || num % 3 === 0) {
      return false;
    }
    let i = 5;
    while (i * i <= num) {
      if (num % i === 0 || num % (i + 2) === 0) {
        return false;
      }
      i += 6;
    }
    return true;
  }

  export function formAmount(amount: number | undefined, isKobo?: boolean) {
    if (!amount) return CurrencyDisplay(0);

    if (isKobo) {
      const convertedToKobo = (amount / 100).toFixed(2);
      return CurrencyDisplay(Number(convertedToKobo));
    }
    return CurrencyDisplay(amount);
  }

  export function CurrencyDisplay (amount: number) {
    const formattedAmount = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);

    return formattedAmount;
  };