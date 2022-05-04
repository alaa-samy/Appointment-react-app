import { useState, useEffect, useCallback } from "react";
import { BiCalendar } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointemnt from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";
// import List from './data.json'

function App() {
  let [appointmentList, setAppointmentList] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [order, setOrder] = useState("asc");

  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        setAppointmentList(data);
      });
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredAppointment = appointmentList
    .filter((singleItem) => {
      return (
        singleItem.petName.toLowerCase().includes(query.toLowerCase()) ||
        singleItem.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        singleItem.aptNotes.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      let orderBy = order === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * orderBy
        : 1 * orderBy;
    });

  return (
    <div className="App container mx-auto mt-4 font-thin">
      <h1 className="text-3xl text-green-500 align-top mb-4 text-center">
        <BiCalendar className="inline-block" /> Your Appointements
      </h1>
      <AddAppointemnt
        onSubmitForm={(myAppointment) =>
          setAppointmentList([...appointmentList, myAppointment])
        }
        lastID={appointmentList.reduce(
          (max, item) => (Number(item.id) > max ? Number(item.id) : max),
          0
        )}
      />
      <Search
        query={query}
        onQueryChange={(myQuery) => setQuery(myQuery)}
        order={order}
        onOrderChange={(mySort) => setOrder(mySort)}
        sortBy={sortBy}
        onSortChange={(mySort) => setSortBy(mySort)}
      />

      <ul className="divide-y divide-gray-200">
        {filteredAppointment.map((item) => (
          <AppointmentInfo
            key={item.id}
            appointment={item}
            onDeleteItem={(appointmentID) =>
              setAppointmentList(
                appointmentList.filter(
                  (appointmentList) => appointmentList.id !== appointmentID
                )
              )
            }
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
