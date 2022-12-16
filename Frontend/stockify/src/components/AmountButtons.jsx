import styled from 'styled-components';

const AmountButtons = ({ increase, decrease, amount}) => {
  return (
    <Wrapper className='amount-btns'>
      <button type='button' className='amount-btn' onClick={decrease}>
        <span className="symbol">-</span>
      </button>
      <h2 className='amount'>{amount}</h2>
      <button type='button' className='amount-btn' onClick={increase}>
        <span className="symbol">+</span>
      </button>
      <span></span> {/*Col to center the ammount*/}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: white;
  margin-left: 18rem;
  display: grid;
  width: 170px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
  .amount {
    text-align: center;
  }
  .symbol {
    color: white;
    font-size: 1.5rem
  }
`;

export default AmountButtons;
