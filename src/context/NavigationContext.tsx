import React, {ReactNode, createContext, useState} from 'react';

export type navInitialContext = {
  navHide: boolean;
  setNavHide: React.Dispatch<React.SetStateAction<boolean>>;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};
export const NavContext = createContext<null | navInitialContext>(null);

const NavProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [navHide, setNavHide] = useState(false);
  const [editMode, setEditMode] = useState(false);
  return (
    <NavContext.Provider value={{navHide, setNavHide, editMode, setEditMode}}>
      {children}
    </NavContext.Provider>
  );
};

export default NavProvider;
