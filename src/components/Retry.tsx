function TryAgain({ onClick }: React.HTMLProps<HTMLDivElement>) {
  return (
    <div style={TryAgain.wrapperStyles} onClick={onClick}>
      Try again
    </div>
  );
}

TryAgain.wrapperStyles = {
  alignSelf: "center",
  justifySelf: "center",
  border: "solid 2px var(--color-bg)",
  borderRadius: "4px",
  cursor: "pointer",
  padding: "4px 10px",
};

export default TryAgain;
