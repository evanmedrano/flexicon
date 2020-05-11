import React from "react";

import { shallow } from "enzyme";

import InstrumentalPlayerAudioButton from "./InstrumentalPlayerAudioButton";

describe("InstrumentalPlayerAudioButton", () => {
  it("displays the audio controls", () => {
    const wrapper = shallow(<InstrumentalPlayerAudioButton />);

    expect(
      wrapper.find(".instrumental-player-audio-button").children().length
    ).toBe(5);
  });

  it("toggles the play and pause icons based on playing state", () => {
    const wrapper = shallow(<InstrumentalPlayerAudioButton />);
    const pauseIcon = ".instrumental-player-audio-button__pause-icon";
    const playIcon = ".instrumental-player-audio-button__play-icon";

    expect(wrapper.find(playIcon).exists()).toEqual(true);

    wrapper.setProps({ playing: true });

    expect(wrapper.find(pauseIcon).exists()).toEqual(true);
  });

  it("toggles the title based on shuffling state", () => {
    const wrapper = shallow(<InstrumentalPlayerAudioButton />);

    expect(wrapper.find('[title="Shuffle"]').exists()).toEqual(true);

    wrapper.setProps({ shuffling: true })

    expect(wrapper.find('[title="Don\'t shuffle"]').exists()).toEqual(true);
  });

  it("toggles the title based on looping state", () => {
    const wrapper = shallow(<InstrumentalPlayerAudioButton />);

    expect(wrapper.find('[title="Repeat"]').exists()).toEqual(true);

    wrapper.setProps({ looping: true })

    expect(wrapper.find('[title="Don\'t repeat"]').exists()).toEqual(true);
  });
});
