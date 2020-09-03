const successMessage = "Hey, you won! Congratulations!";
const failMessage = "Oh, you lost! Next time you'll have better luck!";
const networkErrorMessage = "Network error. Try again later.";

async function fetchRetry<T>(
  url: string,
  options: any,
  setMessage: (message: string) => void,
  n: number
): Promise<T> {
  try {
    const response = await fetch(url, options);
    const result = JSON.parse(options.body);
    result.isTicketWon ? setMessage(successMessage) : setMessage(failMessage);
    // @ts-ignore
    return response;
  } catch (err) {
    if (!n) {
      setMessage(networkErrorMessage);
      throw err;
    }
    return await fetchRetry(url, options, setMessage, n - 1);
  }
}

export default fetchRetry;
