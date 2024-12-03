import { useState } from "react";
import "./TextField.scss";

const TextField = ({
  label,
  type = "text",
  error,
  placeholder,
  value,
  onChange,
  multiline,
  rows = 4,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="text-field">
      {label && <label className="text-field__label">{label}</label>}
      <div className="text-field__input-wrapper">
        {multiline ? (
          <textarea
            className={`text-field__input ${error ? "error" : ""}`}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
          />
        ) : (
          <input
            type={type === "password" && showPassword ? "text" : type}
            className={`text-field__input ${error ? "error" : ""}`}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        )}
        {type === "password" && (
          <button
            type="button"
            className="text-field__toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        )}
      </div>
      {error && <span className="text-field__error">{error}</span>}
    </div>
  );
};

export default TextField;
