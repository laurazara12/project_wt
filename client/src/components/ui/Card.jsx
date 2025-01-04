const Card = ({ children }) => {
  return (
    <div
      className="max-w-sm p-4 bg-gray-100 border border-gray-300 rounded  
      dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-gray-600 
      transition-transform duration-200 ease-in-out transform hover:scale-105"
    >
      {children}
    </div>
  );
};

export default Card;