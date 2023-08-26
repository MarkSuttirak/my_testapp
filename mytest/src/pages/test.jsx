import { Tabs, TabList, TabPanels, Tab, TabPanel, Heading } from '@chakra-ui/react'
import Tableinfo from './tableinfo'

const TestPage = () => {
    return (
        <>
            <header className='header'>
                <Heading as='h1' fontSize='5xl'>HALLO WELT!</Heading>
                <Heading as='p' fontSize='xl' pt='4'>Willkommen auf meiner Seite</Heading>
            </header>

            <div className='container'>
            <Tableinfo />
            
            <Tabs pt='5'>
                <TabList>
                    <Tab>Eins</Tab>
                    <Tab>Zwei</Tab>
                    <Tab>Drei</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                    <p>Eins! Ich überprüfe diese Komponente.</p>
                    </TabPanel>
                    <TabPanel>
                    <p>Zwei! Ich überprüfe noch diese Komponente</p>
                    </TabPanel>
                    <TabPanel>
                    <p>Drei! Nachdem ich fertig diese Komponente überprüfe, kann ich andere Komponenten probieren.</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            </div>
        </>
    )
}

export default TestPage