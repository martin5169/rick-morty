import { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import "./ModalCard.css";

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
  episode:[]
}

function ModalCard({ character, onClose }: { character: Character; onClose: () => void }) {
  const [open, setOpen] = useState(true);

  const handleModalClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <MDBModal open={open} toggle={() => handleModalClose()}>
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader centered >
            <MDBModalTitle >{character.name}</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={() => handleModalClose()}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <p className='content'>
             <b>ESPECIE</b>: {character.species}
            </p>
            <p className='content'>
            <b>GÉNERO</b>: {character.gender}
            </p>
            <p className='content'>
            <b>ORIGEN</b>: {character.origin.name}
            </p>
            <p className='content'>
            <b>CANTIDAD DE EPISODIOS</b>: {character.episode.length}
            </p>
          </MDBModalBody>
          <MDBModalFooter>
     
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}

export default ModalCard;
