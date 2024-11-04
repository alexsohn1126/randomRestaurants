'use client';

import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';

const MapComponent = dynamic(() => import('./mapComponent'), { ssr: false });

  export default function Home() {
    const [circleRad, setCircleRad] = useState(500);
    const inputRef = useRef<HTMLInputElement>(null);

    function onSubmit(e: React.FormEvent) {
      e.preventDefault();

      const newRad = inputRef.current? parseInt(inputRef.current.value, 10) : circleRad;
      if (!isNaN(newRad)) {
        setCircleRad(newRad);
      }
    }

    return (
      <div className='flex'>
        <MapComponent circleRad={circleRad} />
        <div className='w-1/6'>
          <label>
            Search Radius:
            <input
              name='radiusInput'
              defaultValue={circleRad}
              ref={inputRef}
              type='number'
            />
          </label>
          <button onClick={onSubmit}> Submit </button>
        </div>
      </div>
    );
  }
