import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddPost from './AddPost';


type PropType ={ 
    username:string;
}

const AddPostModal = (props: PropType) => {
  

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" className="mb-2" onClick={toggle}>Add Post</Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Post to the Wall</ModalHeader>
        <ModalBody>
          <AddPost username={props.username} />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default AddPostModal;