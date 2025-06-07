export default function Button({ cName, onClick, children }) {
  return (
    <button className={cName} onClick={onClick}>
      {children}
    </button>
  );
}
