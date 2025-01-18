import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './App.scss';
import { Person } from './types/Person';
import { peopleFromServer } from './data/people';
import {
  ContainerComponent,
  DropdownComponent,
  NotificationComponent,
} from './shared/components';
import { TitleComponent } from './shared/components';
import { debounce } from './utils/debounce';
import { text } from './shared/constants/text';

export const App: React.FC = () => {
  const { name, born, died } = peopleFromServer[0];
  const [people] = useState<Array<Person>>(peopleFromServer);
  const [value, setValue] = useState<string>('');
  const [query, setQuery] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
    if (value.trim() == '') {
      setSelectedPerson(null);
    }
  }, [value, query]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getInputLag = useCallback(debounce(setQuery, 1000), []);

  const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    getInputLag(event.target.value);
  };

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      const lowerPersonName = person.name.toLowerCase();
      const loverTextQuery = query.toLowerCase();

      return lowerPersonName.includes(loverTextQuery);
    });
  }, [people, query]);

  const isMatch = filteredPeople.length === 0;

  return (
    <ContainerComponent>
      {selectedPerson ? (
        <TitleComponent
          name={name}
          born={born}
          died={died}
          currentPerson={selectedPerson}
        />
      ) : (
        <NotificationComponent textMessage={text.noSelectedPerson} />
      )}
      <DropdownComponent
        setSelectedPerson={setSelectedPerson}
        people={filteredPeople}
        onChange={handleInputValue}
        value={value}
      />
      {isMatch && (
        <NotificationComponent textMessage={text.noMatchingSuggestions} />
      )}
    </ContainerComponent>
  );
};
