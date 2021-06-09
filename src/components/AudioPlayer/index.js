import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'semantic-ui-react';

// un hook custom pour gérer l'audio
const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    if (playing) {
      audio.play();
    }
    else {
      audio.pause();
    }
  }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const AudioPlayer = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <Button
      onClick={toggle}
      icon
      labelPosition="left"
    >
      <Icon name={playing ? 'pause' : 'play'} />
      {playing ? 'Pause' : 'Play'}
    </Button>
  );
};

AudioPlayer.propTypes = {
  url: PropTypes.string.isRequired,
};

export default AudioPlayer;
