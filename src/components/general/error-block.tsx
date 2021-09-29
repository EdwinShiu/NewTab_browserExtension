

const GeneralError = ({message}: {message: string}) => {

  return (
    <div>
      {`Error: ${message}`}
    </div>
  );

}

export {
  GeneralError,
}