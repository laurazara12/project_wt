import { useState, Children } from "react";
import PropTypes from "prop-types";
import { cn } from "../../../lib/utils.jsx"; // Ensure this utility is set up correctly

const Tabs = ({ children, className }) => {
  // Use React.Children.toArray to ensure children are an array and safe to access
  const childArray = Children.toArray(children);
  const [activeTab, setActiveTab] = useState(childArray[0]?.props?.label || "");

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div className={cn("max-w-6xl mx-auto", className)}>
      <div className="flex border-b border-green-200">
        {childArray.map((child) => (
          <button
            key={child.props.label}
            className={`${
              activeTab === child.props.label
                ? "border-b-2 border-green-600 text-green-600"
                : "text-green-800"
            } flex-1 font-medium py-2 bg-green-100 hover:bg-green-200`}
            onClick={(e) => handleClick(e, child.props.label)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="py-4">
        {childArray.map((child) => {
          if (child.props.label === activeTab) {
            return <div key={child.props.label}>{child.props.children}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const Tab = ({ label, children, className }) => {
  return (
    <div label={label} className={cn("hidden", className)} aria-labelledby={label}>
      {children}
    </div>
  );
};

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export { Tabs, Tab };