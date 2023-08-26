import { Button, Input, Stack, FormControl, FormLabel, Textarea, HStack, Select, chakra, useToast } from '@chakra-ui/react'
import { Link, useParams } from "react-router-dom"
import { useFrappeGetDoc, useFrappeUpdateDoc, useFrappeDeleteDoc, useFrappeGetDocList, useFrappeDocTypeEventListener } from "frappe-react-sdk"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { useEffect, useState, useRef } from "react";
import EditorJS from '@editorjs/editorjs'
import SidebarAdmin from "../../components/sidebar-admin"
import Header from '@editorjs/header'
import List from '@editorjs/list'
import InlineCode from '@editorjs/inline-code'
import { useForm } from "react-hook-form"

const BlogEdit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modified, setModified] = useState(false)
  const [saving, setSaving] = useState(false);
  const [loadings, setLoadings] = useState([]);

  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm()

  const { data: dataCates } = useFrappeGetDocList('Blog Category Section', {
    fields: ['name', 'category']
  })

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    location.href = '/blog-admin'
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const enterLoading = (index) => {
    setSaving(true);
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
  };

  const stopLoading = (index) => {
    setSaving(false);
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = false;
      return newLoadings;
    });
  };

  const { id } = useParams();

  const { data, isValidating, error, mutate } = useFrappeGetDoc('Blogs', id, {
    filter: ['name', 'blogimage', 'title', 'content', 'category']
  })

  useFrappeDocTypeEventListener('Blogs', (d) => {
    console.log(d)
      if (d.doctype === 'Blogs'){
      mutate()
    }
  })

  const { updateDoc } = useFrappeUpdateDoc();
  const { deleteDoc } = useFrappeDeleteDoc();

  const toast = useToast()

  const savePost = async (info) => {
    await updateDoc('Blogs', id, info)
    .then(() => {
      toast({
        title: 'Blog updated',
        description: "The blog has been updated.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }).catch(() => {
      toast({
        title: 'There is an error',
        description: "Sorry, it seems that there is an error while updating the blog.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    })
  }

  const deletePost = async (info) => {
    await deleteDoc('Blogs', id, info)
    .then(() => {
      location.href = "/blog-admin";
      toast({
        title: 'Blog deleted',
        description: "The blog has been deleted.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }).catch(() => {
      toast({
        title: 'There is an error',
        description: "Sorry, it seems that there is an error while deleting the blog.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    })
  }

  let editor = { isReady: false };

  useEffect(() => {
    try {
      if (!editor.isReady){
        editor = new EditorJS({ 
          holder: 'editorjs',
          placeholder: 'Your content...',
          tools: {
            header: Header,
            list: List,
            inlineCode: InlineCode
          },
        })
      }
    } catch (er){
      console.log(er)
    }
  }, [])

  const save = () => {
    editor
      .save()
      .then(outputData => {
        console.log('Article data: ', outputData);
      })
      .catch(error => {
        console.log('Saving failed: ', error);
      });
  };

  return (
    <>
      <SidebarAdmin />
      <div className='py-16 px-40 container-admin'>
        <chakra.form onSubmit={handleSubmit(savePost)}>
          <div className="flex justify-between">
            <div className="flex items-center gap-x-[8px] text-2xl">
              {modified ? (
                <ArrowBackIcon onClick={showModal}/>
              ) : (
                <ArrowBackIcon onClick={handleOk}/>
              )}
              <h1 className="text-4xl font-bold">Edit post: {data && data.title}</h1>
            </div>
            <div className="float-right">
              <Stack>
                <HStack>
                  <Link to={`/blog-view/${id}`}>
                    <Button>View</Button>
                  </Link>
                  <Button type="submit">Save</Button>
                  <Button onClick={deletePost}>Delete</Button>
                  <Button onClick={save}>Test Save</Button>
                </HStack>
              </Stack>
            </div>
          </div>
          <div className="block mt-10">
            <FormControl name="title">
              <Input type="text" placeholder="Your title" id="title" fontSize="40px" fontWeight="bold" defaultValue={data && data.title} variant="unstyled" htmlSize={4} autoComplete="off" {...register('title')}/>
            </FormControl>
            <FormControl name="content">
              {/* <div id="editorjs"></div> */}
              <Textarea style={{resize:'none'}} placeholder="Your content..." id="content" defaultValue={data && data.content} className="p-0 text-lg" {...register('content')}/>
            </FormControl>
            {dataCates && (
              <FormControl name="category">
                <FormLabel>Blog category:</FormLabel>
                <Select {...register('category')}>
                {dataCates.map((d) => 
                  <option value={d.name}>{d.category}</option>
                )}
                </Select>
              </FormControl>
            )}
            {/* <FormControl name="blogimage">
              <FormLabel>Image</FormLabel>
              <div style={{height:"80px",width:"80px",background:"#F2F2F2",borderRadius:"99px"}}>
                
              </div>
              <Input type="file" border={0} className="p-0 font-bold h-[60px]" autoComplete="off" onChange={(e) => console.log(e)} {...register('blogimage')}/>
            </FormControl> */}
          </div>
        </chakra.form>
      </div>
    </>
  )
}

export default BlogEdit