import React from 'react';

import { mount } from 'enzyme';
import { screen } from "@testing-library/dom";
// import { render, cleanup, waitForElement } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import {
  InstrumentalDetail,
  InstrumentalItem,
  InstrumentalList,
  InstrumentalPlayer,
} from '../components/Instrumental';

describe('user selects an instrumental to play', () => {
  const instrumentals = [
      { id: 1, title: 'Instrumental 1', src: 'instrumental-1.mp3' },
      { id: 2, title: 'Instrumental 2', src: 'instrumental-2.mp3' }
    ]

  it('updates the selected instrumentals styling', () => {
    const instrumental = instrumentals[0]
    const handleInstrumentalSelect = jest.fn();
    const wrapper = mount(
      <InstrumentalList
        activeInstrumental={null}
        filter=''
        handleInstrumentalSelect={handleInstrumentalSelect}
        instrumentals={instrumentals}
        queueInstrumentals={[]}
      />
    )

    wrapper.find('#instrumental-item__row-1').simulate(
      'doubleClick', { target: { instrumental: instrumental } }
    );
    wrapper.setProps({ activeInstrumental: instrumental });

    expect(wrapper.find('#instrumental-item__row-1')
      .hasClass('instrumental-item__active')
    ).toEqual(true)
  })
})
