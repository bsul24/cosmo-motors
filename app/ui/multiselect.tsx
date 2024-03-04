// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
'use client';

import React, { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';

const options = [
  { label: 'Grapes 🍇', value: 'grapes' },
  { label: 'Mango 🥭', value: 'mango' },
  { label: 'Strawberry 🍓', value: 'strawberry', disabled: true },
];

const MultiSelectCosmo = ({
  options,
  selected,
  setSelected,
}: {
  options: { label: string; value: number; disabled?: boolean }[];
  selected: any[];
  setSelected: Function;
}) => {
  return (
    <div>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
      />
      {/* Hidden Vehicles */}
      <select
        multiple
        name="vehiclesIDs"
        id="vehiclesIDs"
        value={selected.map((selection) => selection.value)}
        hidden
      >
        {selected.map((selection) => (
          <option key={selection.value} value={selection.value}></option>
        ))}
      </select>
    </div>
  );
};

export default MultiSelectCosmo;
