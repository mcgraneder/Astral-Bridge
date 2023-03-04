import styled from "styled-components"

const SearchBarContainer = styled.div`
  display: flex;
  flex: 1;
`;
const SearchInput = styled.input`
  background: no-repeat scroll 7px 7px;
  background-size: 20px 20px;
  background-position: 12px center;
  background-color: rgb(15, 25, 55);
  border-radius: 12px;
  border: 1.5px solid rgb(43 63 88);;
  height: 100%;
  width: 350px;
  font-size: 14px;
  padding-left: 40px;
  color: grey;

`;

export default function SearchBar() {

  return (
    <SearchBarContainer>
      <SearchInput
        type="search"
        placeholder={"Search by "}
        id="searchBar"
        autoComplete="off"
        value={""}
        // onChange={({ target: { value } }) => setLocalFilterString(value)}
      />
      Search Input
    </SearchBarContainer>
  );
}