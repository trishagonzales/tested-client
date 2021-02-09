import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

export interface QuantityCounterProps {
  className?: string;
  withLabel?: boolean;
}

export function useQuantity(stock: number = 0, initialQuantity?: number) {
  const [quantity, setQuantity] = useState(initialQuantity ?? 1);

  const QuantityCounter = useCallback(({ className, withLabel }: QuantityCounterProps) => {
    return (
      <Div className={className}>
        {withLabel && <label>Quantity</label>}

        <div className='counter'>
          {quantity === 0 ? (
            <button className='decrease' disabled>
              -
            </button>
          ) : (
            <button className='decrease hoverable' onClick={() => setQuantity(quantity - 1)}>
              -
            </button>
          )}
          <input
            type='number'
            value={quantity}
            onChange={(e: any) => setQuantity(e.target.value > stock ? stock : e.target.value)}
          />
          {quantity === stock ? (
            <button className='increase' disabled>
              +
            </button>
          ) : (
            <button className='increase hoverable' onClick={() => setQuantity(quantity + 1)}>
              +
            </button>
          )}
        </div>
      </Div>
    );
  }, []);

  return { quantity, QuantityCounter };
}

const Div = styled.div`
  label {
    font-size: 14px;
    color: var(--fg2);
  }
  .counter {
    height: 35px;
    margin-top: 0.3em;
    display: flex;
    align-items: center;
    text-align: center;
    font-size: 25px;
    button {
      width: 32px;
      height: 100%;
      background: var(--lightgrey);
      cursor: pointer;
    }
    input {
      width: 40px;
      height: 100%;
      background: var(--bg);
      font-size: 14px;
      text-align: center;
    }
  }
`;
