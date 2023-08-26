import { Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText, Input, chakra, Stack, VStack, Button, useToast } from "@chakra-ui/react"
import { useFrappeCreateDoc, useFrappeDeleteDoc, useFrappeUpdateDoc } from "frappe-react-sdk"
import { useForm } from 'react-hook-form'

const CreateData = ({isOpen, onClose}) => {
    const { createDoc, loading, error } = useFrappeCreateDoc()

    const toast = useToast()

    const { register, handleSubmit, formState: {errors} } = useForm()

    const onSubmit = (data) => {
        createDoc('Data Collection', data)
        .then(() => {
            onClose()
            toast({
                title: 'Daten erstellt',
                description: "Ihre Daten hat fertig erstellt.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        })
        .catch(() => toast({
            title: 'Es gibt den Fehler!',
            description: "Tut mir leid, es scheint, beim Speichern der Daten ist ein Fehler aufgetreten.",
            status: 'error',
            duration: 9000,
            isClosable: true,
        }))
        console.log(data)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <chakra.form onSubmit={handleSubmit(onSubmit)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Daten hinzufügen</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Stack>
                    <VStack>
                       <FormControl isInvalid={!!errors.benutzername}>
                        <FormLabel>Benutzername</FormLabel>
                        <Input type='text' {...register('benutzername', {
                            required: 'Dieses Feld ist erforderlich.',
                            minLength: {
                                value: 3,
                                message: 'Benutzername sollte mindestens 3 Charaktere sein.'
                            }
                        })}/>
                        <FormErrorMessage>{errors.benutzername?.message}</FormErrorMessage>
                        
                    </FormControl>
                    <FormControl isInvalid={!!errors.standort}>
                        <FormLabel>Standort</FormLabel>
                        <Input type='text' {...register('standort', {
                            required: 'Dieses Feld ist erforderlich.'
                        })}/>
                        <FormErrorMessage>{errors.standort?.message}</FormErrorMessage>
                    </FormControl>
                    </VStack>
                </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Schließen
                    </Button>
                    <Button variant='ghost' type='submit' isLoading={loading}>Speichern</Button>
                </ModalFooter>
            </ModalContent>
        </chakra.form>
    </Modal>
    )
}

export default CreateData