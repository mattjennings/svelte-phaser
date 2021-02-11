export function asMock<T>(mock: T) {
  return (mock as unknown) as jest.Mock<T>
}
