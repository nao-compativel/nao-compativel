import React from "react";
import "./css/Badge.css"; // Importe o CSS

const Badge = ({ children, className = "" }) => (
  <span className={`badge ${className}`}>{children}</span>
);

export default React.memo(Badge);
