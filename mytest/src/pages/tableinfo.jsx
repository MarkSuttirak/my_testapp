import { Box, Button, Heading, HStack, Stack, Tab, Table, Th, Tr, Td, Tbody, Thead, Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText, Input, chakra, VStack } from "@chakra-ui/react"
import { useFrappeCreateDoc, useFrappeDocTypeEventListener, useFrappeGetDocList, useFrappeDeleteDoc, useFrappeAuth, useFrappeGetCall } from "frappe-react-sdk"
import LoadingIcon from "../components/loading"
import CreateData from "../components/create-data"
import { useState } from "react"

const Tableinfo = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const {data, isLoading, error, mutate} = useFrappeGetDocList('Data Collection', {
        fields: ['name','benutzername', 'standort'],
        limit: 10,
        limit_start: 10 * currentPage,
    })

    useFrappeDocTypeEventListener('Data Collection', (d) => {
        console.log("Event", d)
        if (d.doctype === 'Data Collection'){
            mutate()
        }
    })

    const clickPrev = () => {
        setCurrentPage((prevPage) => {
            if (prevPage > 0){
                return prevPage - 1
            }
            return prevPage;
        })
        console.log(currentPage)
    }

    const clickNext = () => {
        setCurrentPage((prevPage) => {
            return prevPage + 1
        })
        console.log(currentPage)
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Stack pb='8'>
                <HStack justifyContent='space-between'>
                    <Heading>Datensammlung</Heading>
                    <Box>
                        <Button onClick={onOpen}>Hinzufügen</Button>
                    </Box>
                </HStack>
            </Stack>
            {data && 
            <>
            <Table>
              <Thead>
                    <Tr>
                        <Th>ID-Nummer</Th>
                        <Th>Benutzername</Th>
                        <Th>Standort</Th>
                        <Th>Aktionen</Th>
                    </Tr>
                </Thead>   
                <Tbody>
                    {data.map((d) => <Tr key={d.name}>
                        <Td>{d.name}</Td>
                        <Td>{d.benutzername}</Td>
                        <Td>{d.standort}</Td>
                        <Td>
                            <Stack>
                                <HStack>
                                    <Button>Edit</Button>
                                    <Button colorScheme='red'>Delete</Button>
                                </HStack>
                            </Stack>
                        </Td>
                    </Tr>)}
                </Tbody> 
            </Table>

            <Button onClick={clickPrev}>Previous</Button>
            <Button onClick={clickNext}>Next</Button>
            </>
            }

            {isLoading && <LoadingIcon />}

            {error && <Alert status='error'>
                <AlertIcon />
                <AlertTitle>Fatalen Fehler!</AlertTitle>
                <AlertDescription>Es gibt vielleicht den fatalen Fehler des Servers oder der Codes.</AlertDescription>
            </Alert>}

            <CreateData isOpen={isOpen} onClose={onClose}/>
        </>
    )
}

export default Tableinfo