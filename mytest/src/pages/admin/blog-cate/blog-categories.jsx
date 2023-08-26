import { useFrappeCreateDoc, useFrappeDeleteDoc, useFrappeGetDocList, useFrappeUpdateDoc, useFrappeDocTypeEventListener } from "frappe-react-sdk";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import SidebarAdmin from "../../../components/sidebar-admin";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  chakra,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

const BlogAdmin = () => {
  const { data, isLoading, error, mutate } = useFrappeGetDocList('Blog Category Section', {
    fields: ['name', 'category']
  })

  const [rowNum, setRowNum] = useState(null)

  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm()

  const toast = useToast()

  const initialRef = useRef(null)
  const finalRef = useRef(null)

  console.log(initialRef);

  const { createDoc, loading } = useFrappeCreateDoc()
  const { updateDoc, loading: loadingUpdate } = useFrappeUpdateDoc()
  const { deleteDoc, loading: loadingDelete } = useFrappeDeleteDoc()

  const { isOpen: isOpenCreateCate, onOpen: openCreateCate, onClose: closeCreateCate } = useDisclosure();
  const { isOpen: isOpenUpdateCate, onOpen: openUpdateCate, onClose: closeUpdateCate } = useDisclosure();
  const { isOpen: isOpenDeleteCate, onOpen: openDeleteCate, onClose: closeDeleteCate } = useDisclosure();
  const cancelRef = useRef()

  const createCate = (info) => {
    createDoc('Blog Category Section', info)
    .then(() => {
      closeCreateCate();
      toast({
        title: 'Blog category created',
        description: "The blog category has been created.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }).catch(() => {
        toast({
          title: 'There is an error',
          description: "Sorry, it seems that there is an error while creating the blog category.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
    })
  }

  const clickToCloseUpdateCate = () => {
    setRowNum(null);
    closeUpdateCate();
  }

  const clickToCloseDeleteCate = () => {
    setRowNum(null);
    closeDeleteCate();
  }

  const clickToUpdateCate = (index) => {
    setRowNum(index);
    openUpdateCate();
  }

  const clickToDeleteCate = (index) => {
    setRowNum(index);
    openDeleteCate();
  }

  useFrappeDocTypeEventListener('Blog Category Section', (d) => {
    console.log(d)
      if (d.doctype === 'Blog Category Section'){
      mutate()
    }
  })

  const updateCate = (info) => {
    updateDoc('Blog Category Section', data[rowNum].name, info)
    .then(() => {
      closeUpdateCate();
      toast({
        title: 'Blog category updated',
        description: "The blog category has been updated.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }).catch(() => {
        toast({
          title: 'Unable to update',
          description: "Sorry, you cannot update the blog category while there are posts that relate to this blog category.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
    })
  }

  const deleteCate = (info) => {
    deleteDoc('Blog Category Section', data[rowNum].name, info)
    .then(() => {
      closeDeleteCate();
      setRowNum(null);
      toast({
        title: 'Blog category deleted',
        description: "The blog category has been deleted.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }).catch(() => {
        toast({
          title: 'Unable to delete',
          description: "Sorry, you cannot delete the blog category while there are posts that relate to this blog category.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
    })
  }

  return (
    <>
      <SidebarAdmin />
      <div className="sm:py-16 sm:px-40 p-4 container-admin">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Blog Categories</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name, title, email and role.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={openCreateCate}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 w-[100px]">
                        ID
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Category
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  {data && (
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {data.map((d, index) => (
                        <tr key={d.index}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {d.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{d.category}</td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 flex gap-x-2 justify-end">
                            <Button variant="ghost" onClick={() => clickToUpdateCate(index)} className="text-indigo-600 hover:text-indigo-900" fontSize="14px">
                              Edit
                            </Button>
                            <Button variant="ghost" onClick={() => clickToDeleteCate(index)} className="text-indigo-600 hover:text-indigo-900" fontSize="14px">
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpenCreateCate} onClose={closeCreateCate} initialFocusRef={initialRef} finalFocusRef={finalRef}>
        <chakra.form onSubmit={handleSubmit(createCate)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl name="category">
                <FormLabel htmlFor='category'>Category Name:</FormLabel>
                <Input ref={initialRef} type="text" {...register('category')}/>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant='ghost' mr={3} onClick={closeCreateCate}>
                Close
              </Button>
              <Button colorScheme='blue' type='submit' isLoading={loading}>Save</Button>
            </ModalFooter>
          </ModalContent>
        </chakra.form>
      </Modal>

      <Modal isOpen={isOpenUpdateCate} onClose={closeUpdateCate}>
        <chakra.form onSubmit={handleSubmit(updateCate)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update category: {data && rowNum !== null && data[rowNum].category}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl name="category">
                <FormLabel>Category Name:</FormLabel>
                <Input type="text" defaultValue={data && rowNum !== null && data[rowNum].category} {...register('category')}/>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant='ghost' mr={3} onClick={closeUpdateCate}>
                Close
              </Button>
              <Button colorScheme='blue' type='submit' isLoading={loadingUpdate}>Save</Button>
            </ModalFooter>
          </ModalContent>
        </chakra.form>
      </Modal>

      <AlertDialog
        isOpen={isOpenDeleteCate}
        leastDestructiveRef={cancelRef}
        onClose={closeDeleteCate}
      >
        <chakra.form onSubmit={handleSubmit(deleteCate)}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Category: {data && rowNum !== null && data[rowNum].category}
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={closeDeleteCate}>
                  Cancel
                </Button>
                <Button colorScheme='red' type='submit' isLoading={loadingDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </chakra.form>
      </AlertDialog>
    </>
  )
}

export default BlogAdmin;