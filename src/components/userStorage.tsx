import React, { createContext } from "react";

export const UserStorage = createContext({idUser: '', name: '', token: '', type: 0, headers: {}});

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }: any) => {
  var session = JSON.parse(localStorage.getItem("@schedule-study/user") || '{}');
	
	var idUser = session.user?.id;
  var name = session.user?.name;
	var token = session?.token
	var type = session.user?.type;

	var headers = {
		Authorization: `Bearer ${token}`
	}

  return (
    <UserStorage.Provider
      value={{
        idUser,
        name,
				token,
				type,
				headers
      }}
    >
      {children}
    </UserStorage.Provider>
  );
};
