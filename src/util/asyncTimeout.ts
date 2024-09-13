export default async function asyncTimeout(delay: number = 1000) {
  await new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
