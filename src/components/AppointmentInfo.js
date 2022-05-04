import { BiTrash } from "react-icons/bi";

const AppointmentInfo = ({ appointment, onDeleteItem }) => {
  return (
    <li className="px-3 py-3 flex items-start">
      <button
        type="button"
        onClick={() => onDeleteItem(appointment.id)}
        className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <BiTrash />
      </button>
      <div className="flex-grow">
        <div className="flex items-center">
          <span className="flex-none font-medium text-2xl text-black-500">
            {appointment.petName}
          </span>
          <span className="flex-grow text-right">{appointment.aptDate}</span>
        </div>
        <div>
          <b className="font-bold text-green-500">Owner:</b>{" "}
          {appointment.ownerName}
        </div>
        <div className="leading-tight">{appointment.aptNotes}</div>
      </div>
    </li>
  );
};
export default AppointmentInfo;
