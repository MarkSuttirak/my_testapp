import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Heading,
    Button
} from '@chakra-ui/react'

const DeleteData = ({isOpenDelete, onCloseDelete}) => {

    return (
        <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Datenlöschung</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading>Bist du sicher, dass du diese Daten löschen willst?</Heading>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onCloseDelete}>
              Schließen
            </Button>
            <Button variant='ghost' colorScheme='red'>Löschen</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}

export default DeleteData