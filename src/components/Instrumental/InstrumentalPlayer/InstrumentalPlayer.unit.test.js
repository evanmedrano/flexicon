import React from "react";

import { mount, shallow } from "enzyme";
import { screen } from "@testing-library/dom";

import { InstrumentalPlayer } from "./InstrumentalPlayer";

describe("InstrumentalPlayer", () => {
  const instrumental = {
    title: "An instrumental",
    src: "my-instrumental.mp3"
  };

  it("does not render on screen load", () => {
    const instrumentalPlayer = screen.queryByTestId("instrumental-player");

    expect(instrumentalPlayer).not.toBeInTheDocument();
  });

  it("displays the title", () => {
    const wrapper = mount(
      <InstrumentalPlayer instrumental={instrumental} playing={true} />
    );

    expect(wrapper.find(".instrumental-player-detail__title").text()).toEqual(
      "An instrumental"
    );
  });

  it("displays the instrumental duration", () => {
    const wrapper = shallow(
      <InstrumentalPlayer instrumental={instrumental} playing={true} />
    );

    expect(wrapper.find(".instrumental-player__duration").text()).toEqual(
      "0:30"
    );
  });

  it("displays the audio controls", () => {
    const wrapper = shallow(
      <InstrumentalPlayer instrumental={instrumental} playing={true} />
    );

    expect(
      wrapper.find(".instrumental-player__buttons").children().length
    ).toBe(5);
  });

  it("displays the volume controls", () => {
    const wrapper = shallow(
      <InstrumentalPlayer instrumental={instrumental} playing={true} />
    );

    expect(
      wrapper.find(".instrumental-player__volume-container").children().length
    ).toBe(2);
  });

  it('toggles the play and pause icons', () => {
    const handleInstrumentalPause = jest.fn();
    const wrapper = shallow(
      <InstrumentalPlayer
        handleInstrumentalPause={handleInstrumentalPause}
        instrumental={instrumental}
        playing={true}
      />
    );
    const pauseIcon = '.instrumental-player__pause-icon'
    const playIcon = '.instrumental-player__play-icon'

    expect(wrapper.find(pauseIcon).exists()).toEqual(true);

    wrapper.find(pauseIcon).simulate('click', { target: { playing: false } });

    wrapper.setProps({ playing: false })

    expect(wrapper.find(pauseIcon).exists()).toEqual(false);
    expect(wrapper.find(playIcon).exists()).toEqual(true);
  });
});
