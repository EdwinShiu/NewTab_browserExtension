/**
 * This component display the error message.
 *
 * @param message is the error message
 * @returns a component displaying error message
 */
export const GeneralError = ({ message }: { message: string }) => {
  return <div>{`Error: ${message}`}</div>;
};
