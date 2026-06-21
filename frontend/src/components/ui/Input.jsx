/**
 * Input Component
 * @param {string} label
 * @param {string} placeholder
 * @param {string} type
 * @param {string} value
 * @param {Function} onChange
 * @param {string} error
 */
export default function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
}) {
  return (
    <div>
      <label>{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      {error && <p>{error}</p>}
    </div>
  );
}