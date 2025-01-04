import { ROLES } from "../../../server/config/constants";
import { useAuth } from "../hooks/useAuth";
const Unauthorized = () => {
  const { role } = useAuth();

  return (
    <div>
      {role === ROLES.STUDENT && (
        <div className="flex flex-col sm:flex-row justify-between items-center py-2 px-4 sm:py-5 sm:px-10
        bg-gradient-to-r from-green1 via-green2 to-green1 text-white font-helvetica font-bold">
          You are logged in as a student, you do not have access on this page
        </div>
      )}
      {role === ROLES.PROFESSOR && (
        <div className="flex flex-col sm:flex-row justify-between items-center py-2 px-4 sm:py-5 sm:px-10
        bg-gradient-to-r from-green1 via-green2 to-green1 text-white font-helvetica font-bold">
          You are logged in as a professor, you do not have access on this page
        </div>
      )}
    </div>
  );
};

export default Unauthorized;
