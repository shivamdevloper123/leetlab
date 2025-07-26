// utils/getAvatarStyle.js

export const getAvatarStyle = (name) => {

  
  const colors = [
    "bg-primary",
    "bg-secondary",
    "bg-accent",
    "bg-info",
    "bg-success",
    "bg-warning",
    "bg-error",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const firstChar = name?.charAt(0).toUpperCase() || "P";
  const fullName = name?.charAt(0).toUpperCase() + name?.slice(1).toLowerCase() || "Profile";

  return { color: randomColor, char: firstChar, fullName };
};
