import React, { useState } from "react";
import propTypes from "prop-types";

import "./index.scss";

export default function Text(props) {
  const {
    value,
    type,
    placeholder,
    name,
    prepend,
    append,
    outerClassName,
    inputClassName,
    errorResponse,
  } = props;

  const [HasError, setHasError] = useState(null);
  let pattern = "";
  if (type === "email") pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (type === "tel") pattern = "[0-9]*";
  if (type === "tel") pattern = "[0-9]";

  const onChange = (event) => {
    const target = {
      target: {
        name: name,
        value: event.target.value,
      },
    };

    if (type === "email") {
      pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!pattern.test(event.target.value)) {
        setHasError(errorResponse);
      } else {
        setHasError(null);
      }
    }

    if (type === "tel") {
      pattern = /^[0-9]*$/;
      if (!pattern.test(event.target.value)) {
        setHasError(errorResponse);
      } else {
        setHasError(null);
        if (event.target.validity.valid) props.onChange(target);
      }
    }

    if (type === "id") {
      pattern = /^[a-zA-Z0-9]*$/;
      if (!pattern.test(event.target.value)) {
        setHasError(errorResponse);
      } else {
        setHasError(null);
        if (event.target.validity.valid) props.onChange(target);
      }
    }

    // For other types, just call the onChange prop without validation
    if (type !== "email" && type !== "tel" && type !== "id") {
      setHasError(null);
      props.onChange(target);
    }
  };
  return (
    <div className={["input-text mb-3", outerClassName].join(" ")}>
      <div className="input-group">
        {prepend && (
          <div className="input-group-prepend bg-gray-900">
            <span className="input-group-text">{prepend}</span>
          </div>
        )}
        <input
          name={name}
          type={type}
          pattern={pattern}
          className={["form-control", inputClassName].join(" ")}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          style={{
            fontFamily: "Poppins",
            fontSize: 15.5,
            fontWeight: 420,
            color: "#2d2d2d",
          }}
        />
        {append && (
          <div className="input-group-append bg-gray-900">
            <span className="input-group-text">{append}</span>
          </div>
        )}
      </div>
      {HasError && <span className="error-helper">{HasError}</span>}
    </div>
  );
}

Text.defaultProps = {
  type: "text",
  pattern: "",
  placeholder: "Please type here...",
  errorResponse: "Please match the requested format.",
};

Text.propTypes = {
  name: propTypes.string.isRequired,
  value: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
  onChange: propTypes.func.isRequired,
  prepend: propTypes.oneOfType([propTypes.number, propTypes.string]),
  append: propTypes.oneOfType([propTypes.number, propTypes.string]),
  type: propTypes.string,
  placeholder: propTypes.string,
  outerClassName: propTypes.string,
  inputClassName: propTypes.string,
};
