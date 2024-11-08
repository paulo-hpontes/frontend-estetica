import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const SchedulingContext = createContext();

export const SchedulingProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHours, setSelectedHours] = useState("");
  const [userName, setUserName] = useState("");
  const [service, setService] = useState(""); // Store the service Type
  const [filterService, setFilterService] = useState([]); // Stores the service's name according service Type
  const [selectedService, setSelectedService] = useState([]); // Store the service name choice


  return (
    <SchedulingContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedHours,
        setSelectedHours,
        userName,
        setUserName,
        service,
        setService,
        filterService,
        setFilterService,
        selectedService,
        setSelectedService,
      }}
    >
      {children}
    </SchedulingContext.Provider>
  );
};

SchedulingProvider.propTypes = {
    children: PropTypes.element
}
