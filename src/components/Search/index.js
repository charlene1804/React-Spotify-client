import React from 'react';
import PropTypes from 'prop-types';

import {
  Input, Form, Image, Icon, Message, Loader,
} from 'semantic-ui-react';

import logoSpotify from 'src/assets/logo_spotify.png';
import './search.scss';

const SearchBar = ({
  searchValue, setSearchValue, placeholder, handleSubmit, accessToken, isLoading,
}) => (
  <>
    <Image centered size="medium" src={logoSpotify} className="spotify__logo" />
    {accessToken.length === 0 && (
    <Message icon>
      <Icon name="exclamation triangle" />
      <Message.Content>
        <Message.Header>N'oubliez pas d'insérer un Access Token</Message.Header>
        Afin de bénéficier du service Spotify Developer,
        il vous faut indiquer le code "Access Token" dans la fenêtre en haut à droite.
      </Message.Content>
    </Message>
    )}
    {accessToken.length > 0 && (
      <Form
        className="search__form"
        onSubmit={() => {
          handleSubmit();
        }}
      >
        {/* Champ controlé classique, mais avec un <Input> de semantic ui */}
        <Input
          fluid
          icon="search"
          placeholder={placeholder}
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
        />
      </Form>
    )}
    {isLoading && <Loader active size="large">Chargement</Loader>}
  </>
);

SearchBar.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  accessToken: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SearchBar;
