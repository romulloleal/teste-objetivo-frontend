import React, { useEffect, useState, useContext } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import * as dateFns from "date-fns";
import { ptBR } from "date-fns/locale";
import { Modal } from "react-responsive-modal";

import { UserStorage } from "../userStorage";
import ModalRegistrarAtividade from "../../pages/Dashboard/RegistrarAtividade/ModalRegistrarAtividade/index";

import "react-responsive-modal/styles.css";

import "./style.css";
import api from "../../services/api";
import ModalMinhasAtividades from "../../pages/Dashboard/MinhasAtividades/ModalMinhasAtividades";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>();
  const [schedulesDates, setSchedulesDates] = useState([]);

  const user = useContext(UserStorage);

  useEffect(() => {
    if (user.type === 2) {
      api
        .post(
          "/schedule/listSchedules",
          { studentId: user.idUser },
          { headers: user.headers }
        )
        .then((response: any) => {
          //pega somente as datas para colocar no array
          const results: Array<string> = [];
          response.data.success.map((schedule: any) => {
            return results.push(schedule.date);
          });
          //exclui as datas repetidas
          const uniqueArray: any = results.filter(function (item, pos) {
            return results.indexOf(item) === pos;
          });
          //seta as datas no array
          setSchedulesDates(uniqueArray);
        });
    }
  }, [user.headers, user.idUser, user.type]);

  const previousMonth = () => {
    setCurrentMonth(dateFns.subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(dateFns.addMonths(currentMonth, 1));
  };

  const daysOfWeek = () => {
    const daysOfWeek = [];

    let startDate = dateFns.startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      daysOfWeek.push(
        <div className="dayOfWeek" key={i}>
          {dateFns
            .format(dateFns.addDays(startDate, i), "eeee", { locale: ptBR })
            .substring(0, 1)}
        </div>
      );
    }

    return daysOfWeek;
  };

  const daysOfMonth = () => {
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "dd";

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`dayOfMonth ${
              !dateFns.isSameMonth(day, monthStart) ? "disabled" : ""
            }`}
            key={"dia" + day}
            onClick={() => selectDate(cloneDay)}
          >
            {schedulesDates.map((schedule: any) =>
              dateFns.isSameDay(new Date(schedule), cloneDay) ? (
                <div className="point"></div>
              ) : (
                ""
              )
            )}
            <span className="number">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
    }

    return days;
  };

  const selectDate = (day: any) => {
		if(user.type === 3){
			setIsOpen(true)
		}
		if(user.type === 2){
			schedulesDates.map((schedule: any) =>
				dateFns.isSameDay(new Date(schedule), day) ? (
					setIsOpen(true)
				) : (
					""
				)
			)
		}
    setSelectedDate(day);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="calendar">
        <div className="calendarHeader">
          <div className="icon" onClick={previousMonth}>
            <BsChevronLeft />
          </div>
          <span className="currentMonth">
            {dateFns.format(currentMonth, "MMMM yyyy", { locale: ptBR })}
          </span>
          <div className="icon" onClick={nextMonth}>
            <BsChevronRight />
          </div>
        </div>
        <div className="daysOfWeek">{daysOfWeek()}</div>
        <div className="daysOfMonth">{daysOfMonth()}</div>
      </div>
      <Modal open={modalIsOpen} onClose={closeModal} center>
        {user.type === 3 ? (
          <ModalRegistrarAtividade setIsOpen={setIsOpen} date={selectedDate} />
        ) : user.type === 2 ? (
          <ModalMinhasAtividades setIsOpen={setIsOpen} date={selectedDate} />
        ) : (
          ""
        )}
      </Modal>
    </>
  );
};

export default Calendar;
