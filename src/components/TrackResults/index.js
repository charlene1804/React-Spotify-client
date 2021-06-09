import React from 'react';
import PropTypes from 'prop-types';
import { Card, Message, Icon } from 'semantic-ui-react';

import AudioPlayer from 'src/components/AudioPlayer';

const TrackResults = ({ results, errorMessage }) => (
  <>
    {errorMessage.length === 0 && (
    <Card.Group centered class="ui four doubling stackable cards">
      {results.map((track) => (
        <Card
          key={track.id}
        // cette ligne est un peu moche...
          image={track.album.images && track.album.images.length > 0 && track.album.images[0].url}
          header={track.name}
          meta={track.artists[0].name}
          extra={track.preview_url && <AudioPlayer url={track.preview_url} />}
        />
      ))}
    </Card.Group>
    )}
    {errorMessage.length > 0 && (
    <Message icon>
      <Icon name="exclamation triangle" />
      <Message.Content>
        <Message.Header>Nous avons rencontré une erreur.</Message.Header>
        {errorMessage}
      </Message.Content>
    </Message>
    )}
  </>
);

TrackResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      album: PropTypes.shape({
        images: PropTypes.arrayOf(
          PropTypes.shape({
            height: PropTypes.number.isRequired,
            url: PropTypes.string.isRequired,
            width: PropTypes.number.isRequired,
          }),
        ).isRequired,
      }).isRequired,
      name: PropTypes.string.isRequired,
      artists: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
      ).isRequired,
      preview_url: PropTypes.string,
    }),
  ).isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default TrackResults;
