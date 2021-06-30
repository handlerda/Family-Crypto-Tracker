import { createContext, useState, useContext } from "react";
export const AddFamilyMembersContext = createContext();
export const useAddFamilyMemberSignUp = () =>
  useContext(AddFamilyMembersContext);
function AddFamilyMembersProvider(props) {
  const [addFamilyMembers, setAddFamilyMembers] = useState(false);
  const [additionalFamilyMember, setAdditionalFamilyMember] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  return (
    <AddFamilyMembersContext.Provider
      value={{
        addFamilyMembers,
        setAddFamilyMembers,
        additionalFamilyMember,
        setAdditionalFamilyMember,
      }}
    >
      {props.children}
    </AddFamilyMembersContext.Provider>
  );
}

export default AddFamilyMembersProvider;
