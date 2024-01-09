function TryAgain({ onClick }: React.HTMLProps<HTMLDivElement>) {
  return (
    <div style={TryAgain.wrapperStyles} onClick={onClick}>
      Try again
    </div>
  );
}

TryAgain.wrapperStyles = {
  cursor: "pointer",
  padding: "4px 10px",
  border: "solid 2px black",
  borderRadius: "4px",
};

export default TryAgain;
