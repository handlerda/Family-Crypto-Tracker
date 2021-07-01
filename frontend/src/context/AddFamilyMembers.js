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
    phone: "",
  });
  const [familyMembers, setFamilyMembers] = useState([]); // get number of
  //family members by the length of the array
  return (
    <AddFamilyMembersContext.Provider
      value={{
        addFamilyMembers,
        setAddFamilyMembers,
        additionalFamilyMember,
        setAdditionalFamilyMember,
        familyMembers,
        setFamilyMembers,
      }}
    >
      {props.children}
    </AddFamilyMembersContext.Provider>
  );
}

export default AddFamilyMembersProvider;
