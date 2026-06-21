/**
 * Button Component
 * @param {React.ReactNode} children - Button content
 * @param {Function} onClick - Click event handler
 * @param {boolean} disabled - Disable button
 * @param {string} variant - Button style
 * @param {string} size - Button size
 */
export default function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn ${variant} ${size}`}
    >
      {children}
    </button>
  );
}