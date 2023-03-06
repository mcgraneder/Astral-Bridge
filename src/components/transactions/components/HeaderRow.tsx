import styled from "styled-components"
import { UilExclamationTriangle } from '@iconscout/react-unicons';

export const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const StyledTokenRow = styled.div`
  background-color: transparent;
  display: grid;
  font-size: 16px;
  grid-template-columns: 1fr 8fr 5fr 4fr 5fr 5fr 3fr;
  line-height: 24px;
  max-width: 1200px;
  min-width: 390px;
  padding: 15px 20px;
  width: 100%;


`;

const HeaderRow = () => {

    return (
      <StyledTokenRow>
        <div className="text-gray-500">
          <span>ID</span>
        </div>
        <div className="text-gray-500">
          <span>Account</span>
        </div>
        <div className="text-gray-500">
          <span>Date</span>
        </div>
        <div className="text-gray-500">
          <span>type</span>
        </div>
        <div className="text-gray-500">
          <span>Chain</span>
        </div>
        <div className="text-gray-500">
          <span>amount</span>
        </div>
        <div className="text-gray-500">
          <span>Status</span>
        </div>
      </StyledTokenRow>
    );
}

export default HeaderRow