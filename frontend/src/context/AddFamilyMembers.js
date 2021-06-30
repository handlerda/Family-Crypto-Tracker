import { createContext, useState, useContext } from "react";
export const AddFamilyMembersContext = createContext();
export const useAddFamilyMemberSignUp = () =>
  useContext(AddFamilyMembersContext);
function AddFamilyMembersProvider(props) {
  const [addFamilyMembers, setAddFamilyMembers] = useState(false);
  return (
    <AddFamilyMembersContext.Provider
      value={{
        addFamilyMembers,
        setAddFamilyMembers,
      }}
    >
      {props.children}
    </AddFamilyMembersContext.Provider>
  );
}

export default AddFamilyMembersProvider;
