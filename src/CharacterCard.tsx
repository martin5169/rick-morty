import React, { useState } from 'react';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBProgress,
  MDBBtn,
  MDBProgressBar
} from 'mdb-react-ui-kit';
import ModalCard from './ModalCard';

interface Character {
  id: number;
  name: string;
  species: string;
  type: string;
  gender: string;
  status: string;
  location: {
    name: string;
  };
  origin: {
    name: string;
  };
  image: string;
  episode : []
}


interface ModalCardProps {
  character: Character;
  onClose: () => void;
}

function CharacterCard({ character }: { character: Character;}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
   
  };

  return (
    <MDBCard key={character.id} alignment='center'>
      <MDBCardImage src={character.image} alt={character.name} />
      <MDBCardBody>
        <MDBCardTitle>{character.name}</MDBCardTitle>
        <MDBCardText>
          <small className="text-muted">Status</small>
          <MDBProgress>
            <MDBProgressBar
              bgColor={character.status === 'Alive' ? 'success' : 'danger'}
              striped
              animated
              width='100'
              valuemin={0}
              valuemax={100}
            />
          </MDBProgress>
        </MDBCardText>
        <MDBBtn outline className='mx-2' color='dark' onClick={handleOpenModal}>
          INFO
        </MDBBtn>
      </MDBCardBody>
      {isModalOpen && (
        <ModalCard character={character} onClose={handleCloseModal} />
      )}
    </MDBCard>
  );
}

export default CharacterCard;
