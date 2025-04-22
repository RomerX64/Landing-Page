"use client";
import { IUser } from "@/interfaces/User.interface";

const UserModal: React.FC<{
  user: IUser;
  onClose: () => void;
  onEdit: (id: string) => void;
}> = ({ user, onClose, onEdit }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-11/12 p-6 bg-gray-800 rounded-lg shadow-lg md:w-1/2 lg:w-1/3">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Detalles del Usuario
        </h2>
        <div className="space-y-2 text-gray-300">
          {Object.entries(user)
            ?.filter(([key]) => key !== "password" && key !== "isAdmin")
            .map(([key, value]) => (
              <div key={key} className="flex">
                <span className="mr-2 font-bold<">{key}:</span>
                <span className="text-sm text-gray-400 ">
                  {key === "subscripcion" &&
                  typeof value === "object" &&
                  value !== null
                    ? value.id
                    : typeof value === "object"
                    ? JSON.stringify(value)
                    : String(value)}
                </span>
              </div>
            ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white transition-all rounded bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            Cerrar
          </button>
          <button
            onClick={() => onEdit(user.id)}
            className="px-4 py-2 ml-2 text-white transition-all rounded bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            Modificar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
